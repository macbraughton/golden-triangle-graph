import { For } from "solid-js"
import { d2byte } from "../utils"
import { cellDrawString } from "../utils/cellgen"

const Cell = (props) => {
  const bs = () => d2byte(props.controls.bitmap[props.cell["grid-axis"]])
  const cb = () => bs().split("").map(b => +b)
  return (
    <For each={props.cell.tbc}>{(tb, i) => {
      return <path
        class="cell"
        d={cellDrawString(tb)}
        data-grid-axis={props.cell["grid-axis"]}
        data-axis={props.cell.axis}
        data-cell-bit-index={i()}
        data-cell-bit={cb()[i()]}
        data-bit-pattern={bs()}
        fill={props.controls.fill}
        stroke={props.controls.stroke}
        stroke-width={props.controls["stroke-width"]} />
    }}
    </For>
  )
}

export default Cell