import { Button, Spinner } from "@chakra-ui/react";
import colors from "../config/colors";

interface Props {
  text: string;
  width?: string;
  height?: string;
  fontSize?: string;
  bgColor?: string;
  color?: string;
  borderColor?: string;
  isLoading?: boolean;
  handleClick?: () => void;
  colorSchemeEnabled?: boolean;
  type?: "submit" | "button";
  isDisabled?: boolean;
}

const AppButton = ({
  text,
  handleClick,
  width,
  height,
  isDisabled,
  fontSize = "1em",
  bgColor = colors.black,
  borderColor = colors.darkTheme,
  color = "white",
  isLoading = false,
  colorSchemeEnabled = false,
  type = "button",
}: Props) => {
  if (colorSchemeEnabled)
    return (
      <Button
        type={type}
        colorScheme="yellow"
        variant={"outline"}
        width={width}
        height={height}
        borderRadius="8px"
        paddingY="0.6em"
        px={7}
        fontSize={fontSize}
        fontWeight="500"
        fontFamily="inherit"
        cursor="pointer"
        isDisabled={isDisabled}
        transition="0.25s"
        _hover={{
          transform: "translateY(-3px)",
          boxShadow: "lg",
        }}
        _focus={{
          outline: "4px auto -webkit-focus-ring-color",
        }}
        onClick={handleClick}
      >
        {isLoading ? <Spinner /> : text}
      </Button>
    );

  return (
    <Button
      type={type}
      width={width}
      height={height}
      borderRadius="8px"
      border="1px solid transparent"
      paddingY="0.6em"
      px={7}
      fontSize={fontSize}
      fontWeight="500"
      fontFamily="inherit"
      bg={bgColor}
      color={color}
      cursor="pointer"
      isDisabled={isDisabled}
      transition="0.25s"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "lg",
        borderColor: borderColor,
      }}
      _focus={{
        outline: "4px auto -webkit-focus-ring-color",
      }}
      onClick={handleClick}
    >
      {isLoading ? <Spinner /> : text}
    </Button>
  );
};

export default AppButton;
