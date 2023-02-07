import { For } from "solid-js"
import { cellDrawString } from "../utils/cellgen"

const Tribyte = (props) => {
  const showprops = () => props.cell
  return (
    <For each={props.cell}>{(dd, i) => {
      return <path
        d={cellDrawString(dd)}
        fill={props.controls.fill}
        stroke={props.controls.stroke}
        stroke-width={props.controls["stroke-width"]} />
    }}
    </For>
  )
}

export default Tribyte