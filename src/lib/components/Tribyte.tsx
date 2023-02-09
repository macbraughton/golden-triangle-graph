import { For } from "solid-js"
import { cellDrawString } from "../utils/cellgen"
import { tribyte } from "../utils/cellgen"

const Tribyte = (props) => {
  const tb = () => tribyte({
    axis: props.cell.axis, 
    w: props.controls["cell-width"], 
    h: props.controls["cell-height"], 
    byte: props.controls.bitmap[props.cell["grid-axis"]]
  })
  
  return (
    <For each={tb()}>{(co, i) => {
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