import { vb } from '../utils';
import Tribyte from './Tribyte';
import Svg from './Svg'
import { genBetaCell } from '../utils/cellgen';
const BetaCell = (props) => {
  const width = () => props.controls["cell-width"] * 2
  const height = () => props.controls["cell-height"] * 2
  const background = () => props.controls["background-color"]
  const viewBox = () => vb(width(), height())
  const rectCoords = () => viewBox().split(" ").slice(0, 2)
  const bc = () => genBetaCell({ w: props.controls["cell-width"] * 2, h: props.controls["cell-height"] * 2, byte: props.controls.bitmap["x,y"] })
  
  return (
    <Svg viewBox={viewBox()}>
      <rect x={rectCoords()[0]} y={rectCoords()[1]} width="100%" height="100%" fill={background()} />
      <Tribyte cell={bc()} {...props} />
    </Svg>
  )
}

export default BetaCell