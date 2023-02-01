import { For } from "solid-js"
import { d2byte } from "../utils"

const Cell = (props) => {
  return (
    <For each={props.cell.d}>{(dd, i) => {
      const bitString = () => +d2byte(props.cell["bit-pattern"]).split("")[i()]
      const cb = () => +(props.cell["bit-pattern"])?.toString(2).split("")[i()] || 0
      return <path class="cell"
        classList={{ "no-fill": bitString() === 1 }}
        data-grid-axis={props.cell["grid-axis"]}
        data-axis={props.cell.axis} d={dd}
        data-cell-index={i()}
        data-cell-bit={cb()}
        fill={props.controls.fill}
        stroke={props.controls.stroke}
        stroke-width={props.controls["stroke-width"]} />
    }}
    </For>
  )
}

export default Cell