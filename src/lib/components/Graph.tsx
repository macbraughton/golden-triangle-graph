import { useViewport } from '../stores/viewport'
import Svg from '../components/Svg'
import Cell from '../components/Cell'
import { onMount, onCleanup, For } from 'solid-js';
import { cellgen } from '../utils'
import { sign } from 'mathjs'
import { useControlPanel } from '../stores/controls';
import { H, X, Y, O, S, logo } from '../bitmaps/02_06'

const Graph = props => {
  const [viewPort] = useViewport()
  const [controls, { setCellWidth, setBitmap, setCursorBit }] = useControlPanel()
  const minX = () => viewPort()["min-x"]
  const minY = () => viewPort()["min-y"]
  const width = () => viewPort().width
  const height = () => viewPort().height
  const viewBox = () => `${minX()} ${minY()} ${width()} ${height()}`
  setBitmap({ ...logo()})
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

  const spaceBar = (event) => {
    if (event.key == " " || event.code == "Space" || event.keyCode == "32") {
      setCursorBit(+!controls["cursor-bit"])
    }
  }

  const doubleClick = (event) => {
    let el = event.target;
    if (+el.dataset.cellBit === 1) {
      let bpcp = el.dataset.bitPattern.split("")
      bpcp[el.dataset.cellBitIndex] = 0
      let newbp = bpcp.join("")
      setBitmap({ [el.dataset.gridAxis]: parseInt(newbp, 2) })
    }
  }

  const mouseDown = (event) => {
    let el = event.target;
    if (+el.dataset.cellBit === +!controls["cursor-bit"]) {
      let bpcp = el.dataset.bitPattern.split("")
      bpcp[el.dataset.cellBitIndex] = controls["cursor-bit"]
      let newbp = bpcp.join("")
      setBitmap({ [el.dataset.gridAxis]: parseInt(newbp, 2) })
    }

    const mouseMoveHandler = (moveEvent) => {
      let newElement = document.elementsFromPoint(moveEvent.clientX, moveEvent.clientY).find(element => element.classList);
      if (newElement !== el) {
        el = newElement;
        if (+el.dataset.cellBit === +!controls["cursor-bit"]) {
          let bpcp = el.dataset.bitPattern.split("")
          bpcp[el.dataset.cellBitIndex] = controls["cursor-bit"]
          let newbp = bpcp.join("")
          setBitmap({ [el.dataset.gridAxis]: parseInt(newbp, 2) })
        }
      }
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    });
  };


  onMount(() => {
    window.addEventListener('keyup', spaceBar)
    window.addEventListener('mousewheel', mouseWheel)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('dblclick', doubleClick)
  })

  onCleanup(() => {
    window.addEventListener('keyup', spaceBar)
    window.removeEventListener('mousewheel', mouseWheel)
    window.removeEventListener('mousedown', mouseDown)
    window.removeEventListener('dblclick', doubleClick)
  })

  return (
    <div style={{ "background-color": controls["background-color"] }}>
      <Svg viewBox={viewBox()}>
        <g shape-rendering="geometricPrecision">
          <For each={initialCells()}>{cell => <Cell cell={cell} controls={controls} />}
          </For>
        </g>
      </Svg>
    </div>
  );
}

export default Graph;
