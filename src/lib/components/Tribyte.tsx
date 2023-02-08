import { For } from "solid-js"
import { cellDrawString } from "../utils/cellgen"

const Tribyte = (props) => {
  const showprops = () => { return { ...props } }
  showprops()
  return (
    <For each={props.cell}>{(dd, i) => {
      console.log(i(), props.cell)
      const d = dd.map(cellDrawString).join(" ")
      console.log(d)
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