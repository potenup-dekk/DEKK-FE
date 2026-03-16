import { ActionButton } from "@/shared/components/Button";
import postPageStyle from "../style";

interface PostStepFooterProps {
  step: 0 | 1 | 2 | 3;
  canMoveNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const PostStepFooter = ({
  step,
  canMoveNext,
  onPrevious,
  onNext,
  onSubmit,
}: PostStepFooterProps) => {
  const { footer } = postPageStyle();
  const isLastStep = step === 3;

  return (
    <div className={footer()}>
      <ActionButton
        label="이전"
        color="secondary"
        size="md"
        disabled={step === 0}
        onClick={() => {
          onPrevious();
        }}
      />

      <ActionButton
        label={isLastStep ? "등록" : "다음"}
        color="primary"
        size="md"
        disabled={!canMoveNext}
        onClick={() => {
          if (isLastStep) {
            onSubmit();
            return;
          }

          onNext();
        }}
      />
    </div>
  );
};

export default PostStepFooter;
