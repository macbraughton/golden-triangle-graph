import Graph from './lib/components/Graph'
import ControlPanel from './lib/components/ControlPanel';
import * as wasm from '../pkg/golden_triangle_graph_bg.wasm'
console.log(wasm.add_one(63))

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
