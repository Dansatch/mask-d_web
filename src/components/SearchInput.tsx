import { useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import colors from "../config/colors";

interface Props {
  placeholder: string;
  queryContext?: "entries" | "users";
}

const SearchInput = ({ placeholder, queryContext = "entries" }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onChange={(event) => {
        event.preventDefault();

        // Set zustand state depending on context.queryType
        // Navigate to / depending on context.location if not at / already
        console.log(`${ref.current?.value} search in ${queryContext}`);
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
