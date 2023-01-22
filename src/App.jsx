import { useViewport } from './lib/stores/viewport'
import Svg from './lib/components/Svg'
import { h2w } from './lib/utils';
import { createSignal, For } from 'solid-js';
import { ceil, floor, range } from 'mathjs';
const onClick = (e) => {
  console.log(e.target.id)
  e.target.classList.toggle('no-fill')
}

function App() {
  const [viewPort] = useViewport()
  const minX = () => viewPort()["min-x"]
  const minY = () => viewPort()["min-y"]
  const width = () => viewPort().width
  const height = () => viewPort().height
  const viewBox = () => `${minX()} ${minY()} ${width()} ${height()}`

  const [h, setH] = createSignal(200)
  const w = () => h2w(h() / 2)

  const baseCoordinates = (w, h) => {
    const quadraticArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
    return quadraticArray.map(el => [el[0] * w, el[1] * h])
  }

  const genCellGroupCoordinates = (axis, w, h) => {
    const cellCoordIndexes = [[1, 0], [1, 2], [3, 2], [3, 4], [5, 4], [5, 6], [7, 6], [7, 0]]
    const cellCoordinates = baseCoordinates(w, h).map(a => [axis[0] + a[0], axis[1] + a[1]])
    return cellCoordIndexes.map((cci) => [axis, cellCoordinates[cci[0]], cellCoordinates[cci[1]]])
  }

  const cellGroupDimensions = (w, h) => { return { width: w * 2, height: h * 2, area: w * h * 4 } }
  const roundUpToOdd = n => {
    let up = ceil(n)
    if (up % 2 === 0) {
      return up + 1
    } else return up
  }

  const gridDimensions = (w, h) => {
    const dimensions = cellGroupDimensions(w, h)
    const cols = roundUpToOdd(viewPort().width / dimensions.width)
    const rows = roundUpToOdd(viewPort().height / dimensions.height)
    const xRangeBase = floor(cols / 2)
    const yRangeBase = floor(rows / 2)
    const xRange = range(-xRangeBase, xRangeBase, true)._data
    const yRange = range(-yRangeBase, yRangeBase, true)._data
    const genCellAxes = (xRange, yRange) => {
      if (xRange.length > yRange.length) {
        return xRange.map(x => yRange.map(y => [x, y]))
      } else return yRange.map(x => xRange.map(y => [x, y]))
    }
    const cellAxes = genCellAxes(xRange, yRange).flat()
    const genCellCoords = (axes, w, h) => axes.map(a => [a[0] * w * 2, a[1] * h * 2])
    let output = {
      cols,
      rows,
      xRange,
      yRange,
      cellAxes, 
      cellCoords: genCellCoords(cellAxes, w, h)
    }
    console.log(output)
    return output
  }
  const cellDrawString = coords => `M ${coords[0]} L ${coords[1]} L ${coords[2]} z`

  const genCellsCoords = (w, h) => {
    const output = gridDimensions(w, h).cellCoords.map(axis => genCellGroupCoordinates(axis, w, h)).flat()
    return output
  }

  const initialCells = () => {
    return genCellsCoords(w(), h()).map(cellDrawString)
  }

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Svg viewBox={viewBox()}>
        <g shape-rendering="geometricPrecision">
          <For each={initialCells()}>{d =>
            <path d={d} fill="#BEBEBE" stroke="black" onClick={onClick} />
          }
          </For>
        </g>
      </Svg>
    </div>
  );
}

export default App;
