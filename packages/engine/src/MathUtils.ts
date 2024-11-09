import { Point2 } from './Graphics'

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
  public static getNearestDistanceOfPointToLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) {
    // 如果两点相同，则输出一个点的坐标为垂足
    if (x1 === x2 && y1 === y2) {
      return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))
    }

    let k = -((x1 - x0) * (x2 - x1) + (y1 - y0) * (y2 - y1)) / ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    if (k <= 0) {
      return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0))
    } else if (k >= 1) {
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
    if (x1 === x2 && y1 === y2) {
      return new Point2(x1, y1)
    }

    let k = -((x1 - x0) * (x2 - x1) + (y1 - y0) * (y2 - y1)) / ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
    if (k <= 0) {
      return new Point2(x1, y1)
    } else if (k >= 1) {
      return new Point2(x2, y2)
    } else {
      let xf = k * (x2 - x1) + x1
      let yf = k * (y2 - y1) + y1
      return new Point2(xf, yf)
    }
  }

  /**
   * 计算线段平移一段距离后的线段。距离为d。返回2个线段，一个左移动，一个右移动
   * https://blog.csdn.net/weixin_52808620/article/details/131332969
   */
  public static getTranslatedLine(x1: number, y1: number, x2: number, y2: number, d: number) {
    const leftX1 = (d * (y1 - y2)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + x1
    const leftY1 = (d * (x2 - x1)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + y1
    const leftX2 = (d * (y1 - y2)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + x2
    const leftY2 = (d * (x2 - x1)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + y2
    const rightX1 = (d * (y2 - y1)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + x1
    const rightY1 = (d * (x1 - x2)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + y1
    const rightX2 = (d * (y2 - y1)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + x2
    const rightY2 = (d * (x1 - x2)) / Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + y2
    return [leftX1, leftY1, leftX2, leftY2, rightX1, rightY1, rightX2, rightY2]
  }

  /**
   * 自动生成多边形的点，以x,y为中心，沿Y方向对称
   * http://quanzhan.applemei.com/webStack/TXpnM05nPT0%3D
   */
  public static getPolygon(x: number, y: number, radius: number, sides: number) {
    const points: Array<Point2> = []
    let angle = 0
    let centerAngle = (2 * Math.PI) / sides
    for (let i = 0; i < sides; i++) {
      points.push(new Point2(x + radius * Math.sin(angle), y - radius * Math.cos(angle)))
      angle += centerAngle
    }
    //console.log(points)
    return points
  }

  /**
   * 自动生成多边形的点，返回一个正方形范围内点,以左上角为(0, 0)
   */
  public static getPolygonInSquare(squareWidth: number, sides: number) {
    const points: Array<Point2> = MathUtils.getPolygon(0, 0, 100, sides)
    let minX = 0
    let minY = 0
    let maxX = 0
    let maxY = 0
    points.forEach((point) => {
      minX = minX < point.x ? minX : point.x
      minY = minY < point.y ? minY : point.y
      maxX = maxX > point.x ? maxX : point.x
      maxY = maxY > point.y ? maxY : point.y
    })
    const newPoints: Array<Point2> = []
    points.forEach((point) => {
      const x = ((point.x - minX) * squareWidth) / (maxX - minX)
      const y = ((point.y - minY) * squareWidth) / (maxY - minY)
      newPoints.push(new Point2(x, y))
    })

    return newPoints
  }

  /**
   * 自动生成多边星的点，及控制点的起点和终点，返回一个正方形范围内点,以左上角为(0, 0).
   * 默认多边形点即为控制点。多边形的各边中点则为角.控制点选择第一个点。
   */
  public static getStar(squareWidth: number, sides: number): [Point2[], Point2[], Point2, Point2] {
    const points: Array<Point2> = MathUtils.getPolygonInSquare(squareWidth, sides)
    const newPoints: Array<Point2> = []
    const firstPoint = points[0]
    const sencondPoint = points[1]
    const adapterPoint = new Point2((firstPoint.x + sencondPoint.x) / 2, (firstPoint.y + sencondPoint.y) / 2)
    const centerPoint = new Point2(squareWidth / 2, squareWidth / 2)
    for (let i = 0; i < points.length; i++) {
      const start = points[i]
      const end = points[i < points.length - 1 ? i + 1 : 0]
      const newPoint = new Point2((start.x + end.x) / 2, (start.y + end.y) / 2)
      newPoints.push(newPoint)
    }
    return [points, newPoints, centerPoint, adapterPoint]
  }

  /**
   * 已知3点求夹角：A: x1,y1, B: x2,y2, C: x3,y3。返回BAC角度. 无法支持大于180度或者方向
   * Ref：https://blog.csdn.net/zhang1244j/article/details/55053184
   */
  public static getAngleIn3Points(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    const lengthAB = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    const lengthAC = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2))
    const lengthBC = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2))
    const cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) / (2 * lengthAB * lengthAC)
    const angleA = Math.round((Math.acos(cosA) * 180) / Math.PI)

    return angleA
  }

  /**
   * 已知3点求夹角：A: x1,y1, B: x2,y2, C: x3,y3。返回BAC角度
   * Ref：https://blog.csdn.net/xiangxianghehe/article/details/99544534
   */
  public static getAngleIn3PointsEx(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    let theta = Math.atan2(x2 - x1, y2 - y1) - Math.atan2(x3 - x1, y3 - y1)
    if (theta > Math.PI) {
      theta -= 2 * Math.PI
    }
    if (theta < -Math.PI) {
      theta += 2 * Math.PI
    }
    return theta
  }
}
