import EntryForm from "./components/EntryForm";
import "./index.css";
import ColorModeSwitch from "./components/ColorModeSwitch";

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
