/**
 * Smoothly interpolates a scale factor based on item count.
 *
 *   1 item  → 3.0  (hero-sized)
 *   2 items → 2.4
 *   4 items → 1.9
 *   6 items → 1.6
 *   8 items → 1.35 (default)
 *  12 items → 1.05
 *  16+items → 0.85 (compact)
 *
 * Between breakpoints the value is linearly interpolated so there are no
 * abrupt jumps as the user toggles items on/off.
 */
const BREAKPOINTS: readonly [n: number, s: number][] = [
  [1, 3.0],
  [2, 2.4],
  [4, 1.9],
  [6, 1.6],
  [8, 1.35],
  [12, 1.05],
  [16, 0.85],
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

const SPOTLIGHT_SCALE: Record<1 | 2 | 3, number> = {
  1: 3.4,
  2: 2.5,
  3: 2.0,
};

export function getSpotlightScale(itemCount: number): number {
  const n = Math.min(3, Math.max(1, itemCount)) as 1 | 2 | 3;
  return SPOTLIGHT_SCALE[n];
}

export function getGridColumns(itemCount: number): number {
  if (itemCount <= 1) return 1;
  if (itemCount <= 3) return 2;
  return Math.min(6, Math.ceil(itemCount / 3));
}
