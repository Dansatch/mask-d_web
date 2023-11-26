import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";

import NavBar from "../components/NavBar";
import SideUserProfilePanel from "../components/SideUserProfilePanel";
import SidePanel from "../components/SidePanel";
import users from "../data/users";

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

        <GridItem area={"main"}>
          <Box height={"2000px"} backgroundColor={"green"}>
            JAJSAA
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
