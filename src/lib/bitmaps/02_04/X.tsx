import { adjustAxis } from "../../utils"

const X = (axis = [0, 0]) => {

  const base = {
    "-1,0": 249,
    "0,0": 255,
    "1,0": 255,
    "2,-1": 255,
    "3,-2": 255,
    "4,-2": 30,
    "3,-1": 30,
    "2,0": 159,
    "2,1": 255,
    "3,2": 255,
    "4,2": 135,
    "3,1": 135,
    "4,-3": 255,
    "5,-3": 30,
    "-1,-1": 255,
    "-2,-1": 120,
    "-2,-2": 255,
    "-3,-2": 120,
    "-3,-3": 255,
    "-4,-3": 120,
    "-1,1": 255,
    "-2,1": 225,
    "-2,2": 255,
    "-3,2": 225,
    "-3,3": 255,
    "-4,3": 225,
    "4,3": 255,
    "5,3": 135,
    "0,-1": 255,
    "0,1": 255,
    "-2,-3": 255,
    "-1,-2": 255,
    "1,-1": 255,
    "2,-2": 255,
    "3,-3": 255,
    "-1,2": 255,
    "-2,3": 255,
    "1,1": 255,
    "2,2": 255,
    "3,3": 255,
    "-1,-3": 135,
    "0,-2": 135,
    "1,2": 120,
    "2,3": 120,
    "2,-3": 225,
    "1,-2": 225,
    "-1,3": 30,
    "0,2": 30
  }

  if (axis[0] === 0 && axis[1] === 0) {
    return base
  }
  else {
    return adjustAxis(axis, base)
  }
}

export default X