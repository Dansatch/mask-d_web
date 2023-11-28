import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type: "entries" | "users";
}

const AppGrid = ({ children, type }: Props) => {
  return (
    <SimpleGrid
      columns={{
        sm: 1,
        md: type === "entries" ? 2 : 3,
        lg: 2,
        "2xl": type === "entries" ? 2 : 3,
        "3xl": 3,
        "4xl": 4,
        "5xl": 5,
      }}
      spacing={{ base: 5, lg: 3, xl: 5 }}
      paddingX={1}
      paddingTop={3}
      paddingBottom={"80px"}
    >
      {children}
    </SimpleGrid>
  );
};

export default AppGrid;
