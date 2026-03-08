import { useEffect } from "react";

interface UseCardSwipeEventsParams {
  likeAnimation: () => void;
  dislikeAnimation: () => void;
}

const useCardSwipeEvents = ({
  likeAnimation,
  dislikeAnimation,
}: UseCardSwipeEventsParams) => {
  useEffect(() => {
    const handleDislikeTrigger = () => dislikeAnimation();
    const handleLikeTrigger = () => likeAnimation();

    window.addEventListener("card:dislike", handleDislikeTrigger);
    window.addEventListener("card:like", handleLikeTrigger);

    return () => {
      window.removeEventListener("card:dislike", handleDislikeTrigger);
      window.removeEventListener("card:like", handleLikeTrigger);
    };
  }, [dislikeAnimation, likeAnimation]);
};

export default useCardSwipeEvents;
