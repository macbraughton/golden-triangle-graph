import { mergeProps } from "solid-js";

import vb from "../utils/vb";
const viewBox = vb(120, 120)

const SVGViewport = props => {

  const merged = mergeProps({ viewBox }, props)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={merged.width} height={merged.height} viewBox={merged.viewBox}>
      {merged.children}
    </svg >
  )
}

export default SVGViewport