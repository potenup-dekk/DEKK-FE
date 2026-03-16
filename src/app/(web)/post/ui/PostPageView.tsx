import postPageStyle from "../style";
import PostCategoryStep from "./PostCategoryStep";
import PostImageStep from "./PostImageStep";
import PostStepFooter from "./PostStepFooter";
import PostTagStep from "./PostTagStep";

interface PrimaryCategoryOption {
  id: string;
  label: string;
}

interface PostPageViewProps {
  step: 0 | 1 | 2;
  canMoveNext: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  imagePreviewUrl: string | null;
  primaryCategoryOptions: PrimaryCategoryOption[];
  primaryCategoryId: string;
  selectedPrimaryCategoryLabel: string;
  secondaryCategoryOptions: string[];
  secondaryCategoryName: string;
  tagInput: string;
  tags: string[];
  stepErrorMessage: string | null;
  tagErrorMessage: string | null;
  submitStatusMessage: string | null;
  onOpenImagePicker: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrimaryCategorySelect: (categoryId: string) => void;
  onSecondaryCategorySelect: (categoryName: string) => void;
  onTagInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTagAdd: () => void;
  onTagRemove: (tag: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const STEP_HEADERS = [
  { title: "코디 사진 업로드", value: "1단계" },
  { title: "카테고리 등록", value: "2단계" },
  { title: "태그 등록", value: "3단계" },
] as const;

const PostPageView = ({
  step,
  canMoveNext,
  fileInputRef,
  imagePreviewUrl,
  primaryCategoryOptions,
  primaryCategoryId,
  selectedPrimaryCategoryLabel,
  secondaryCategoryOptions,
  secondaryCategoryName,
  tagInput,
  tags,
  stepErrorMessage,
  tagErrorMessage,
  submitStatusMessage,
  onOpenImagePicker,
  onImageChange,
  onPrimaryCategorySelect,
  onSecondaryCategorySelect,
  onTagInputChange,
  onTagAdd,
  onTagRemove,
  onPrevious,
  onNext,
  onSubmit,
}: PostPageViewProps) => {
  const {
    page,
    title,
    description,
    stepHeader,
    stepItem,
    stepTitle,
    stepValue,
    errorText,
    statusText,
  } = postPageStyle();

  return (
    <div className={page()}>
      <h1 className={title()}>코디 등록</h1>
      <p className={description()}>
        코디 사진 업로드 → 카테고리 등록 → 태그 등록 순서로 진행해주세요.
      </p>

      <div className={stepHeader()}>
        {STEP_HEADERS.map((item, index) => {
          const isActive = step === index;

          return (
            <div
              key={item.title}
              className={stepItem({
                stepState: isActive ? "active" : "inactive",
              })}
            >
              <p
                className={stepTitle({
                  stepState: isActive ? "active" : "inactive",
                })}
              >
                {item.title}
              </p>
              <p
                className={stepValue({
                  stepState: isActive ? "active" : "inactive",
                })}
              >
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {step === 0 ? (
        <PostImageStep
          fileInputRef={fileInputRef}
          imagePreviewUrl={imagePreviewUrl}
          onOpenImagePicker={onOpenImagePicker}
          onImageChange={onImageChange}
        />
      ) : null}

      {step === 1 ? (
        <PostCategoryStep
          primaryCategoryOptions={primaryCategoryOptions}
          primaryCategoryId={primaryCategoryId}
          selectedPrimaryCategoryLabel={selectedPrimaryCategoryLabel}
          secondaryCategoryOptions={secondaryCategoryOptions}
          secondaryCategoryName={secondaryCategoryName}
          onPrimaryCategorySelect={onPrimaryCategorySelect}
          onSecondaryCategorySelect={onSecondaryCategorySelect}
        />
      ) : null}

      {step === 2 ? (
        <PostTagStep
          tagInput={tagInput}
          tags={tags}
          tagErrorMessage={tagErrorMessage}
          onTagInputChange={onTagInputChange}
          onTagAdd={onTagAdd}
          onTagRemove={onTagRemove}
        />
      ) : null}

      {stepErrorMessage ? (
        <p className={errorText()}>{stepErrorMessage}</p>
      ) : null}
      {submitStatusMessage ? (
        <p className={statusText()}>{submitStatusMessage}</p>
      ) : null}

      <PostStepFooter
        step={step}
        canMoveNext={canMoveNext}
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default PostPageView;
