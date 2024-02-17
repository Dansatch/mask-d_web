import { useState, useEffect } from "react";
import { isFollowing, useFollowUser } from "../hooks/useUsers";
import AppButton from "./AppButton";
import useAppStore from "../store";

interface Props {
  selectedUserId: string;
  colorSchemeEnabled?: boolean;
  onFollow?: () => void;
}

const FollowButton = ({
  selectedUserId,
  colorSchemeEnabled,
  onFollow = () => {},
}: Props) => {
  const currentUserId = useAppStore().currentUser._id;
  const [isFollowed, setIsFollowed] = useState(false);
  const handleFollow = useFollowUser(selectedUserId);

  useEffect(() => {
    function checkFollowing() {
      const isCurrentlyFollowing = isFollowing(selectedUserId);
      setIsFollowed(Boolean(isCurrentlyFollowing));
    }
    checkFollowing();
  }, [selectedUserId]);

  const handleClick = async () => {
    try {
      setIsFollowed(!isFollowed); // Toggle the follow status after the button click
      onFollow();

      await handleFollow();
    } catch (err: any) {
      err;
      // console.log("An error occured");
    }
  };

  return (
    <AppButton
      text={isFollowed ? "UNFOLLOW" : "FOLLOW"}
      fontSize="xs"
      colorSchemeEnabled={colorSchemeEnabled}
      handleClick={handleClick}
      isDisabled={currentUserId === selectedUserId}
    />
  );
};

export default FollowButton;
