import { Box } from "@chakra-ui/react";
import UserProfile from "./components/UserProfile";
import "./index.css";
// import ColorModeSwitch from "./components/ColorModeSwitch";

// goldenrod
function App() {
  return (
    <Box backgroundColor={"gray"} height={"100vh"}>
      {/* <ColorModeSwitch singleIcon={true} /> */}
      <UserProfile username="redadmin23" />
    </Box>
  );
}

export default App;
