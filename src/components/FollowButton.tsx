import { useState, useEffect } from "react";
import { isFollowing, useFollowUser } from "../hooks/useUsers";
import AppButton from "./AppButton";

interface Props {
  currentUserId: string;
  userIdToFollow: string;
  colorSchemeEnabled?: boolean;
  onFollow?: () => void;
}

const FollowButton = ({
  currentUserId,
  userIdToFollow,
  colorSchemeEnabled,
  onFollow = () => {},
}: Props) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const handleFollow = useFollowUser(currentUserId, userIdToFollow);

  useEffect(() => {
    async function checkFollowing() {
      const isCurrentlyFollowing = await isFollowing(
        currentUserId,
        userIdToFollow
      );
      setIsFollowed(Boolean(isCurrentlyFollowing));
    }
    checkFollowing();
  }, [currentUserId, userIdToFollow]);

  const handleClick = async () => {
    await handleFollow();
    setIsFollowed(!isFollowed); // Toggle the follow status after the button click
    onFollow();
  };

  return (
    <AppButton
      text={isFollowed ? "UNFOLLOW" : "FOLLOW"}
      fontSize="xs"
      colorSchemeEnabled={colorSchemeEnabled}
      handleClick={handleClick}
    />
  );
};

export default FollowButton;
