import { ReactNode } from "react";
import { ResponsiveValue, SimpleGrid } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
  type: "entries" | "users";
  noOfColumns?: ResponsiveValue<number>;
}

const AppGrid = ({ children, type, noOfColumns }: Props) => {
  return (
    <SimpleGrid
      columns={
        noOfColumns
          ? noOfColumns
          : {
              sm: 1,
              md: type === "entries" ? 2 : 3,
              lg: 2,
              "2xl": type === "entries" ? 2 : 3,
              "3xl": 3,
              "4xl": 4,
              "5xl": 5,
            }
      }
      spacing={{ base: 5, lg: 3, xl: 5 }}
      // paddingX={1}
      paddingY={3}
    >
      {children}
    </SimpleGrid>
  );
};

export default AppGrid;
