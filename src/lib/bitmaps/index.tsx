import H from "./H"
import Y from "./Y"
import X from "./X"
import O from "./O"
import S from "./S"
const logo = () => { return { ...H([-28, 0]), ...Y([-15, 0]), ...X(), ...O([14, 0]), ...S([28, 0]) } }
export { H, Y, X, O, S, logo } 