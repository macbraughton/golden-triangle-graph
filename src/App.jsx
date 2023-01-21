import { useViewport } from './lib/stores/viewport'
import Svg from './lib/components/Svg'
import Rect from './lib/components/Rect';
import { h2w, w2h } from './lib/utils';
import { createSignal, For } from 'solid-js';
function App() {
  const [viewPort] = useViewport()
  const minX = () => viewPort()["min-x"]
  const minY = () => viewPort()["min-y"]
  const width = () => viewPort().width
  const height = () => viewPort().height
  const viewBox = () => `${minX()} ${minY()} ${width()} ${height()}`

  const [h, setH] = createSignal(12)
  const w = () => h2w(h())

  const quadraticArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
  const cellCoordIndexes = [[1, 0], [1, 2], [3, 2], [3, 4], [5, 4], [5, 6], [7, 6], [7, 0]]
  const initialCellAxis = [0, 0]
  const initialCoordinates = () => quadraticArray.map(el => [el[0] * w(), el[1] * h()])
  const initialCells = () => {
    return cellCoordIndexes.map((cci) => [initialCellAxis, initialCoordinates()[cci[0]], initialCoordinates()[cci[1]]])
  }

  const cellDrawString = coords => `M ${coords[0]} L ${coords[1]} L ${coords[2]} z`
  const cellDrawStrings = () => initialCells().map(cellDrawString)
  console.log(cellDrawStrings())
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Svg viewBox={viewBox()}>
        <Rect />
        <For each={cellDrawStrings()}>{ d =>
          <path d={d} fill="none" stroke="black" />
        }
        </For>
      </Svg>
    </div>
  );
}

export default App;
