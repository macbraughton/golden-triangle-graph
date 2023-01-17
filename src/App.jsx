
import { A, B, C, D, E, F, G, I, c, e } from './lib/utils/goldenTriangle'
import { range, ceil } from 'mathjs';
import { controlPanelStyle, controlStyle, inputStyle, nodeStyle } from './styles'
import { createEffect, createSignal, For } from 'solid-js';
let widthInput;
let nodeInput;
let colorInput;
const defaultColor = "#BEBEBE"
const defaultWidth = 40
const h = 200
const w = c(h)
const viewBox = `-${w / 2} -${h / 2} ${w} ${h}`
const [width, setWidth] = createSignal(defaultWidth)
const height = () => e(width())
const nodesPerWindow = () => ceil((innerHeight * innerWidth) / (height() * width()))
const [n, setN] = createSignal(nodesPerWindow())
const strokeWidth = 3;
const nodes = () => range(0, n())._data
createEffect(() => {
  setN(nodesPerWindow())
})
const [color, setColor] = createSignal(defaultColor)

function App() {
  return (
    <>
      <svg style={{ display: "none" }} version="1.1" xmlns="http://www.w3.org/2000/svg"  >
        <symbol id="cell" viewBox={viewBox}>
          <g stroke={color()}  fill="none" stroke-width={strokeWidth} shape-rendering="geometricPrecision">
            <path d={`M ${C(h)} L ${B(h)} L ${C(-h)} L ${B(-h)} z M ${E(h)} L ${E(-h)} M ${A(-h)} L ${B(-h)} M ${A(-h)} L ${C(-h)} M ${A(h)} L ${C(h)} M ${A(h)} L ${B(h)} M ${A(h)} L ${A(-h)} M ${D(h)} L ${F(h)} M ${G(h)} L ${I(h)}`} />
          </g>
        </symbol>
      </svg>
      <section style={{ position: "relative", overflow: "hidden" }}>
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
              <svg style={{ float: "left" }} width={width()} height={height()}>
                <use xlink:href="#cell" />
              </svg>}
            </For>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
