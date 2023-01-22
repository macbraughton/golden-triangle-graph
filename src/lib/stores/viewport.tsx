import { createSignal, createContext, useContext, onCleanup, onMount } from "solid-js";

const ViewportContext = createContext();

const config = (width:number, height:number) => {
  return {
    width,
    height,
    "min-x": `-${innerWidth / 2}`,
    "min-y": `-${innerHeight / 2}`,
    area: width * height
  }
}

export const ViewportProvider = props => {
  // we are never setting this signal outside of the event handler, so we don't need export the setter
  const [viewPort, setViewPort] = createSignal(config(innerWidth, innerHeight)), vbx = [viewPort]

  const handler = (event: Event) => {
    setViewPort(config(innerWidth, innerHeight))
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

export function useViewport() { return useContext(ViewportContext) }