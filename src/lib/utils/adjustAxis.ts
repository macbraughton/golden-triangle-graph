const adjustAxis = base => {
  const output = {}
  Object.keys(base).map(key => {
    let newkey = key.split(",").map(n => +n)
    newkey[0] = newkey[0] + axis[0]
    newkey[1] = newkey[1] + axis[1]
    output[newkey] = base[key]
  })
  return output
}

export default adjustAxis