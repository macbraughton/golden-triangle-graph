import { useViewport } from '../stores/viewport'
import Svg from '../components/Svg'
import { h2w, w2h } from '../utils';
import { createSignal, onMount, onCleanup, For } from 'solid-js';
import { cellgen } from '../utils'
import { sign } from 'mathjs'
import { useControlPanel } from '../stores/controls';

const Graph = props => {
  const [viewPort] = useViewport()
  const [controls, { setCellWidth }] = useControlPanel()
  const minX = () => viewPort()["min-x"]
  const minY = () => viewPort()["min-y"]
  const width = () => viewPort().width
  const height = () => viewPort().height
  const viewBox = () => `${minX()} ${minY()} ${width()} ${height()}`

  const w = () => controls["cell-width"]
  console.log(controls)

  const h = () => w2h(w() * 2)

  const initialCells = () => {
    const output = cellgen(w(), h(), viewPort())
    console.log(output)
    return output
  }

  const mouseWheel = (event) => {
    if (sign(event.deltaY) > 0) {
      setCellWidth(+w() + 1)
    } else setCellWidth(+w() - 1)
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
    <Svg viewBox={viewBox()}>
      <g shape-rendering="geometricPrecision">
        <For each={initialCells()}>{d =>
          <path class="cell" d={d} fill={controls.fill} stroke={controls.stroke} stroke-width={controls["stroke-width"]} />
        }
        </For>
      </g>
    </Svg>
  );
}

export default Graph;