import { controlPanelStyle, controlStyle, inputStyle, bitPatternStyle } from '../styles'
import { useControlPanel } from '../stores/controls';
import { d2byte, gridDimensions } from '../utils'
import { useViewport } from '../stores/viewport';
import AlphaCell from './AlphaCell'
import BetaCell from './BetaCell'
import { createEffect } from 'solid-js';

let cellWidthInput
let fillInput
let strokeInput
let strokeWidthInput
let bitPatternInput
let opacityInput
let backgroundColorInput
let cursorBitInput
let betaCellInput

const ControlPanel = props => {
  const [controls, { 
    setCellWidth, 
    setFill, 
    setStroke, 
    setStrokeWidth, 
    setBitmap, 
    setOpacity, 
    setBackgroundColor, 
    setCursorBit,
    setBetaCell,
    reset }] = useControlPanel()
  const [viewPort] = useViewport()
  const gd = () => gridDimensions(controls["cell-width"], controls["cell-height"], viewPort())
  const copyBitmap = async () => {
    let output = {}
    Object.keys(controls.bitmap).map(key => {
      if (controls.bitmap[key] !== 0) {
        output[key] = controls.bitmap[key]
      }
    })
    try {
      await navigator.clipboard.writeText(JSON.stringify(output));
      console.log(output);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  createEffect(() => {
    document.documentElement.style.setProperty("--cell-bit-0-opacity", controls["opacity"])
  })

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
        <label for="opacity">opacity</label>
        <input style={inputStyle} min={0} step={.05} max={1} id="opacity" value={controls["opacity"]} onChange={(e) => setOpacity(+e.target.value)} type="number" ref={opacityInput} />
      </div>
      <div style={controlStyle}>
        <label for="background-color">background</label>
        <input style={inputStyle} id="background-color" value={controls["background-color"]} onChange={(e) => setBackgroundColor(e.target.value)} type="text" ref={backgroundColorInput} />
      </div>
      <div style={controlStyle}>
        <label for="cursor" class="toggle">cursor</label>
        <input checked={Boolean(controls["cursor-bit"])} type="checkbox" id="cursor" value={Boolean(controls["cursor-bit"])} class="checkbox" onChange={() => {
          setCursorBit(+!controls["cursor-bit"])
        }} ref={cursorBitInput} />
      </div>
      <div style={controlStyle}>
        <label for="beta-cell" class="toggle">beta-cell</label>
        <input checked={Boolean(controls["beta-cell"])} type="checkbox" id="beta-cell" value={Boolean(controls["beta-cell"])} class="checkbox" onChange={() => {
          setBetaCell(+!controls["beta-cell"])
        }} ref={betaCellInput} />
      </div>
      <div style={controlStyle}>
        <label for="bit-pattern">bit-pattern</label>
        <div>
          <input style={inputStyle} min={0} max={255} id="bit-pattern" value={controls["bitmap"]["x,y"]} onChange={(e) => setBitmap({ "x,y": +e.target.value })} type="number" ref={bitPatternInput} />
          <div style={{ "font-size": "10px", display: "flex", "justify-content": "center", padding: "5px" }}>{d2byte(controls["bitmap"]["x,y"])}</div>
        </div>
      </div>
      <div style={{...controlStyle, "justify-content": "space-around"}}>
        <div style={bitPatternStyle}>
          <AlphaCell controls={controls} />
        </div>
        <div style={bitPatternStyle}>
          <BetaCell controls={controls} />
        </div>
      </div>
      <div>
        <button onClick={reset}>reset</button>
      </div>
      <div>
        <button onClick={copyBitmap}>copy bitmap</button>
      </div>
    </div>)
}

export default ControlPanel