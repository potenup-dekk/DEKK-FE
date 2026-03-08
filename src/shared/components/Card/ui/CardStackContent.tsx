import CardStackLayers from "./CardStackLayers";
import type { CardStackContentProps } from "../model/props.type";

const CardStackContent = ({
  cardStack,
  onExitComplete,
}: CardStackContentProps) => {
  return (
    <CardStackLayers cardStack={cardStack} onExitComplete={onExitComplete} />
  );
};

export default CardStackContent;
