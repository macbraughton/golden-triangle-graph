import { genBetaCell } from '../utils/cellgen';
import { vb, tribyte } from '../utils';
import Tribyte from './Tribyte';
import Svg from './Svg'

const BetaCell = (props) => {
  const width = () => props.controls["cell-width"] * 2
  const height = () => props.controls["cell-height"] * 2
  const background = () => props.controls["background-color"]
  const viewBox = () => vb(width(), height())
  const rectCoords = () => viewBox().split(" ").slice(0, 2)
  const tb = () => tribyte({ w: props.controls["cell-width"] * 2, h: props.controls["cell-height"] * 2, byte: props.controls.bitmap["x,y"] })
  return (
    <Svg viewBox={viewBox()}>
      <rect x={rectCoords()[0]} y={rectCoords()[1]} width="100%" height="100%" fill={background()} />
      <Tribyte cell={tb()} {...props} />
    </Svg>
  )
}

export default BetaCell