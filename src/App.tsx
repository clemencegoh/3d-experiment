import "./App.css";
import CanvasEntry from "./components/canvas/CanvasEntry";
import ConfigDrawer from "./components/config/ConfigDrawer";

function App() {
  return (
    <div className="flex">
      <div className="flex-3">
        <CanvasEntry />
      </div>
      <div className="flex-1">
        <ConfigDrawer />
      </div>
    </div>
  );
}

export default App;
