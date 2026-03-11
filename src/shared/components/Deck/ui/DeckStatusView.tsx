interface DeckStatusViewProps {
  isLoading: boolean;
  errorMessage: string | null;
  onRetry: () => void;
  emptyMessageClassName: string;
  retryButtonClassName: string;
}

const DeckStatusView = ({
  isLoading,
  errorMessage,
  onRetry,
  emptyMessageClassName,
  retryButtonClassName,
}: DeckStatusViewProps) => {
  if (isLoading) {
    return (
      <div className={emptyMessageClassName}>카드를 불러오는 중입니다.</div>
    );
  }

  if (!errorMessage) {
    return null;
  }

  return (
    <div className={emptyMessageClassName}>
      <p>{errorMessage}</p>
      <button type="button" className={retryButtonClassName} onClick={onRetry}>
        다시 시도
      </button>
    </div>
  );
};

export default DeckStatusView;
