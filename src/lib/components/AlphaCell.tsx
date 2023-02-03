import { genAlphaCell } from '../utils/cellgen';
import { vb } from '../utils';
import Cell from './Cell';
import Svg from './Svg'

const AlphaCell = (props) => {
  const width = () => props.controls["cell-width"] * 2
  const height = () => props.controls["cell-height"] * 2
  const background = () => props.controls["background-color"]
  const viewBox = () => vb(width(), height())
  const rectCoords = () => viewBox().split(" ").slice(0,2)
  const cell = () => genAlphaCell(props.controls["cell-width"] * 2, props.controls["cell-height"] * 2)

  return (
    <Svg viewBox={viewBox()}>
      <rect x={rectCoords()[0]} y={rectCoords()[1]} width="100%" height="100%" fill={background()} />
      <Cell cell={cell()} bitmap={props.controls["bit-pattern"]} {...props} />
    </Svg>
  )
}

export default AlphaCell