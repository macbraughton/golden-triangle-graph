import { adjustAxis } from "../../utils"

const O = (axis = [0, 0]) => {

  const base = {
    "4,-2": 255,
    "5,-2": 255,
    "4,2": 255,
    "5,2": 255,
    "4,-3": 255,
    "5,-3": 135,
    "6,-2": 135,
    "5,-1": 255,
    "5,1": 255,
    "6,2": 30,
    "-3,-3": 255,
    "-4,-3": 255,
    "-5,-3": 225,
    "-5,-2": 255,
    "-4,-2": 255,
    "-3,3": 255,
    "-4,3": 255,
    "-5,3": 120,
    "-5,2": 255,
    "-4,2": 255,
    "4,3": 255,
    "5,3": 30,
    "-2,-3": 255,
    "-1,-3": 255,
    "0,-3": 255,
    "2,-3": 255,
    "3,-3": 255,
    "1,-3": 255,
    "-2,3": 255,
    "-1,3": 255,
    "0,3": 255,
    "1,3": 255,
    "2,3": 255,
    "3,3": 255,
    "-6,2": 120,
    "-6,1": 255,
    "-7,1": 120,
    "-7,0": 255,
    "-8,0": 96,
    "-7,-1": 225,
    "-6,-1": 255,
    "-6,-2": 225,
    "-5,-1": 255,
    "-6,0": 255,
    "-5,1": 255,
    "6,1": 255,
    "6,0": 255,
    "7,1": 30,
    "7,0": 255,
    "8,0": 6,
    "7,-1": 135,
    "6,-1": 255,
    "-5,0": 159,
    "-4,-1": 30,
    "-3,-2": 30,
    "-3,2": 135,
    "-4,1": 135,
    "5,0": 249,
    "3,2": 225,
    "4,1": 225,
    "3,-2": 120,
    "4,-1": 120
  }

  if (axis[0] === 0 && axis[1] === 0) {
    return base
  }
  else {
    return adjustAxis(axis, base)
  }
}

export default O