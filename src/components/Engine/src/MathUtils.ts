/* eslint-disable max-params */
export class MathUtils {
  public static getDistance (x1: number, y1: number, x2: number, y2: number) {
    const distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    return distance
  }
}
