import { Box } from "@chakra-ui/layout";
import NavBar from "../components/NavBar";
import users from "../data/users";

const HomePage = () => {
  return (
    <Box border={"2px solid red"} width={"100%"} height={"100vh"}>
      <NavBar user={users[0]} />
      <Box>Home</Box>
    </Box>
  );
};

export default HomePage;
