/**
 * Smoothly interpolates a scale factor based on item count.
 *
 *   1 item  → 2.0  (hero-sized)
 *   2 items → 1.7
 *   4 items → 1.35
 *   6 items → 1.15
 *   8 items → 1.0  (default)
 *  12 items → 0.8
 *  16+items → 0.65 (compact)
 *
 * Between breakpoints the value is linearly interpolated so there are no
 * abrupt jumps as the user toggles items on/off.
 */
const BREAKPOINTS: readonly [n: number, s: number][] = [
  [1, 2.0],
  [2, 1.7],
  [4, 1.35],
  [6, 1.15],
  [8, 1.0],
  [12, 0.8],
  [16, 0.65],
];

export function getResponsiveScale(itemCount: number): number {
  const n = Math.max(1, itemCount);

  if (n <= BREAKPOINTS[0][0]) return BREAKPOINTS[0][1];
  if (n >= BREAKPOINTS[BREAKPOINTS.length - 1][0])
    return BREAKPOINTS[BREAKPOINTS.length - 1][1];

  for (let i = 0; i < BREAKPOINTS.length - 1; i++) {
    const [nA, sA] = BREAKPOINTS[i];
    const [nB, sB] = BREAKPOINTS[i + 1];
    if (n >= nA && n <= nB) {
      const t = (n - nA) / (nB - nA);
      return sA + (sB - sA) * t;
    }
  }

  return 1.0;
}
