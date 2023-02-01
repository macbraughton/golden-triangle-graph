import { useViewport } from '../stores/viewport'
import Svg from '../components/Svg'
import Cell from '../components/Cell'
import { onMount, onCleanup, For } from 'solid-js';
import { cellgen } from '../utils'
import { sign } from 'mathjs'
import { useControlPanel } from '../stores/controls';
import test from '../bitmaps/test'

const Graph = props => {
  const [viewPort] = useViewport()
  const [controls, { setCellWidth }] = useControlPanel()
  const minX = () => viewPort()["min-x"]
  const minY = () => viewPort()["min-y"]
  const width = () => viewPort().width
  const height = () => viewPort().height
  const viewBox = () => `${minX()} ${minY()} ${width()} ${height()}`

  const w = () => controls["cell-width"]
  const h = () => controls["cell-height"]

  const initialCells = () => {
    const output = cellgen(w(), h(), viewPort(), test())
    return output
  }

  const mouseWheel = (event) => {
    if (sign(event.deltaY) > 0) {
      setCellWidth(+w() + 1)
    } else if (+w() > 4) {
      setCellWidth(+w() - 1)
    }
  }

  const doubleClick = (event) => {
    let currentElement = event.target;
    if (currentElement.classList.contains('cell')) { currentElement.classList.remove('no-fill'); }
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
    window.addEventListener('dblclick', doubleClick)
  })

  onCleanup(() => {
    window.removeEventListener('mousewheel', mouseWheel)
    window.removeEventListener('mousedown', mouseDown)
    window.removeEventListener('dblclick', doubleClick)
  })

  return (
    <Svg viewBox={viewBox()}>
      <g shape-rendering="geometricPrecision">
        <For each={initialCells()}>{cell => <Cell cell={cell} controls={controls} />}
        </For>
      </g>
    </Svg>
  );
}

export default Graph;
