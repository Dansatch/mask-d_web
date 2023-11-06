import { Box } from "@chakra-ui/react";
import "./index.css";
import ColorModeSwitch from "./components/ColorModeSwitch";

function App() {
  return (
    <>
      <ColorModeSwitch singleIcon={true} />
      <Box>Mask'd!!!!</Box>
    </>
  );
}

export default App;
