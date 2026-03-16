import postPageStyle from "../style";

interface PostImageStepProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  imagePreviewUrl: string | null;
  onOpenImagePicker: () => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PostImageStep = ({
  fileInputRef,
  imagePreviewUrl,
  onOpenImagePicker,
  onImageChange,
}: PostImageStepProps) => {
  const { section, imageCardButton, imageCardPreview, imageHint } =
    postPageStyle();

  return (
    <section className={section()}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />

      <button
        type="button"
        className={imageCardButton()}
        onClick={onOpenImagePicker}
      >
        {imagePreviewUrl ? (
          <img
            src={imagePreviewUrl}
            alt="업로드한 코디 이미지"
            className={imageCardPreview()}
          />
        ) : (
          <span>클릭해서 코디 사진 업로드</span>
        )}
      </button>

      <p className={imageHint()}>사진은 한 장만 업로드할 수 있습니다.</p>
    </section>
  );
};

export default PostImageStep;
