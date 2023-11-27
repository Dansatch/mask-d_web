import { Box, Grid, GridItem, HStack } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";

import NavBar from "../components/NavBar";
import SideUserProfilePanel from "../components/SideUserProfilePanel";
import SidePanel from "../components/SidePanel";
import users from "../data/users";
import SortSelector from "../components/SortSelector";
import TimePeriodSelector from "../components/TimePeriodSelector";
import EntryGrid from "../components/EntryGrid";

const HomePage = () => {
  const user = users[1];

  return (
    <Box width={"100%"} height={"100vh"}>
      <NavBar user={user} />
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside1 main aside2"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "240px 1fr 250px",
        }}
      >
        <Show above="lg">
          <GridItem
            area={"aside1"}
            height={"91%"}
            maxHeight={"100%"}
            width={"240px"}
            position={"fixed"}
            left={0}
            overflowY={"hidden"}
            _hover={{
              overflowY: "auto",
            }}
          >
            <SidePanel userId={user._id} />
          </GridItem>
        </Show>

        <Show above="lg">
          <GridItem
            area={"aside2"}
            height={"91%"}
            maxHeight={"100%"}
            width={"250px"}
            position={"fixed"}
            right={0}
            overflowY={"hidden"}
            _hover={{
              overflowY: "auto",
            }}
          >
            <SideUserProfilePanel user={user} />
          </GridItem>
        </Show>

        <GridItem area="main" maxWidth={"100vw"}>
          <Box
            position={"sticky"}
            top={"58px"}
            paddingTop={{ base: "1px", lg: 5 }}
            paddingBottom={"1px"}
            paddingLeft={{ base: 4, md: 5, lg: 9 }}
            paddingRight={4}
            width={"100%"}
            zIndex={9}
          >
            <HStack marginBottom={5} paddingRight={2}>
              <TimePeriodSelector />
              <SortSelector />
            </HStack>

            <Box paddingRight={{ lg: 3 }}>
              <EntryGrid />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
