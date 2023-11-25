import { Box, Grid, GridItem } from "@chakra-ui/layout";
import NavBar from "../components/NavBar";
import users from "../data/users";
import SideUserProfilePanel from "../components/SideUserProfilePanel";
import { Show } from "@chakra-ui/media-query";

const HomePage = () => {
  const user = users[0];
  return (
    <Box width={"100%"} height={"100vh"}>
      <NavBar user={user} />
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"main aside"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "1fr 250px",
        }}
      >
        <Show above="lg">
          <GridItem
            area={"aside"}
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
