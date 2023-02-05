import H from "./H"
import Y from "./Y"
import X from "./X"
import O from "./O"
import S from "./S"
const logo = () => { return { ...H([-21, 0]), ...Y([-9, 0]), ...X(), ...O([11, 0]), ...S([23, 0]) } }
export { H, Y, X, O, S, logo } 