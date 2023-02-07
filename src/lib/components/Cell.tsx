import { For } from "solid-js"
import { corner, d2byte } from "../utils"

const Cell = (props) => {
  return (
    <For each={props.cell.d}>{(dd, i) => {
      const c = () => corner(props.controls.bitmap[props.cell["grid-axis"]])
      const bitString = () => d2byte(props.controls.bitmap[props.cell["grid-axis"]])
      const cellBit = () => +bitString().split("")[i()]
      return <path class="cell"
        data-grid-axis={props.cell["grid-axis"]}
        data-axis={props.cell.axis} d={dd}
        data-cell-bit-index={i()}
        data-cell-bit={cellBit()}
        data-bit-pattern={bitString()}
        fill={c() ? "green": props.controls.fill}
        stroke={props.controls.stroke}
        stroke-width={props.controls["stroke-width"]} />
    }}
    </For>
  )
}

export default Cell