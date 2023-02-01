import { mergeProps } from 'solid-js'
import { Switch, Match } from 'solid-js'
import { h2w, w2h } from '../utils'
const stroke = "#BEBEBE"
const strokeWidth = 1
const fill = "#5A5A5A"
const width = 50
const height = w2h(width)
const vbh = 200
const vbw = h2w(vbh) / 2
const minX = `-${vbw / 2}`
const minY = `-${vbh / 2}`
const viewBox = `${minX} ${minY} ${vbw} ${vbh}`
const onClick = (e) => {
  console.log(e.target.id)
  e.target.classList.toggle('no-fill')
}
const svg = true
const zozo = `M ${minX} ${minY} L ${-minX} ${minY} L ${-minX} ${-minY} z`
const zozi = `M ${minX} ${-minY} L ${-minX} ${-minY} L ${-minX} ${minY} z`
const zizo = `M ${minX} ${-minY} L ${minX} ${minY} L ${-minX} ${minY} z`
const zizi = `M ${minX} ${minY} L ${minX} ${-minY} L ${-minX} ${-minY} z`

const WholeCell = props => <>
  <g class="gridcell" stroke={props.stroke} fill="none" stroke-width={props.strokeWidth} shape-rendering="geometricPrecision">
    <path d={props.d} />
  </g>
  <g class="fillcell" stroke="none" fill={props.fill} shape-rendering="geometricPrecision">
    <path id={props.id} onClick={onClick} d={props.d} class="no-fill" />
  </g>
</>

const CellPicker = props => <Switch fallback={<WholeCell id="zozo" d={zozo} {...props} />} >
  <Match when={props.p === "01"}>
    <WholeCell id="zozi" d={zozi} {...props} />
  </Match>
  <Match when={props.p === "10"}>
    <WholeCell id="zizo" d={zizo} {...props} />
  </Match>
  <Match when={props.p === "11"}>
    <WholeCell id="zizi" d={zizi} {...props} />
  </Match>
</Switch>

export default function CellBit(props) {
  const merged = mergeProps({ svg, width, height, viewBox, stroke, strokeWidth, fill }, props)
  return <Switch fallback={
    <CellPicker {...merged} />
  }>
    <Match when={merged.svg}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={merged.viewBox} width={merged.width} height={merged.height}>
        <CellPicker {...merged} />
      </svg >
    </Match>
  </Switch>
}