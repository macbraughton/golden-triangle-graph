import { unit, phi, tan } from "mathjs";
import cellgen, { gridDimensions } from "./cellgen";
import h2w from "./h2w";
import w2h from "./w2h";
import gamma from "./gamma"
import adjustAxis from "./adjustAxis";

export { cellgen, gridDimensions, h2w, w2h, gamma, adjustAxis }

export const d2byte = (n: number ) => {
  let base = "00000000"
  if (n) {
    return (base + n.toString(2)).slice(-8)
  }
  else return base
}

const calcSmoothBytes = () => {
  let base = [1, 1, 1, 1, 0, 0, 0, 0]
  let numbers = []
  for (let i = 0; i < 8; i++) {
    numbers.push(parseInt(base.join(""), 2))
    let a = base.pop()
    base.unshift(a)
  }
  return numbers
}

const smoothBytes = [
  240,
  120,
  60,
  30,
  15,
  135,
  195,
  225
]

export const corner = byte => {
  byte = byte ? byte : 0

  if (byte === 0 || byte === 255 || smoothBytes.includes(byte)) {
    return false
  }
  else return true
}

export const bitmapRange = bitmap => {
  const ranges = {x: [], y: []}
  const sort = (a, b) => a - b
  bitmap = {...bitmap}
  delete bitmap["x,y"]
  Object.keys(bitmap).map(key => {
    let [x, y] = key.split(",")
    ranges.x.push(+x)
    ranges.y.push(+y)
  })
  const sortedRanges = { x: Array.from(new Set(ranges.x.sort(sort))), y: Array.from(new Set(ranges.y.sort(sort)))}
  const topRowKeys = Object.keys(bitmap).filter(key => {
    let [x, y] = key.split(",")
    return +y === sortedRanges.y[0]
  })
  console.log(topRowKeys)
}

export const alpha = unit(72, 'deg');
export const beta = unit(36, 'deg');
export const delta = unit(18, 'deg')
export const a = (b: number): number => b * phi;
export const b = (a: number): number => a / phi;
export const d = (h: number): number => 2 * h / tan(alpha)
export const vb = (width: number, height: number): string => `-${width / 2} -${height / 2} ${width} ${height}`
