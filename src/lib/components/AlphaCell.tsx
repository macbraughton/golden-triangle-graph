import { genAlphaCell } from '../utils/cellgen';
import { vb } from '../utils';
import Cell from './Cell';
import Svg from './Svg'

const AlphaCell = (props) => {
  const width = () => props.controls["cell-width"] * 2
  const height = () => props.controls["cell-height"] * 2
  const viewBox = () => vb(width(), height())
  const cell = genAlphaCell(props.controls["cell-width"] * 2, props.controls["cell-height"] * 2)

  return (
    <Svg viewBox={viewBox()}>
      <Cell cell={cell} bitmap={props.controls["bit-pattern"]} {...props} />
    </Svg>
  )
}

export default AlphaCell