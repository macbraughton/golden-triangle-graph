import { createSignal, createEffect } from 'solid-js'
import { controlPanelStyle, controlStyle, inputStyle } from '../../styles'
import { w2h } from './lib/utils/goldenTriangle';
import { range, ceil } from 'mathjs';

// Set up signals for each control
const defaultWidth = 40
const [width, setWidth] = createSignal(defaultWidth)
let widthInput;

const height = () => w2h(width())

const defaultColor = "#999999"
const [color, setColor] = createSignal(defaultColor)
let colorInput;

const nodesPerWindow = () => ceil((innerHeight * innerWidth) / (height() * width()))

let nodeInput;
const [n, setN] = createSignal(nodesPerWindow())
const nodes = () => range(0, n())._data
createEffect(() => {
  setN(nodesPerWindow())
})

const ControlPanel = props => <div class={"no-print"} style={controlPanelStyle}>
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

export default ControlPanel