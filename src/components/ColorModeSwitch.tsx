import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, HStack, Switch, Text, useColorMode } from "@chakra-ui/react";

interface Props {
  singleIcon?: boolean;
  displayOnly?: boolean;
}

const ColorModeSwitch = ({ singleIcon, displayOnly }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();

  if (displayOnly)
    return (
      <HStack spacing={2}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        <Text whiteSpace={"nowrap"}>
          {colorMode === "light" ? "Dark mode" : "Light mode"}
        </Text>
      </HStack>
    );

  if (singleIcon)
    return (
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    );

  return (
    <HStack>
      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text whiteSpace={"nowrap"}>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
