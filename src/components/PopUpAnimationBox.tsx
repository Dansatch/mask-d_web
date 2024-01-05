import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimatedBox = motion(Box);

interface Props {
  handleClick: () => void;
  children: ReactNode;
  isDisabled?: boolean;
}

const PopUpAnimationBox = ({ handleClick, children, isDisabled }: Props) => {
  if (isDisabled) return <Box cursor={"pointer"}>{children}</Box>;

  return (
    <AnimatedBox
      cursor={"pointer"}
      onClick={handleClick}
      initial={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      {children}
    </AnimatedBox>
  );
};

export default PopUpAnimationBox;
