import { useViewport } from './lib/stores/viewport'
import Svg from './lib/components/Svg'
import { h2w } from './lib/utils';
import { createSignal, onMount, onCleanup, For } from 'solid-js';
import { cellgen } from './lib/utils'
import { sign } from 'mathjs'
import { useControlPanel } from './lib/stores/controls';
import ControlPanel from './lib/components/ControlPanel';

function App() {
  const [viewPort] = useViewport()
  const [controls] = useControlPanel()
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

  const mouseWheel = (event) => {
    if (sign(event.deltaY) > 0) {
      setH(n => n + 1)
    } else setH(n => n - 1)
  }

  const mouseDown = (event) => {
    let currentElement = event.target;
    if (currentElement.classList.contains('cell')) { currentElement.classList.add('no-fill'); }

    const mouseMoveHandler = (moveEvent) => {
      let newElement = document.elementsFromPoint(moveEvent.clientX, moveEvent.clientY).find(element => element.classList);
      if (newElement !== currentElement) {
        currentElement = newElement;
        if (currentElement.classList.contains('cell')) { currentElement.classList.add('no-fill'); }
      }
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    });
  };


  onMount(() => {
    window.addEventListener('mousewheel', mouseWheel)
    window.addEventListener('mousedown', mouseDown)
  })

  onCleanup(() => {
    window.removeEventListener('mousewheel', mouseWheel)
    window.removeEventListener('mousedown', mouseDown)
  })

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <ControlPanel />
      <Svg viewBox={viewBox()}>
        <g shape-rendering="geometricPrecision">
          <For each={initialCells()}>{d =>
            <path class="cell" d={d} fill={controls.fill} stroke={controls.stroke} stroke-width={controls["stroke-width"]} />
          }
          </For>
        </g>
      </Svg>
    </div>
  );
}

export default App;
