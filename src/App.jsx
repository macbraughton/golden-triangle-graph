import Graph from './lib/components/Graph'
import ControlPanel from './lib/components/ControlPanel';

function App() {
  const style = {
    position: "relative", overflow: "hidden"
  }
  return (
    <div style={style}>
      <ControlPanel />
      <Graph />
    </div>
  );
}

export default App;
