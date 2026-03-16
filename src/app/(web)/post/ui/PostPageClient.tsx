"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/shared/hooks";
import usePostForm from "../model/usePostForm";
import PostPageView from "./PostPageView";

const PostPageClient = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthGuard();
  const postForm = usePostForm();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="p-4 text-sm">로그인 상태 확인 중…</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PostPageView
      step={postForm.step}
      canMoveNext={postForm.isCurrentStepComplete}
      fileInputRef={postForm.fileInputRef}
      imagePreviewUrl={postForm.imagePreviewUrl}
      primaryCategoryOptions={postForm.primaryCategoryOptions}
      primaryCategoryId={postForm.primaryCategoryId}
      selectedPrimaryCategoryLabel={postForm.selectedPrimaryCategoryLabel}
      secondaryCategoryOptions={postForm.secondaryCategoryOptions}
      secondaryCategoryName={postForm.secondaryCategoryName}
      tagInput={postForm.tagInput}
      tags={postForm.tags}
      productInput={postForm.productInput}
      products={postForm.products}
      stepErrorMessage={postForm.stepErrorMessage}
      tagErrorMessage={postForm.tagErrorMessage}
      productErrorMessage={postForm.productErrorMessage}
      submitStatusMessage={postForm.submitStatusMessage}
      onOpenImagePicker={postForm.openImagePicker}
      onImageChange={postForm.handleImageChange}
      onPrimaryCategorySelect={postForm.handlePrimaryCategorySelect}
      onSecondaryCategorySelect={postForm.handleSecondaryCategorySelect}
      onTagInputChange={postForm.handleTagInputChange}
      onTagAdd={postForm.handleTagAdd}
      onTagRemove={postForm.handleTagRemove}
      onProductInputChange={postForm.handleProductInputChange}
      onProductAdd={postForm.handleProductAdd}
      onProductRemove={postForm.handleProductRemove}
      onPrevious={postForm.handleStepPrevious}
      onNext={postForm.handleStepNext}
      onSubmit={postForm.handleSubmit}
    />
  );
};

export default PostPageClient;
