import CardStackLayers from "./CardStackLayers";
import type { CardStackContentProps } from "../model/props.type";

const CardStackContent = ({
  cardStack,
  onExitComplete,
  displayOptions,
}: CardStackContentProps) => {
  return (
    <CardStackLayers
      cardStack={cardStack}
      onExitComplete={onExitComplete}
      displayOptions={displayOptions}
    />
  );
};

export default CardStackContent;
