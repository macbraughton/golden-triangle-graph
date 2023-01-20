import { createSignal, createContext, useContext, onCleanup, onMount } from "solid-js";
import vb from "../utils/vb";

const ViewportContext = createContext();


export const ViewportProvider = props => {
  // we are never setting this signal outside of the event handler, so we don't need export the setter
  const [viewBox, setViewBox] = createSignal(vb(window.innerWidth, window.innerHeight)), vbx = [viewBox, {}]

  const handler = (event: Event) => {
    setViewBox(vb(window.innerWidth, window.innerHeight))
  }

  onMount(() => {
    window.addEventListener('resize', handler)
  })

  onCleanup(() => {
    window.removeEventListener('resize', handler)
  })

  return (
    <ViewportContext.Provider value={vbx}>
      {props.children}
    </ViewportContext.Provider>
  )
}

export function useViewport() { return useContext(ViewportContext)}