import { useViewport } from './lib/stores/viewport'
import Svg from './lib/components/Svg'
import { h2w } from './lib/utils';
import { createSignal, For } from 'solid-js';
import { cellgen } from './lib/utils'

const onClick = (e) => {
  e.target.classList.toggle('no-fill')
}

function App() {
  const [viewPort] = useViewport()
  const minX = () => viewPort()["min-x"]
  const minY = () => viewPort()["min-y"]
  const width = () => viewPort().width
  const height = () => viewPort().height
  const viewBox = () => `${minX()} ${minY()} ${width()} ${height()}`

  const [h, setH] = createSignal(30)
  const w = () => h2w(h() / 2)

  const initialCells = () => {
    return cellgen(w(), h(), viewPort())
  }

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Svg viewBox={viewBox()}>
        <g shape-rendering="geometricPrecision">
          <For each={initialCells()}>{d =>
            <path class="no-fill" d={d} fill="#BEBEBE" stroke="darkgray" onClick={onClick} />
          }
          </For>
        </g>
      </Svg>
    </div>
  );
}

export default App;
