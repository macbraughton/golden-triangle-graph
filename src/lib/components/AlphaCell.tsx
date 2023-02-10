import { vb, d2byte } from '../utils';
import { genTribyteCoordinates } from '../utils/cellgen';
import Cell from './Cell';
import Svg from './Svg'

const AlphaCell = (props) => {

  const viewBox = () => vb(props.controls["cell-width"], props.controls["cell-height"])
  const rx = () => -props.controls["cell-width"] / 2
  const ry = () => -props.controls["cell-height"] / 2
  const cell = () => {
    return {
      "grid-axis": "x,y",
      axis: [0, 0],
      tbc: genTribyteCoordinates([0, 0], props.controls["cell-width"], props.controls["cell-height"]),
      cellBits: d2byte(props.controls.bitmap["x,y"]).split("").map(b => +b)
    }
  }

  return (
    <Svg viewBox={viewBox()}>
      <rect
        x={rx()}
        y={ry()}
        width="100%"
        height="100%"
        fill={props.controls["background-color"]} />
      <Cell cell={cell()} {...props} />
    </Svg>
  )
}

export default AlphaCell