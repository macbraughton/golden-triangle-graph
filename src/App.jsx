import Graph from './lib/components/Graph'
import ControlPanel from './lib/components/ControlPanel';

function App() {

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <ControlPanel />
      <Graph />
    </div>
  );
}

export default App;
