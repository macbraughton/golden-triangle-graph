import { useViewport } from '../stores/viewport'
import Svg from '../components/Svg'
import Cell from '../components/Cell'
import { onMount, onCleanup, For } from 'solid-js';
import { cellgen } from '../utils'
import { sign } from 'mathjs'
import { useControlPanel } from '../stores/controls';
import { H, Y } from '../bitmaps'
import { useBitmap } from '../stores/bitmap';

const Graph = props => {
  const [viewPort] = useViewport()
  const [controls, { setCellWidth }] = useControlPanel()
  const [bitmap, { setBitmap }] = useBitmap()
  const minX = () => viewPort()["min-x"]
  const minY = () => viewPort()["min-y"]
  const width = () => viewPort().width
  const height = () => viewPort().height
  const viewBox = () => `${minX()} ${minY()} ${width()} ${height()}`

  const w = () => controls["cell-width"]
  const h = () => controls["cell-height"]

  const initialCells = () => {
    const output = cellgen(w(), h(), viewPort())
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
    let el = event.target;
    if (+el.dataset.cellBit === 1) {
      let bpcp = el.dataset.bitPattern.split("")
      bpcp[el.dataset.cellBitIndex] = 0
      let newbp = bpcp.join("")
      setBitmap({ [el.dataset.gridAxis]: newbp })
    }
  }

  const mouseDown = (event) => {
    let el = event.target;
    if (+el.dataset.cellBit === 0) {
      let bpcp = el.dataset.bitPattern.split("")
      bpcp[el.dataset.cellBitIndex] = 1
      let newbp = bpcp.join("")
      setBitmap({ [el.dataset.gridAxis]: newbp })
    }

    const mouseMoveHandler = (moveEvent) => {
      let newElement = document.elementsFromPoint(moveEvent.clientX, moveEvent.clientY).find(element => element.classList);
      if (newElement !== el) {
        el = newElement;
        if (+el.dataset.cellBit === 0) {
          let bpcp = el.dataset.bitPattern.split("")
          bpcp[el.dataset.cellBitIndex] = 1
          let newbp = bpcp.join("")
          setBitmap({ [el.dataset.gridAxis]: newbp })
        }
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
        <For each={initialCells()}>{cell => <Cell cell={cell} controls={controls} bitmap={bitmap} />}
        </For>
      </g>
    </Svg>
  );
}

export default Graph;
