/** Pure gesture decisions, shared by touch and mouse handlers. Units: px and px/ms. */
export function shouldDismissSheet(distance: number, velocity: number): boolean {
  return distance >= 115 || (distance >= 35 && velocity >= 0.65);
}
export function sheetDisplacement(startY: number, currentY: number): number {
  return Math.max(0, currentY - startY);
}
