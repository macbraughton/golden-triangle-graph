import { genAlphaCell } from '../utils/cellgen';
import { d2byte, vb } from '../utils';
import Cell from './Cell';
import Svg from './Svg'

const AlphaCell = (props) => {
  const width = () => props.controls["cell-width"] * 2
  const height = () => props.controls["cell-height"] * 2
  const viewBox = () => vb(width(), height())
  const cell = () => {
    return { ...genAlphaCell(props.controls["cell-width"] * 2, props.controls["cell-height"] * 2, props.controls["bit-pattern"]) }
  }
  return (
    <>
    {console.log(d2byte(cell()["bit-pattern"]))}
    <Svg viewBox={viewBox()}>
      <Cell cell={cell()} {...props} />
    </Svg>
    </>
  )
}

export default AlphaCell