import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

const CardContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={10}
      overflow="hidden"
      cursor={"pointer"}
      transition="box-shadow .15s ease-in-out"
      _hover={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      {children}
    </Box>
  );
};

export default CardContainer;
