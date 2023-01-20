import { mergeProps } from 'solid-js'
import Cell from './Cell'
import { h2w, w2h } from '../utils/goldenTriangle'
const width = 100
const height = w2h(width)
const vbh = 100
const vbw = h2w(vbh)
const minX = `-${vbw / 2}`
const minY = `-${vbh / 2}`
const viewBox = `${minX} ${minY} ${vbw} ${vbh}`
const altViewBox = `${minX} ${minY} ${vbw * 2} ${vbh}`

export default function CellGroup(props) {
  const merged = mergeProps({ width, height, viewBox }, props)
  return <svg style={{float: "left"}} {...merged}>
    <svg x={minX} y={minY} viewBox={altViewBox}>
      <Cell p="11" svg={false} />
      <Cell p="00" svg={false} />
    </svg>
    <svg x={0} y={minY} viewBox={altViewBox}>
      <Cell p="10" svg={false} />
      <Cell p="01" svg={false} />
    </svg>
  </svg>
}