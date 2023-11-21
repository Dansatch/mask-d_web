import "./index.css";
import ColorModeSwitch from "./components/ColorModeSwitch";
import EntryCard from "./components/EntryCard";
import entries from "./data/entries";
import { Box } from "@chakra-ui/react";

// goldenrod
function App() {
  return (
    <>
      <ColorModeSwitch singleIcon={true} />
      <Box boxSize={"350px"} margin={"0 auto"}>
        <EntryCard entryData={entries[0]} />
      </Box>
    </>
  );
}

export default App;
