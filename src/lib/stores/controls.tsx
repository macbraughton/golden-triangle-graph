import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { w2h } from "../utils";
import { H } from "../bitmaps";
const ControlPanelContext = createContext();

const lw = 10

const initialConfig = {
  "cell-width": lw,
  "cell-height": w2h(lw * 2),
  fill: "#ffcd06",
  stroke: "#3b3b3b",
  "opacity": 0.2,
  "stroke-width": .3,
  "background-color": "#FFFFFF",
  "bitmap": { "x,y": 0 },
  "cursor-bit": 1,
}

export const config = { ...initialConfig }

export const ControlPanelProvider = props => {
  // we are never setting this signal outside of the event handler, so we don't need export the setter
  const [controls, setControls] = createStore(props.config || config), controlPanel = [
    controls,
    {
      setCellWidth(number: number) {
        setControls(settings => { return { ...settings, "cell-width": number, "cell-height": w2h(number * 2) } })
      },
      setFill(string: string) {
        setControls(settings => { return { ...settings, fill: string } })
      },
      setStroke(string: string) {
        setControls(settings => { return { ...settings, stroke: string } })
      },
      setStrokeWidth(number: number) {
        setControls(settings => { return { ...settings, "stroke-width": number } })
      },
      setBitPattern(number: number) {
        setControls(settings => { return { ...settings, "bit-pattern": { "x,y": number } } })
      },
      setBitmap(bitPattern) {
        setControls(settings => { return { ...settings, bitmap: { ...settings.bitmap, ...bitPattern } } })
      },
      setOpacity(number: number) {
        setControls(settings => { return { ...settings, "opacity": number } })
      },
      setBackgroundColor(string: string) {
        setControls(settings => { return { ...settings, "background-color": string } })
      },
      setCursorBit(string: string) {
        setControls(settings => { return { ...settings, "cursor-bit": string } })
      },
      reset() {
        setControls(() => {
          return initialConfig
        })
      }
    }
  ]

  return (
    <ControlPanelContext.Provider value={controlPanel}>
      {props.children}
    </ControlPanelContext.Provider>
  )
}

export function useControlPanel() { return useContext(ControlPanelContext) }