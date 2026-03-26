interface BottomMessageProps {
  message: React.ReactNode;
  valueLength: number;
  maxLength?: number;
  shouldShowCount: boolean;
  messageClassName: string;
  countClassName: string;
}

const BottomMessage = ({
  message,
  valueLength,
  maxLength,
  shouldShowCount,
  messageClassName,
  countClassName,
}: BottomMessageProps) => {
  return (
    <>
      <span className={messageClassName}>
        {!shouldShowCount ? message : null}
      </span>
      {shouldShowCount ? (
        <span className={countClassName}>
          {valueLength}/{maxLength}
        </span>
      ) : null}
    </>
  );
};

export default BottomMessage;
