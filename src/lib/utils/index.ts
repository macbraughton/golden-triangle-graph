import { unit, phi, tan } from "mathjs";
import cellgen, { gridDimensions } from "./cellgen";

export { cellgen, gridDimensions }

export const alpha = unit(72, 'deg');
export const beta = unit(36, 'deg');
export const delta = unit(18, 'deg')
export const gamma = Math.sqrt(phi ** 2 - 1 / 4)
export const h2w = (h: number): number => h / gamma;
export const w2h = (w: number): number => w * gamma;
export const a = (b: number): number => b * phi;
export const b = (a: number): number => a / phi;
export const d = (h: number): number => 2 * h / tan(alpha)
export const vb = (width: number, height: number): string => `-${width / 2} -${height / 2} ${width} ${height}`
