import { adjustAxis } from "../utils"
import { range } from "mathjs"

let b = {
  '0': 255,
  '1': 96,
  '2': 6,
  '3': 225,
  '4': 30,
  '5': 135,
  '6': 120
}

const H = (axis = [0, 0]) => {
  
  const base = {
    // middle bar
    '-8,0': b[1],
    '8,0': b[2],
    // left side top
    '-5,-3': b[3],
    '-4,-3': b[0],
    '-3,-3': b[0],
    '-2,-3': b[4],
    '-3,-2': b[4],
    '-4,-2': b[0],
    '-5,-2': b[0],
    '-6,-2': b[3],
    '-4,-1': b[4],
    '-5,-1': b[0],
    '-6,-1': b[0],
    '-7,-1': b[3],
    // right side top
    '5,-3': b[5],
    '4,-3': b[0],
    '3,-3': b[0],
    '2,-3': b[6],
    '3,-2': b[6],
    '4,-2': b[0],
    '5,-2': b[0],
    '6,-2': b[5],
    '4,-1': b[6],
    '5,-1': b[0],
    '6,-1': b[0],
    '7,-1': b[5],
    // left side bottom,
    '-5,3': b[6],
    '-4,3': b[0],
    '-3,3': b[0],
    '-2,3': b[5],
    '-3,2': b[5],
    '-4,2': b[0],
    '-5,2': b[0],
    '-6,2': b[6],
    '-4,1': b[5],
    '-5,1': b[0],
    '-6,1': b[0],
    '-7,1': b[6],
    // right side bottom
    '5,3': b[4],
    '4,3': b[0],
    '3,3': b[0],
    '2,3': b[3],
    '3,2': b[3],
    '4,2': b[0],
    '5,2': b[0],
    '6,2': b[4],
    '4,1': b[3],
    '5,1': b[0],
    '6,1': b[0],
    '7,1': b[4],
  }
  
  range(-7, 7, true)._data.map(i => [i, 0]).map(a => base[a] = b[0])
  
  if (axis[0] === 0 && axis[1] === 0) {
    return base
  }
  else {
    return adjustAxis(axis, base)
  }
}

export default H