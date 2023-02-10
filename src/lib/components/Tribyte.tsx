import { For } from "solid-js"
import { cellDrawString } from "../utils/cellgen"
import { groupCoords } from "../utils/cellgen"

const Tribyte = (props) => {

  const tb = () => groupCoords(props.cell.tbc, props.controls.bitmap[props.cell["grid-axis"]])

  return (
    <For each={tb()}>{(co) => {
      const d = co.map(cellDrawString).join(" ")
      return <path
        d={d}
        fill={props.controls.fill}
        stroke={props.controls.stroke}
        stroke-width={props.controls["stroke-width"]} />
    }}
    </For>
  )
}

export default Tribyte