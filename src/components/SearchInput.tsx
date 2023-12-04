import { useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import colors from "../config/colors";
import useAppStore from "../store";

interface Props {
  placeholder: string;
}

const SearchInput = ({ placeholder }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const currentPath = useLocation().pathname;

  const currentRouteIsEntries = currentPath.startsWith("/entries");

  const setSearchText = currentRouteIsEntries
    ? useAppStore().entryQueryStore((s) => s.setSearchText)
    : useAppStore().userQueryStore((s) => s.setSearchText);

  return (
    <form
      onChange={(event) => {
        event.preventDefault();

        if (ref.current) setSearchText(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          colorScheme="blackAlpha"
          placeholder={placeholder}
          variant={"filled"}
          backgroundColor={useColorModeValue("gray.50", "")}
          borderWidth={"1px"}
          focusBorderColor={useColorModeValue(
            colors.lightTheme,
            colors.darkTheme
          )}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
