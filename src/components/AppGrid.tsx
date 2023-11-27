import { SimpleGrid } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AppGrid = ({ children }: Props) => {
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, "2xl": 3, "3xl": 4, "4xl": 5, "5xl": 6 }}
      spacing={6}
      paddingX={1}
      paddingTop={3}
      paddingBottom={"80px"}
    >
      {children}
    </SimpleGrid>
  );
};

export default AppGrid;
