import { ReactNode } from "react";
import { HStack, MenuItem, Text, useColorModeValue } from "@chakra-ui/react";

interface Props {
  label: string;
  isOption?: boolean;
  icon: ReactNode;
  isClicked?: boolean;
  handleClick: (label: string) => void;
}

const SidePanelMenuItem = ({
  isClicked,
  handleClick,
  label,
  isOption,
  icon,
}: Props) => {
  const menuItemBackgroundColor = useColorModeValue("gray.200", "#3d3d3d");

  return (
    <MenuItem
      paddingX={1}
      paddingY={isOption ? 2 : 1}
      marginY={2}
      display={"flex"}
      alignItems={"center"}
      fontWeight={isOption ? "extrabold" : ""}
      borderRadius={isOption ? 2 : 0}
      _hover={{
        backgroundColor: menuItemBackgroundColor,
      }}
      backgroundColor={isClicked ? menuItemBackgroundColor : ""}
      onClick={() => handleClick(label)}
    >
      <HStack width={"100%"} spacing={2} fontSize={"21px"}>
        {icon}
        <Text fontSize={"xs"}>{label}</Text>
      </HStack>
    </MenuItem>
  );
};

export default SidePanelMenuItem;
