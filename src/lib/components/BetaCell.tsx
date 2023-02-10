import { vb } from '../utils';
import { genTribyteCoordinates } from '../utils/cellgen';
import Svg from './Svg'
import Tribyte from './Tribyte';

const BetaCell = (props) => {

  const viewBox = () => vb(props.controls["cell-width"], props.controls["cell-height"])
  const rx = () => -props.controls["cell-width"] / 2
  const ry = () => -props.controls["cell-height"] / 2
  const cell = () => {
    return {
      "grid-axis": "x,y",
      axis: [0, 0],
      tbc: genTribyteCoordinates([0, 0], props.controls["cell-width"], props.controls["cell-height"]),
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
      <Tribyte cell={cell()} {...props} />
    </Svg>
  )
}

export default BetaCell