import { mergeProps } from 'solid-js'
import { createSignal, Switch, Match } from 'solid-js'
import { h2w, w2h } from '../utils/goldenTriangle'
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
const [opacity, setOpacity] = createSignal(1)
const onClick = () => {
  if (opacity() === 1) {
    setOpacity(0.1)
  } else setOpacity(1)
}

const zozo = `M  ${minX} ${minY} L ${-minX} ${minY} L ${-minX} ${-minY} z`
const zozi = `M  ${minX} ${-minY} L ${-minX} ${-minY} L ${-minX} ${minY} z`
const zizo = `M  ${minX} ${-minY} L ${minX} ${minY} L ${-minX} ${minY} z`
const zizi = `M  ${minX} ${minY} L ${minX} ${-minY} L ${-minX} ${-minY} z`

const WholeCell = (props) => <>
  <g class="gridcell" stroke={props.stroke} fill="none" shape-rendering="geometricPrecision">
    <path d={props.p} />
  </g>
  <g class="fillcell" stroke="none" fill={props.fill} stroke-width={props.strokeWidth} shape-rendering="geometricPrecision">
    <path opacity={opacity()} onClick={onClick} d={props.d} />
  </g>
</>
export default function Cell(props) {
  const merged = mergeProps({ width, height, viewBox, stroke, strokeWidth, fill }, props)
  return <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={merged.viewBox} width={merged.width} height={merged.height}>
    <Switch fallback={<WholeCell d={zozo} {...merged} />} >
      <Match when={merged.p === "01"}>
        <WholeCell d={zozi} {...merged} />
      </Match>
      <Match when={merged.p === "10"}>
        <WholeCell d={zizo} {...merged} />
      </Match>
      <Match when={merged.p === "11"}>
        <WholeCell d={zizi} {...merged} />
      </Match>
    </Switch>
  </svg >
}