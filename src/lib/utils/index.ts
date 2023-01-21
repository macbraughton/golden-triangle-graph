import { unit, phi, tan } from "mathjs";

export const alpha = unit(72, 'deg');
export const beta = unit(36, 'deg');
export const delta = unit(18, 'deg')
export const gamma = Math.sqrt(phi ** 2 - 1 / 4)
export const h2w = (h: number): number => h / gamma;
export const w2h = (w: number): number => w * gamma;
export const a = (b: number): number => b * phi;
export const b = (a: number): number => a / phi;
export const d = (h: number): number => 2 * h / tan(alpha)
export const generic = (h: number, t: (h: number, x: number, y: number) => number[], x = 0, y = 0): number[] => {
  return t(h, x, y)
}
export const A = (h: number, x = 0, y = 0): number[] => [x, y - h / 2];
export const B = (h: number, x = 0, y = 0): number[] => [x + h2w(h) / 2, y + h / 2];
export const C = (h: number, x = 0, y = 0): number[] => [x - h2w(h) / 2, y + h / 2];
export const D = (h: number, x = 0, y = 0): number[] => [x + h2w(h / 2) / 2, y - h / 2];
export const E = (h: number, x = 0, y = 0): number[] => [x + h2w(h / 2), y];
export const F = (h: number, x = 0, y = 0): number[] => [x + h2w(h / 2) / 2, y + h / 2];
export const G = (h: number, x = 0, y = 0): number[] => [x - h2w(h / 2) / 2, y + h / 2];
export const H = (h: number, x = 0, y = 0): number[] => [x - h2w(h / 2), y];
export const I = (h: number, x = 0, y = 0): number[] => [x - h2w(h / 2) / 2, y - h / 2];