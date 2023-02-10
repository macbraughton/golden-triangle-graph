import { createContext, useContext, onMount, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { w2h } from "../utils";
const ControlPanelContext = createContext();

const lw = 8

const viewPort = () => `-${innerWidth / 2} -${innerHeight / 2} ${innerWidth} ${innerHeight}`

const initialConfig = {
  "cell-width": lw,
  "cell-height": w2h(lw * 2),
  fill: "#e2b644",
  stroke: "#e2b644",
  "opacity": 0,
  "stroke-width": .5,
  "background-color": "#333333",
  "bitmap": { "x,y": 0 },
  "cursor-bit": 1,
  "beta-cell": 0,
  viewPort
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
      setBetaCell(string: string) {
        setControls(settings => { return { ...settings, "beta-cell": string } })
      },
      reset() {
        setControls(() => {
          return initialConfig
        })
      }
    }
  ]

  const handler = (event: Event) => {
    setControls(settings => {
      return {...settings, viewPort: initialConfig.viewPort()}
    })
  }

  onMount(() => {
    window.addEventListener('resize', handler)
  })

  onCleanup(() => {
    window.removeEventListener('resize', handler)
  })

  return (
    <ControlPanelContext.Provider value={controlPanel}>
      {props.children}
    </ControlPanelContext.Provider>
  )
}

export function useControlPanel() { return useContext(ControlPanelContext) }