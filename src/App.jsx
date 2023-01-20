
// import { A, B, C, D, E, F, G, I, c, e } from './lib/utils/goldenTriangle'
// import { range, ceil } from 'mathjs';
import Cell from './lib/components/Cell'
import CellGroup from './lib/components/CellGroup'
// import { controlPanelStyle, controlStyle, inputStyle, nodeStyle } from './styles'
// import { createEffect, createSignal, For } from 'solid-js';
// let widthInput;
// let nodeInput;
// let colorInput;
// const defaultColor = "#BEBEBE"
// const defaultWidth = 40
// const h = 200
// const w = c(h)
// const viewBox = `-${w / 2} -${h / 2} ${w} ${h}`
// const [width, setWidth] = createSignal(defaultWidth)
// const height = () => e(width())
// const nodesPerWindow = () => ceil((innerHeight * innerWidth) / (height() * width()))
// const [n, setN] = createSignal(nodesPerWindow())
// const strokeWidth = 3;
// const nodes = () => range(0, n())._data
// createEffect(() => {
//   setN(nodesPerWindow())
// })
// const [color, setColor] = createSignal(defaultColor)

function App() {
  return (
    <div>
      <div class="celltableWrapper">
        <div class="celltable">
          <div class="a">0</div>
          <div class="b">1</div>
          <div class="c">0</div>
          <div class="f">1</div>
          <div class="d">
            <Cell p="00" />
          </div>
          <div class="e">
            <Cell p="01" />
          </div>
          <div class="g">
            <Cell p="10" />
          </div>
          <div class="h">
            <Cell p="11" />
          </div>
        </div>
      </div>
      <div>
        <Cell p="00" />
        <Cell p="01" />
        <Cell p="10" />
        <Cell p="11" />
      </div>
      <CellGroup />
    </div>
  );
}

export default App;
