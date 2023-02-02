import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
const BitmapContext = createContext();

import { H } from "../bitmaps";

const initialConfig = H()

export const config = { ...initialConfig }

export const BitmapProvider = props => {
  // we are never setting this signal outside of the event handler, so we don't need export the setter
  const [bitmap, setBitmap] = createStore(props.config || config), bitmapProvider = [
    bitmap,
    {
      setBitmap,
      reset() {
        setBitmap(() => {
          return initialConfig
        })
      }
    }
  ]

  return (
    <BitmapContext.Provider value={bitmapProvider}>
      {props.children}
    </BitmapContext.Provider>
  )
}

export function useBitmap() { return useContext(BitmapContext) }