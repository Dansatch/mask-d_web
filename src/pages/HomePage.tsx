import { useEffect, useState } from "react";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/layout";
import { Show, useMediaQuery } from "@chakra-ui/media-query";

import NavBar from "../components/NavBar";
import SideUserProfilePanel from "../components/SideUserProfilePanel";
import SidePanel from "../components/SidePanel";
import SortSelector from "../components/SortSelector";
import TimeFilterSelector from "../components/TimeFilterSelector";
import UserGrid from "../components/UserGrid";

// Mobile view edit
const HomePage = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState("230px");
  const [rightPanelWidth, setRightPanelWidth] = useState("260px");
  const [isXlarge] = useMediaQuery("(min-width: 1200px)");
  const [isLarge] = useMediaQuery("(min-width: 992px)");

  useEffect(() => {
    if (isXlarge) {
      setLeftPanelWidth("230px");
      setRightPanelWidth("260px");
    } else if (isLarge) {
      setLeftPanelWidth("190px");
      setRightPanelWidth("250px");
    } else return;
  }, [isXlarge, isLarge]);

  return (
    <Box width={"100%"} height={"100vh"}>
      <NavBar />

      <Show below="lg">
        <SidePanel isSlideable={true} />
      </Show>

      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside1 main aside2"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: `${leftPanelWidth} 1fr ${rightPanelWidth}`,
        }}
      >
        <Show above="lg">
          <GridItem
            area={"aside1"}
            height={"100%"}
            maxHeight={"100%"}
            width={leftPanelWidth}
            position={"fixed"}
            left={0}
            overflowY={"hidden"}
            _hover={{
              overflowY: "auto",
            }}
          >
            <SidePanel />
          </GridItem>
        </Show>

        <Show above="lg">
          <GridItem
            area={"aside2"}
            height={"100%"}
            maxHeight={"100%"}
            width={rightPanelWidth}
            position={"fixed"}
            right={0}
            overflowY={"hidden"}
            _hover={{
              overflowY: "auto",
            }}
          >
            <SideUserProfilePanel />
          </GridItem>
        </Show>

        <GridItem area="main" maxWidth={"100vw"}>
          <Box
            position={"sticky"}
            top={"58px"}
            paddingBottom={{ base: "50px", md: 1 }}
            paddingLeft={{ base: 3, md: 4 }}
            paddingRight={2}
            width={"100%"}
            zIndex={9}
          >
            <HStack marginY={5}>
              <TimeFilterSelector />
              <SortSelector />
            </HStack>

            <UserGrid />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
