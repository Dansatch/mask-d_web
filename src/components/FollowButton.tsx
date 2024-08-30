import { useState, useEffect } from "react";
import { useFollowUser } from "../hooks/useUsers";
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
  const { handleFollow, isFollowing } = useFollowUser(selectedUserId);

  useEffect(() => {
    setIsFollowed(isFollowing(selectedUserId));
  }, [selectedUserId]);

  const handleClick = async () => {
    try {
      setIsFollowed(!isFollowed); // Toggle the follow status after the button click
      onFollow();

      await handleFollow();
    } catch (err: any) {
      console.log(
        "An unexpected error occured, pls report error and try again later"
      );
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
