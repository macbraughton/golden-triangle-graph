import H from "./H"
import Y from "./Y"
import X from "./X"
import O from "./O"
import S from "./S"
const logo = () => { return { ...H([-26, 0]), ...Y([-12, 0]), ...X(), ...O([14, 0]), ...S([28, 0]) } }
import bl from "./bordered_logo"
import hyx from "./hyx"
import yy from "./yy"
import yy2 from "./yy2"
import hyxos from "./hyxos"
import hyxos2 from "./hyxos2"
export { H, Y, X, O, S, logo, hyx, bl, yy, yy2, hyxos, hyxos2 } 