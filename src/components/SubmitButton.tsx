import { Button } from "@chakra-ui/react";
import colors from "../config/colors";

interface Props {
  label: String;
}

const SubmitButton = ({ label }: Props) => {
  return (
    <Button
      type="submit"
      width={"100%"}
      border="1px solid transparent"
      fontWeight={"500"}
      transition=".25s ease"
      loadingText="Submitting"
      size="lg"
      bg={colors.dark}
      color={"white"}
      _hover={{
        borderColor: "#646cff",
      }}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
