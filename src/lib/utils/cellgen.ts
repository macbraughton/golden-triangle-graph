import { ceil, floor, range } from 'mathjs';
import w2h from './w2h';

const baseCoordinates = (w: number, h: number) => {
  const quadraticArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
  return quadraticArray.map(el => [el[0] * w, el[1] * h])
}

const cellGroupDimensions = (w: number, h: number) => { return { width: w * 2, height: h * 2, area: w * h * 4 } }

const roundUpToOdd = (n: number) => {
  let up = ceil(n)
  if (up % 2 === 0) {
    return up + 1
  } else return up
}

const genCellGroupCoordinates = (axis: [number, number], w: number, h: number) => {
  const cellCoordIndexes = [[1, 0], [1, 2], [3, 2], [3, 4], [5, 4], [5, 6], [7, 6], [7, 0]]
  const cellCoordinates = baseCoordinates(w, h).map(a => [axis[0] + a[0], axis[1] + a[1]])
  return cellCoordIndexes.map((cci) => [axis, cellCoordinates[cci[0]], cellCoordinates[cci[1]]])
}


const genCellAxes = (xRange: [number], yRange: [number]) => {
  if (xRange.length > yRange.length) {
    return xRange.map(x => yRange.map(y => [x, y]))
  } else return yRange.map(x => xRange.map(y => [x, y]))
}

const xfaxis = (axis: [number, number], w: number, h: number) => [axis[0] * w * 2, axis[1] * h * 2]

const genCellCoords = (axis: [number, number], w: number, h: number) => axis.map(a => xfaxis(a, w, h))

export const gridDimensions = (w: number, h: number, viewPort) => {
  const dimensions = cellGroupDimensions(w, h)
  const cols = roundUpToOdd(viewPort.width / dimensions.width)
  const rows = roundUpToOdd(viewPort.height / dimensions.height)
  const xRangeBase = floor(cols / 2)
  const yRangeBase = floor(rows / 2)
  const xRange = range(-xRangeBase, xRangeBase, true)._data
  const yRange = range(-yRangeBase, yRangeBase, true)._data
  const cellAxes = genCellAxes(xRange, yRange).flat()
  const cellCoords = genCellCoords(cellAxes, w, h)
  let output = {
    cols,
    rows,
    xRange,
    yRange,
    cellAxes,
    cellCoords
  }
  return output
}

const cellDrawString = (coords: [number, number, number]) => `M ${coords[0]} L ${coords[1]} L ${coords[2]} z`

export const genCell = (axis: [number, number], w: number, h: number) => {
  return { axis, coords: genCellGroupCoordinates(axis, w, h) }
}

const genCellRenderObject = (cell) => {
  return { axis: cell.axis, coords: cell.coords, d: cell.coords.map(cellDrawString) }
}

export const genAlphaCell = (w: number, h: number) => {
  w = w ? w : 60
  h = h ? h : w2h(60)
  return {"grid-axis": ["x,y"], ...genCellRenderObject({ ...genCell([0, 0], w, h)})}
}

const genCellsCoords = (w: number, h: number, viewPort) => {
  const gd = gridDimensions(w, h, viewPort)
  const output = gd.cellCoords.map((axis, i) => {
    const cell = genCell(axis, w, h)
    return { "grid-axis": gd.cellAxes[i], ...cell }
  }).flat()
  return output
}

export default function (w: number, h: number, viewPort) {
  const cells = genCellsCoords(w, h, viewPort)
  const output = cells.map(cell => {
    const renderObject = genCellRenderObject(cell)
    return { "grid-axis": cell["grid-axis"], ...renderObject }
  })
  return output
}
