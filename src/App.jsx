import Graph from './lib/components/Graph'
import ControlPanel from './lib/components/ControlPanel';
import * as wasm from '../pkg/golden_triangle_graph_bg.wasm'
console.log(wasm.add_one(63))
function App() {
  // (async () => {
  //   let response = await fetch(wasm);
  //   let bytes = await response.arrayBuffer();
  //   let { instance } = await WebAssembly.instantiate(bytes, { });
  //   console.log(instance.exports.add_one(63));
  // })();
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
