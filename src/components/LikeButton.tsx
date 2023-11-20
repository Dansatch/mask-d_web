import { Box } from "@chakra-ui/react";
import PopUpAnimationBox from "./PopUpAnimationBox";
import { HiHandThumbUp } from "react-icons/hi2";
import { HiOutlineHandThumbUp } from "react-icons/hi2";

import colors from "../config/colors";

interface Props {
  isLiked: boolean;
  handleClick: () => void;
}

const LikeButton = ({ isLiked, handleClick }: Props) => {
  return (
    <PopUpAnimationBox handleClick={handleClick}>
      {isLiked ? (
        <Box color={colors.darkTheme}>
          <HiHandThumbUp />
        </Box>
      ) : (
        <HiOutlineHandThumbUp />
      )}
    </PopUpAnimationBox>
  );
};

export default LikeButton;
