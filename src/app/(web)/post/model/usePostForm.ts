import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SECONDARY_CATEGORY_GROUPS,
  TAG_MAX_LENGTH,
  TAG_MIN_LENGTH,
} from "./postForm.constants";
import type {
  PostProductItem,
  PostStep,
  TagValidationResult,
} from "./postForm.types";

const PRODUCT_THUMBNAIL_CANDIDATES = [
  "/goods/top.webp",
  "/goods/bottom.webp",
  "/goods/neck.webp",
  "/goods/shirts.webp",
  "/goods/sweater.webp",
];

const validateTag = (
  tagInput: string,
  existingTags: string[],
): TagValidationResult => {
  const normalizedTag = tagInput.trim();

  if (!normalizedTag) {
    return {
      isValid: false,
      errorMessage: "태그를 입력해주세요.",
      normalizedTag,
    };
  }

  if (/\s/.test(normalizedTag)) {
    return {
      isValid: false,
      errorMessage: "태그에는 띄어쓰기를 사용할 수 없어요.",
      normalizedTag,
    };
  }

  if (
    normalizedTag.length < TAG_MIN_LENGTH ||
    normalizedTag.length > TAG_MAX_LENGTH
  ) {
    return {
      isValid: false,
      errorMessage: `태그는 ${TAG_MIN_LENGTH}~${TAG_MAX_LENGTH}글자로 입력해주세요.`,
      normalizedTag,
    };
  }

  if (existingTags.includes(normalizedTag)) {
    return {
      isValid: false,
      errorMessage: "이미 등록된 태그입니다.",
      normalizedTag,
    };
  }

  return {
    isValid: true,
    errorMessage: null,
    normalizedTag,
  };
};

