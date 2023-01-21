import { mergeProps } from 'solid-js'
import Cell from './Cell'
import { h2w, w2h } from '../utils'
const width = 100
const height = w2h(width) * 2
const vbh = 100
const vbw = h2w(vbh) / 2
const minX = `-${vbw / 2}`
const minY = `-${vbh / 2}`
const viewBox = `${minX} ${minY} ${vbw} ${vbh}`
const altViewBox = `${0} ${minY} ${vbw} ${vbh}`
const altViewBox2 = `${0} ${0} ${vbw} ${vbh}`

console.log({width, height, vbh, vbw, minX, minY, viewBox, altViewBox})

export default function CellGroup(props) {
  const merged = mergeProps({ width, height, viewBox }, props)
  return <svg style={{float: "left"}} {...merged}>
    <svg x={minX} y={minY} viewBox={altViewBox}>
    <rect x={minX} y={minY} width="100%" height="100%" fill="lightgreen" stroke="green"/>
      <Cell p="11" svg={false} />
      <Cell p="00" svg={false} />
    </svg>
    <svg x={0} y={minY} viewBox={altViewBox}>
    <rect x={minX} y={minY} width="100%" height="100%" fill="lightpink" stroke="pink"/>
      <Cell p="10" svg={false} />
      <Cell p="01" svg={false} />
    </svg>
    <svg x={minX} y={0} viewBox={altViewBox} >
    <rect x={minX} y={minY} width="100%" height="100%" fill="lightblue" stroke="blue"/>
      <Cell p="10" svg={false} />
      <Cell p="01" svg={false} />
    </svg>
    <svg x={0} y={0} viewBox={altViewBox2} >
    <rect x={minX} y={minY} width="100%" height="100%" fill="yellow" stroke="orange"/>
      <Cell p="11" svg={false} />
      <Cell p="0" svg={false} />
    </svg>
  </svg>
}