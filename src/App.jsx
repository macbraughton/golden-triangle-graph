import CellGroup from './lib/components/CellGroup'

import { range, ceil } from 'mathjs';
import { controlPanelStyle, controlStyle, inputStyle, nodeStyle } from './styles'
import { createEffect, createSignal, For } from 'solid-js';
import { w2h } from './lib/utils/goldenTriangle';
let widthInput;
let nodeInput;
let colorInput;
const defaultColor = "#999999"
const defaultWidth = 40
const [width, setWidth] = createSignal(defaultWidth)
const height = () => w2h(width())
const nodesPerWindow = () => ceil((innerHeight * innerWidth) / (height() * width()))
const [n, setN] = createSignal(nodesPerWindow())
const nodes = () => range(0, n())._data
createEffect(() => {
  setN(nodesPerWindow())
})
const [color, setColor] = createSignal(defaultColor)
function App() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div class={"no-print"} style={controlPanelStyle}>
        <div>Controls</div>
        <div style={controlStyle}>
          <label for="width">width (px)</label>
          <input style={inputStyle} id="width" value={width()} onChange={(e) => setWidth(e.target.value)} type="number" ref={widthInput} />
        </div>
        <div style={controlStyle}>
          <label for="color">color</label>
          <input style={inputStyle} id="color" value={color()} onChange={(e) => setColor(e.target.value)} type="text" ref={colorInput} />
        </div>
        <div style={controlStyle}>
          <label for="nodes">nodes</label>
          <input style={inputStyle} id="nodes" value={n()} onChange={(e) => setN(e.target.value)} type="number" ref={nodeInput} />
        </div>
        <div>
          <button onClick={() => { setWidth(defaultWidth); setN(nodesPerWindow()); setColor(defaultColor) }}>reset</button>
        </div>
      </div>
      <div>
        <div style={nodeStyle}>
          <For each={nodes()}>{() =>
            <CellGroup />}
          </For>
        </div>
      </div>
    </div>
  );
}

export default App;