const usePostForm = () => {
  const [step, setStep] = useState<PostStep>(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [primaryCategoryId, setPrimaryCategoryId] = useState("");
  const [secondaryCategoryName, setSecondaryCategoryName] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [productInput, setProductInput] = useState("");
  const [products, setProducts] = useState<PostProductItem[]>([]);
  const [stepErrorMessage, setStepErrorMessage] = useState<string | null>(null);
  const [tagErrorMessage, setTagErrorMessage] = useState<string | null>(null);
  const [productErrorMessage, setProductErrorMessage] = useState<string | null>(
    null,
  );
  const [submitStatusMessage, setSubmitStatusMessage] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const primaryCategoryOptions = useMemo(() => {
    return SECONDARY_CATEGORY_GROUPS.map((group) => {
      return { id: group.id, label: group.label };
    });
  }, []);

  const selectedPrimaryCategory = useMemo(() => {
    return (
      SECONDARY_CATEGORY_GROUPS.find(
        (group) => group.id === primaryCategoryId,
      ) ?? null
    );
  }, [primaryCategoryId]);

  const secondaryCategoryOptions =
    selectedPrimaryCategory?.secondaryOptions ?? [];

  const isCurrentStepComplete = useMemo(() => {
    if (step === 0) {
      return imagePreviewUrl !== null;
    }

    if (step === 1) {
      return products.length > 0;
    }

    if (step === 2) {
      return Boolean(primaryCategoryId && secondaryCategoryName);
    }

    return tags.length > 0;
  }, [
    imagePreviewUrl,
    primaryCategoryId,
    products.length,
    secondaryCategoryName,
    step,
    tags.length,
  ]);

  const isLastStep = step === 3;

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const openImagePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      const nextPreviewUrl = URL.createObjectURL(file);

      setImagePreviewUrl((previousUrl) => {
        if (previousUrl) {
          URL.revokeObjectURL(previousUrl);
        }

        return nextPreviewUrl;
      });
      setStepErrorMessage(null);
      setSubmitStatusMessage(null);

      event.target.value = "";
    },
    [],
  );

  const handlePrimaryCategorySelect = useCallback((categoryId: string) => {
    setPrimaryCategoryId(categoryId);
    setSecondaryCategoryName("");
    setStepErrorMessage(null);
    setSubmitStatusMessage(null);
  }, []);

  const handleSecondaryCategorySelect = useCallback((categoryName: string) => {
    setSecondaryCategoryName(categoryName);
    setStepErrorMessage(null);
    setSubmitStatusMessage(null);
  }, []);

  const handleTagInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(event.target.value);
      setTagErrorMessage(null);
      setSubmitStatusMessage(null);
    },
    [],
  );

  const handleTagAdd = useCallback(() => {
    const result = validateTag(tagInput, tags);

    if (!result.isValid) {
      setTagErrorMessage(result.errorMessage);
      return;
    }

    setTags((previousTags) => {
      return [...previousTags, result.normalizedTag];
    });
    setTagInput("");
    setTagErrorMessage(null);
    setStepErrorMessage(null);
    setSubmitStatusMessage(null);
  }, [tagInput, tags]);

  const handleTagRemove = useCallback((targetTag: string) => {
    setTags((previousTags) => {
      return previousTags.filter((tag) => tag !== targetTag);
    });
    setSubmitStatusMessage(null);
  }, []);

  const handleProductInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProductInput(event.target.value);
      setProductErrorMessage(null);
      setSubmitStatusMessage(null);
    },
    [],
  );

  const handleProductAdd = useCallback(() => {
    const normalizedTitle = productInput.trim();

    if (!normalizedTitle) {
      setProductErrorMessage("상품명을 입력해주세요.");
      return;
    }

    const isDuplicate = products.some(
      (product) => product.title === normalizedTitle,
    );

    if (isDuplicate) {
      setProductErrorMessage("이미 추가된 상품입니다.");
      return;
    }

    const nextThumbnailIndex =
      products.length % PRODUCT_THUMBNAIL_CANDIDATES.length;
    const nextProduct: PostProductItem = {
      id: `product-${Date.now()}-${products.length}`,
      title: normalizedTitle,
      description: "코디에 추가된 상품",
      imageUrl: PRODUCT_THUMBNAIL_CANDIDATES[nextThumbnailIndex],
    };

    setProducts((previousProducts) => {
      return [...previousProducts, nextProduct];
    });
    setProductInput("");
    setProductErrorMessage(null);
    setStepErrorMessage(null);
    setSubmitStatusMessage(null);
  }, [productInput, products]);

  const handleProductRemove = useCallback((productId: string) => {
    setProducts((previousProducts) => {
      return previousProducts.filter((product) => product.id !== productId);
    });
    setProductErrorMessage(null);
    setSubmitStatusMessage(null);
  }, []);

  const handleStepPrevious = useCallback(() => {
    setStep((previousStep) => {
      if (previousStep === 0) {
        return previousStep;
      }

      return (previousStep - 1) as PostStep;
    });
    setStepErrorMessage(null);
  }, []);

  const handleStepNext = useCallback(() => {
    if (!isCurrentStepComplete) {
      setStepErrorMessage("현재 단계를 먼저 완료해주세요.");
      return;
    }

    setStep((previousStep) => {
      if (previousStep === 3) {
        return previousStep;
      }

      return (previousStep + 1) as PostStep;
    });
    setStepErrorMessage(null);
  }, [isCurrentStepComplete]);

  const handleSubmit = useCallback(() => {
    if (!isCurrentStepComplete || !isLastStep) {
      setStepErrorMessage("모든 단계를 완료한 뒤 등록할 수 있어요.");
      return;
    }

    setSubmitStatusMessage("등록 준비가 완료되었습니다. (API 연동 전)");
  }, [isCurrentStepComplete, isLastStep]);

  return {
    step,
    isLastStep,
    isCurrentStepComplete,
    fileInputRef,
    imagePreviewUrl,
    primaryCategoryOptions,
    primaryCategoryId,
    selectedPrimaryCategoryLabel: selectedPrimaryCategory?.label ?? "미선택",
    secondaryCategoryOptions,
    secondaryCategoryName,
    tagInput,
    tags,
    productInput,
    products,
    stepErrorMessage,
    tagErrorMessage,
    productErrorMessage,
    submitStatusMessage,
    openImagePicker,
    handleImageChange,
    handlePrimaryCategorySelect,
    handleSecondaryCategorySelect,
    handleTagInputChange,
    handleTagAdd,
    handleTagRemove,
    handleProductInputChange,
    handleProductAdd,
    handleProductRemove,
    handleStepPrevious,
    handleStepNext,
    handleSubmit,
  };
};

export default usePostForm;
