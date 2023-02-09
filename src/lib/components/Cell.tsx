import { For } from "solid-js"
import { d2byte } from "../utils"
import { genTribyteCoordinates, cellDrawString } from "../utils/cellgen"

const Cell = (props) => {
  const tb = () => genTribyteCoordinates(props.cell.axis, props.controls["cell-width"],  props.controls["cell-height"])
  return (
    <For each={tb()}>{(dd, i) => {
      const bitString = () => d2byte(props.controls.bitmap[props.cell["grid-axis"]])
      const cellBit = () => +bitString().split("")[i()]
      return <path
        class="cell"
        d={cellDrawString(dd)}
        data-grid-axis={props.cell["grid-axis"]}
        data-axis={props.cell.axis}
        data-cell-bit-index={i()}
        data-cell-bit={cellBit()}
        data-bit-pattern={bitString()}
        fill={props.controls.fill}
        stroke={props.controls.stroke}
        stroke-width={props.controls["stroke-width"]} />
    }}
    </For>
  )
}

export default Cell