import "./index.css";
import ColorModeSwitch from "./components/ColorModeSwitch";
import EntryForm from "./components/EntryForm";

// goldenrod
function App() {
  return (
    <>
      <ColorModeSwitch singleIcon={true} />
      <EntryForm />
    </>
  );
}

export default App;
