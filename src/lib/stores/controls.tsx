import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const ControlPanelContext = createContext();

export const config = {
  "cell-width": 30,
  fill: "gray",
  stroke: "black",
  "stroke-width": 1,
}

export const ControlPanelProvider = props => {
  // we are never setting this signal outside of the event handler, so we don't need export the setter
  const [controls, setControls] = createStore(props.config || config), controlPanel = [
    controls,
    {
      setCellWidth(number: number) {
        setControls(settings => { return { ...settings, "cell-width": number } })
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
        setControls(config)
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