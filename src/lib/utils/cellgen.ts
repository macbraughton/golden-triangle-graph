import { ceil, floor, range } from 'mathjs';
import { d2byte } from '.';

export const quadraticArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]

const cellCoordIndexes = [[1, 0], [1, 2], [3, 2], [3, 4], [5, 4], [5, 6], [7, 6], [7, 0]]

const baseCoordinates = (w = 1, h = 1) => {
  return quadraticArray.map(el => [el[0] * w, el[1] * h])
}

export const genTribyteCoordinates = (axis = [0, 0], w = 1, h = 1) => {
  const cellCoordinates = baseCoordinates(w, h).map(a => [axis[0] + a[0], axis[1] + a[1]])
  return cellCoordIndexes.map((cci) => [axis, cellCoordinates[cci[0]], cellCoordinates[cci[1]]])
}

const cellDimensions = (w = 1, h = 1) => { return { width: w * 2, height: h * 2, area: w * h * 4 } }

const xfAxis = (axis = [1, 1], w = 1, h = 1) => [axis[0] * w * 2, axis[1] * h * 2]

const genGridAxes = (xRange = [-1, 0, 1], yRange = [-1, 0, 1]) => {
  if (xRange.length > yRange.length) {
    return xRange.map(x => yRange.map(y => [x, y])).flat()
  } else return yRange.map(x => xRange.map(y => [x, y])).flat()
}

const genCellAxes = (gridAxes = [[-1, 1], [-1, 1]], w = 1, h = 1) => {
  return gridAxes.map(a => { return { "grid-axis": a, axis: xfAxis(a, w, h) } })
}

const roundUpToOdd = (n: number) => {
  let up = ceil(n)
  if (up % 2 === 0) {
    return up + 1
  } else return up
}

export const gridDimensions = (w: number, h: number, viewPort) => {
  const dimensions = cellDimensions(w, h)
  const [, , vpw, vph] = viewPort.split(" ")
  const cols = roundUpToOdd(vpw / dimensions.width)
  const rows = roundUpToOdd(vph / dimensions.height)
  const xRangeBase = floor(cols / 2)
  const yRangeBase = floor(rows / 2)
  const xRange = range(-xRangeBase, xRangeBase, true)._data
  const yRange = range(-yRangeBase, yRangeBase, true)._data
  const gridAxes = genGridAxes(xRange, yRange)
  let output = {
    cols,
    rows,
    xRange,
    yRange,
    gridAxes,
  }
  return output
}

export const cellDrawString = (coords: [number, number, number]) => {
  return `M ${coords[0]} L ${coords[1]} L ${coords[2]} z`
}

export const genCell = (axis: [number, number], w: number, h: number) => {
  return { axis, coords: genTribyteCoordinates(axis, w, h) }
}

export const groupCoords = (tbc, byte) => {
  const byteStringArray = d2byte(byte).split("").map(b => +b)
  let coords = tbc.reduce((ac, val, i) => {
    if (byteStringArray[i] && i === 0) {
      ac = [[val]]
    }
    else if (byteStringArray[7] && i === 7) {
      if (byteStringArray[0]) {
        ac[0] = [...ac[0], val]
      } else if (byteStringArray[i - 1]) {
        ac[ac.length - 1] = [...ac[ac.length - 1], val]
      } else ac = [...ac, [val]]
    } else if (byteStringArray[i]) {
      if (byteStringArray[i - 1]) {
        ac[ac.length - 1] = [...ac[ac.length - 1], val]
      } else ac = [...ac, [val]]
    }
    return ac
  }, [])
  return coords
}

export default function (w: number, h: number, viewPort) {
  const gd = gridDimensions(w, h, viewPort)
  const axes = genCellAxes(gd.gridAxes, w, h)
  return axes.map(a => {
    return {
      "grid-axis": a["grid-axis"],
      axis: a.axis,
      tbc: genTribyteCoordinates(a.axis, w, h)
    }
  })
}


