import { controlPanelStyle, controlStyle, inputStyle, bitPatternStyle } from '../styles'
import { useControlPanel } from '../stores/controls';
import { d2byte, gridDimensions } from '../utils'
import { useViewport } from '../stores/viewport';
import AlphaCell from './AlphaCell'

let cellWidthInput
let fillInput
let strokeInput
let strokeWidthInput
let bitPatternInput

const ControlPanel = props => {
  const [controls, { setCellWidth, setFill, setStroke, setStrokeWidth, setBitPattern, reset }] = useControlPanel()
  const [viewPort] = useViewport()
  const gd = () => gridDimensions(controls["cell-width"], controls["cell-height"], viewPort())
  return (
    <div class={"no-print no-select"} style={controlPanelStyle}>
      <div>Controls</div>
      <div style={controlStyle}>
        <label for="cell-width">cell-width</label>
        <input style={inputStyle} min={4} id="cell-width" value={controls["cell-width"]} onChange={(e) => setCellWidth(+e.target.value)} type="number" ref={cellWidthInput} />
      </div>
      <div style={controlStyle}>
        <label for="fill">fill</label>
        <input style={inputStyle} id="fill" value={controls.fill} onChange={(e) => setFill(e.target.value)} type="text" ref={fillInput} />
      </div>
      <div style={controlStyle}>
        <label for="stroke">stroke</label>
        <input style={inputStyle} id="stroke" value={controls.stroke} onChange={(e) => setStroke(e.target.value)} type="text" ref={strokeInput} />
      </div>
      <div style={controlStyle}>
        <label for="stroke-width">stroke-width</label>
        <input style={inputStyle} min={0} step={.1} id="stroke-width" value={controls["stroke-width"]} onChange={(e) => setStrokeWidth(+e.target.value)} type="number" ref={strokeWidthInput} />
      </div>
      <div style={controlStyle}>
        <label for="grid-dimensions">grid dimensions</label>
        <div id="grid-dimensions" name="grid-dimensions">{gd().cols} x {gd().rows}</div>
      </div>
      <div style={controlStyle}>
        <label for="bit-pattern">bit-pattern</label>
        <div>
          <input style={inputStyle} min={0} max={255} id="bit-pattern" value={controls["bit-pattern"]} onChange={(e) => setBitPattern(+e.target.value)} type="number" ref={bitPatternInput} />
          <div style={{"font-size": "10px", display: "flex", "justify-content": "center", padding: "5px"}}>{d2byte(controls["bit-pattern"])}</div>
        </div>
      </div>
      <div style={bitPatternStyle}>
        <AlphaCell controls={controls} />
      </div>
      <div>
        <button onClick={reset}>reset</button>
      </div>
    </div>)
}
export default ControlPanel