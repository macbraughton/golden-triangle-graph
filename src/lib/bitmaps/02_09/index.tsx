import H from "./H"
import Y from "./Y"
import X from "./X"
import O from "./O"
import S from "./S"
const logo = () => { return { ...H([-23, 0]), ...Y([-11, 0]), ...X(), ...O([12, 0]), ...S([24, 0]) } }
export { H, Y, X, O, S, logo } 