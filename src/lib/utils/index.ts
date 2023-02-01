import { unit, phi, tan } from "mathjs";
import cellgen, { gridDimensions } from "./cellgen";
import h2w from "./h2w";
import w2h from "./w2h";
import gamma from "./gamma"
import adjustAxis from "./adjustAxis";

export { cellgen, gridDimensions, h2w, w2h, gamma, adjustAxis }

export const d2byte = (n: number) => {
  let base = "00000000"
  if (n) {
    return (base + n.toString(2)).slice(-8)
  }
  else return base
}

export const alpha = unit(72, 'deg');
export const beta = unit(36, 'deg');
export const delta = unit(18, 'deg')
export const a = (b: number): number => b * phi;
export const b = (a: number): number => a / phi;
export const d = (h: number): number => 2 * h / tan(alpha)
export const vb = (width: number, height: number): string => `-${width / 2} -${height / 2} ${width} ${height}`
