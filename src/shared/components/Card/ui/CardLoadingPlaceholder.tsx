import { cardStyle } from "../style";

const CardLoadingPlaceholder = () => {
  const { frontRoot } = cardStyle({ isCardCompressed: false });

  return (
    <div
      aria-hidden
      className={`${frontRoot()} overflow-hidden bg-gray-200/80 animate-pulse`}
    />
  );
};

export default CardLoadingPlaceholder;
