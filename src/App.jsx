
import { A, B, C, D, E, F, G, I, c } from './lib/utils/goldenTriangle'
import { range } from 'mathjs';

import { createSignal, For } from 'solid-js';
let input;
const h = 200
const w = c(h)
const viewBox = `-${w / 2} -${h / 2} ${w} ${h}`
const [width, setWidth] = createSignal(40)
const [n, setN] = createSignal(1000)
const strokeWidth = 3;
const nodes = () => range(0, n())._data
const controlPanelStyle = {
  position: "absolute", 
  display: "flex", 
  "flex-direction": "column",

}
function App() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={controlPanelStyle}>
        <input value={width()} onChange={(e) => setWidth(e.target.value)} type="number" ref={input} />
        <input value={n()} onChange={(e) => setN(e.target.value)} type="number" ref={input} />
      </div>
      <div style={{ display: "block", width: "100%", height: "100%", margin: 0, padding: 0 }}>
        <For each={nodes()}>{() =>
          <svg style={{ float: "left" }} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width={width()}>
            <g stroke="#686868" fill="none" stroke-width={strokeWidth} shape-rendering="geometricPrecision">
              <path d={`M ${C(h)} L ${B(h)} L ${C(-h)} L ${B(-h)} z M ${E(h)} L ${E(-h)} M ${A(-h)} L ${B(-h)} M ${A(-h)} L ${C(-h)} M ${A(h)} L ${C(h)} M ${A(h)} L ${B(h)} M ${A(h)} L ${A(-h)} M ${D(h)} L ${F(h)} M ${G(h)} L ${I(h)}`} />
            </g>
          </svg>}
        </For>
      </div>
    </div>
  );
}

export default App;
