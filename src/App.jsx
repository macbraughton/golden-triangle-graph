import Graph from './lib/components/Graph'
import ControlPanel from './lib/components/ControlPanel';

function App() {
  (async () => {
    let response = await fetch('target/wasm32-unknown-unknown/release/golden_triangle_graph.wasm');
    let bytes = await response.arrayBuffer();
    let { instance } = await WebAssembly.instantiate(bytes, { });
    console.log(instance.exports.add_one(63));
  })();
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
