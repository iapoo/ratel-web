import { Point2 } from "./Graphics"

/* eslint-disable max-params */
export class MathUtils {

  public static getDistance(x1: number, y1: number, x2: number, y2: number) {
    const distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    return distance
  }

  /**
   * 计算点到线段的最近距离,输入点P(x0,y0)和线段AB（x1,y1,x2,y2）,输出点到线段的最近距离
   * Ref: https://zhuanlan.zhihu.com/p/530972716
   * @param x0 
   * @param y0 
   * @param x1 
   * @param y1 
   * @param x2 
   * @param y2 
   */
  public static getNearestDistanceOfPointToLine(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number) {
    // 如果两点相同，则输出一个点的坐标为垂足
    if (x1 == x2 && y1 == y2) {
      return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))
    }

    let k = -((x1 - x0) * (x2 - x1) + (y1 - y0) * (y2 - y1)) / ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    if (k <= 0) {
      return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))
    }
    else if (k >= 1) {
      return Math.sqrt((x2 - x0) * (x2 - x0) + (y2 - y0) * (y2 - y0))
    } else {
      let xf = k * (x2 - x1) + x1
      let yf = k * (y2 - y1) + y1
      return Math.sqrt((xf - x0) * (xf - x0) + (yf - y0) * (yf - y0))
    }
  }

  /**
   * 计算点到线段的最近点, 输入点P(x0,y0)和线段AB（x1,y1,x2,y2）,输出点到线段的最近点
   * Ref: https://zhuanlan.zhihu.com/p/530972716
   * @param x0 
   * @param y0 
   * @param x1 
   * @param y1 
   * @param x2 
   * @param y2 
   */
  public static getNearestPointOfPointToLine(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number) {
    //如果两点相同，则输出一个点的坐标为垂足
    if(x1 == x2 && y1 == y2) {
        return new Point2(x1, y1)
    } 
    
    let k = -((x1 - x0) * (x2 - x1) + (y1 - y0) * (y2 - y1)) / ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    if (k <= 0) {
        return new Point2(x1, y1)
    } else if(k >= 1) {
        return new Point2(x2, y2)
    } else {
        let xf = k * (x2 - x1) + x1
        let yf = k * (y2 - y1) + y1
        return new Point2(xf, yf)
    }
  }
}
