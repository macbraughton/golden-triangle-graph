import Svg from '../components/Svg'
import Cell from '../components/Cell'
import { onMount, onCleanup, For, Show, createMemo } from 'solid-js';
import { cellgen } from '../utils'
import { sign } from 'mathjs'
import { useControlPanel } from '../stores/controls';
import { logo } from '../bitmaps/02_09'
import Tribyte from './Tribyte';

const Graph = props => {
  
  const [controls, { setCellWidth, setBitmap, setCursorBit }] = useControlPanel()
  
  setBitmap({ ...logo() })

  const cells = createMemo(() => cellgen(controls["cell-width"], controls["cell-height"], controls.viewPort()))
  
  const mouseWheel = (event: Event) => {  
    if (sign(event.deltaY) > 0) {
      setCellWidth(+controls["cell-width"] + 1)
    } else if (+controls["cell-width"] > 4) {
      setCellWidth(+controls["cell-width"] - 1)
    }
  }

  const spaceBar = (event: Event) => {
    if (event.key == " " || event.code == "Space" || event.keyCode == "32") {
      setCursorBit(+!controls["cursor-bit"])
    }
  }

  const doubleClick = (event: Event) => {
    let el = event.target;
    if (+el.dataset.cellBit === 1) {
      let bpcp = el.dataset.bitPattern.split("")
      bpcp[el.dataset.cellBitIndex] = 0
      let newbp = bpcp.join("")
      setBitmap({ [el.dataset.gridAxis]: parseInt(newbp, 2) })
    }
  }

  const mouseDown = (event: Event) => {
    let el = event.target;
    if (+el.dataset.cellBit === +!controls["cursor-bit"]) {
      let bpcp = el.dataset.bitPattern.split("")
      bpcp[el.dataset.cellBitIndex] = controls["cursor-bit"]
      let newbp = bpcp.join("")
      setBitmap({ [el.dataset.gridAxis]: parseInt(newbp, 2) })
    }

    const mouseMoveHandler = (moveEvent: Event) => {
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
      <Svg viewBox={controls.viewPort()}>
        <g shape-rendering="geometricPrecision">
          <Show when={controls["beta-cell"]}
            fallback={
              <For each={cells()}>{cell => <Cell cell={cell} controls={controls} />}
              </For>
            }>
            <For each={cells()}>{cell => <Tribyte cell={cell} controls={controls} />}
            </For>
          </Show>
        </g>
      </Svg>
    </div>
  );
}

export default Graph;
