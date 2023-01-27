import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { w2h } from "../utils";
const ControlPanelContext = createContext();

const initialConfig = {
  "cell-width": 20,
  "cell-height": w2h(30 * 2),
  fill: "#ffcd06",
  stroke: "#3b3b3b",
  "stroke-width": 1,
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