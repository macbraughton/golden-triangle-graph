import Cell from './Cell'

const CellTable = () => <div class="celltableWrapper">
  <div class="celltable">
    <div class="a">0</div>
    <div class="b">1</div>
    <div class="c">0</div>
    <div class="f">1</div>
    <div class="d">
      <Cell p="00" />
    </div>
    <div class="e">
      <Cell p="01" />
    </div>
    <div class="g">
      <Cell p="10" />
    </div>
    <div class="h">
      <Cell p="11" />
    </div>
  </div>
</div>

export default CellTable