import { adjustAxis } from "../utils"

let b = {
  '0': 255,
  '1': 96,
  '2': 6,
  '3': 225,
  '4': 30,
  '5': 135,
  '6': 120,
}

const Y = (axis = [0, 0]) => {
  
  const base = {
    // left side top
    '-7,-3': b[6],
    '-6,-3': b[0],
    '-5,-3': b[0],
    '-4,-3': b[5],
    '-3,-2': b[5],
    '-4,-2': b[0],
    '-5,-2': b[0],
    '-6,-2': b[6],
    '-3,-1': b[0],
    '-2,-1': b[5],
    '-5,-1': b[6],
    '-4,-1': b[0],
    
    //middle bar,
    '-4,0': b[6],
    '-3,0': b[0],
    '-2,0': b[0],
    '-1,0': b[0],
    '0,0': b[0],
    '1,0': b[0],
    '2,0': b[0],
    '3,0': b[0],
    '4,0': b[4],

    // right side top
    '7,-3': b[4],
    '6,-3': b[0],
    '5,-3': b[0],
    '4,-3': b[3],
    '3,-2': b[3],
    '4,-2': b[0],
    '5,-2': b[0],
    '6,-2': b[4],
    '3,-1': b[0],
    '2,-1': b[3],
    '5,-1': b[4],
    '4,-1': b[0],

    // right side bottom
    '3,1': b[4],
    '2,1': b[0],
    '1,1': b[0],
    '0,1': b[3],
    '2,2': b[4],
    '1,2': b[0],
    '0,2': b[0],
    '-1,2': b[3],
    '1,3': b[4],
    '0,3': b[0],
    '-1,3': b[0],
    '-2,3': b[3],
  }
  
  if (axis[0] === 0 && axis[1] === 0) {
    return base
  }
  else {
    return adjustAxis(axis, base)
  }
}

export default Y