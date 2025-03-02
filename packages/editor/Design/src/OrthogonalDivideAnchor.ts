import { Point2, Rectangle } from '@ratel-web/engine'
import { Editor, EditorMode, SelectionLayer } from '../../Editor'
import { Connector } from '../../Items'
import { EditorUtils } from '../../Theme'
import { Anchor } from './Anchor'
import { Holder } from './Holder'
import { OrthogonalHelper } from './OrthogonalHelper'

/**
 * 创建连接线
 */
export class OrthogonalDivideAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  private _index = 0
  private _left = true
  private _orthogonalPoints: Point2[] = []
  //private _orthogonals: number[] = []

  public constructor(editor: Editor, holder: Holder, index: number, left: boolean) {
    super(editor, holder)
    this.width = 10
    this.height = 10
    this._index = index
    this._left = left
    this.fill.setColor(EditorUtils.anchorOrthogonalDivideFillColor)
    this.stroke.setColor(EditorUtils.anchorOrthogonalDivideStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorOrthogonalDivideStrokeLineWidth)
    this.stroke.setAlpha(0)
    this.fill.setAlpha(0)
    this.buildAnchor()
  }

  public get index() {
    return this._index
  }

  public get isLeft() {
    return this._left
  }

  public handlePointerEnter(): void {
    this.stroke.setAlpha(1)
    this.fill.setAlpha(1)
  }

  public handlePointerLeave(): void {
    this.stroke.setAlpha(0)
    this.fill.setAlpha(0)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerClick(x: number, y: number) {}
  public handlePointerDown(x: number, y: number) {
    if (!this.target) {
      return
    }
    this._moving = true
    this._startX = x
    this._startY = y
    //this.makeReady()
    if (this.target instanceof Connector) {
      this._orthogonalPoints.length = 0
      //this._orthogonals.length = 0
      this._orthogonalPoints = this._orthogonalPoints.concat(this.target.orthogonalPoints)
      //this._orthogonals = this._orthogonals.concat(this.target.orthogonals)
      this.editor.beginOperation()
    }
  }

  public handlePointerUp(x: number, y: number) {
    if (!this.target) {
      return
    }
    const theSelectionLayer = this.editor.selectionLayer as SelectionLayer
    const moveX = x - this._startX
    const moveY = y - this._startY
    if (this.target instanceof Connector && (moveX !== 0 || moveY !== 0)) {
      this.target.markOrthogonalPointsModified()
    }
    if (!theSelectionLayer.hasEditorItem(this.target)) {
      theSelectionLayer.inHolder = true
      theSelectionLayer.removeAllEditorItems()
      theSelectionLayer.addEditorItem(this.target)
    }
    this.editor.triggerSelectionChange()
    this._moving = false
    this.editor.finishOperation()
  }

  public handlePointerMove(x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }

    //if(!this.ready) {
    //  this._startX = x
    //  this._startY = y
    //  this.makeReady()
    //  return
    //}

    // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
    const nowTime = new Date().getTime()
    if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
      if (this._moving && this.target instanceof Connector) {
        const moveX = x - this._startX
        const moveY = y - this._startY
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const orthogonalPointCount = this._orthogonalPoints.length
        let orthogonalPoints: Point2[] = []
        orthogonalPoints = orthogonalPoints.concat(this._orthogonalPoints)
        const orthogonalPoint = orthogonalPoints[this._index]
        const nextOrthogonalPoint = orthogonalPoints[this._index + 1]
        //const orthogonalWidth = this.target.horizontal ? this.target.width - ConnectorShape.DEFAULT_SEGMENT * 2 : this.target.width
        //const orthogonalHeight = this.target.horizontal ? this.target.height : this.target.height - ConnectorShape.DEFAULT_SEGMENT * 2
        //const orthogonalSegmentX = this.target.horizontal ? ConnectorShape.DEFAULT_SEGMENT : 0
        //const orthogonalSegmentY = this.target.horizontal ? 0 : ConnectorShape.DEFAULT_SEGMENT
        //let orthogonals: number[] = []
        //orthogonals = orthogonals.concat(this._orthogonals)
        //let lineIndex = (this._index - 1) * 2
        if (this._left) {
          if (orthogonalPoint.y === nextOrthogonalPoint.y) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const leftPoint = new Point2(orthogonalPoint.x, orthogonalPoint.y)
            const currentPoint = new Point2(orthogonalPoint.x, orthogonalPoint.y + moveY)
            const nextPoint = new Point2((orthogonalPoint.x + nextOrthogonalPoint.x) / 2, orthogonalPoint.y + moveY)
            const rightPoint = new Point2((orthogonalPoint.x + nextOrthogonalPoint.x) / 2, orthogonalPoint.y)
            //orthogonals.splice(lineIndex, 0, currentPoint.x / orthogonalWidth, currentPoint.y / orthogonalHeight,
            //  nextPoint.x / orthogonalWidth, nextPoint.y / orthogonalHeight,
            //  rightPoint.x / orthogonalWidth, rightPoint.y / orthogonalHeight)
            //this.cleanupLines(orthogonals)
            //this.target.orthogonals = orthogonals
            orthogonalPoints.splice(this._index + 1, 0, currentPoint, nextPoint, rightPoint)
            OrthogonalHelper.cleanOrthogonalPoints(orthogonalPoints)
            this.target.orthogonalPoints = orthogonalPoints
            //console.log(`length = ${orthogonals.length}`)
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const leftPoint = new Point2(orthogonalPoint.x, orthogonalPoint.y)
            const currentPoint = new Point2(orthogonalPoint.x + moveX, orthogonalPoint.y)
            const nextPoint = new Point2(orthogonalPoint.x + moveX, (orthogonalPoint.y + nextOrthogonalPoint.y) / 2)
            const rightPoint = new Point2(orthogonalPoint.x, (orthogonalPoint.y + nextOrthogonalPoint.y) / 2)
            //console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            //orthogonals.forEach(orthogonal=> {
            //  console.log(`orthogonal= ${orthogonal}`)
            //})
            //orthogonals.splice(lineIndex, 0, currentPoint.x / orthogonalWidth, currentPoint.y / orthogonalHeight,
            //  nextPoint.x / orthogonalWidth, nextPoint.y / orthogonalHeight,
            //  rightPoint.x / orthogonalWidth, rightPoint.y / orthogonalHeight)
            //this.cleanupLines(orthogonals)
            //this.target.orthogonals = orthogonals
            orthogonalPoints.splice(this._index + 1, 0, currentPoint, nextPoint, rightPoint)
            OrthogonalHelper.cleanOrthogonalPoints(orthogonalPoints)
            this.target.orthogonalPoints = orthogonalPoints

            //console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            //orthogonals.forEach(orthogonal=> {
            //  console.log(`orthogonal= ${orthogonal}`)
            //})
          }
        } else {
          if (orthogonalPoint.y === nextOrthogonalPoint.y) {
            const leftPoint = new Point2((orthogonalPoint.x + nextOrthogonalPoint.x) / 2, orthogonalPoint.y)
            const currentPoint = new Point2((orthogonalPoint.x + nextOrthogonalPoint.x) / 2, orthogonalPoint.y + moveY)
            const nextPoint = new Point2(nextOrthogonalPoint.x, nextOrthogonalPoint.y + moveY)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const rightPoint = new Point2(nextOrthogonalPoint.x, nextOrthogonalPoint.y)
            // orthogonals.splice(lineIndex, 0, leftPoint.x / orthogonalWidth, leftPoint.y / orthogonalHeight,
            //   currentPoint.x / orthogonalWidth, currentPoint.y / orthogonalHeight,
            //   nextPoint.x / orthogonalWidth, nextPoint.y / orthogonalHeight)
            // this.cleanupLines(orthogonals)
            // this.target.orthogonals = orthogonals
            // console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            // orthogonals.forEach(orthogonal=> {
            //   console.log(`orthogonal= ${orthogonal}`)
            // })
            orthogonalPoints.splice(this._index + 1, 0, leftPoint, currentPoint, nextPoint)
            OrthogonalHelper.cleanOrthogonalPoints(orthogonalPoints)
            this.target.orthogonalPoints = orthogonalPoints
          } else {
            const leftPoint = new Point2(orthogonalPoint.x, (orthogonalPoint.y + nextOrthogonalPoint.y) / 2)
            const currentPoint = new Point2(orthogonalPoint.x + moveX, (orthogonalPoint.y + nextOrthogonalPoint.y) / 2)
            const nextPoint = new Point2(nextOrthogonalPoint.x + moveX, nextOrthogonalPoint.y)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const rightPoint = new Point2(nextOrthogonalPoint.x, nextOrthogonalPoint.y)
            // orthogonals.splice(lineIndex, 0, leftPoint.x / orthogonalWidth, leftPoint.y / orthogonalHeight,
            //   currentPoint.x / orthogonalWidth, currentPoint.y / orthogonalHeight,
            //   nextPoint.x / orthogonalWidth, nextPoint.y / orthogonalHeight)
            // this.cleanupLines(orthogonals)
            // this.target.orthogonals = orthogonals
            // console.log(` index = ${lineIndex} length = ${orthogonals.length}`)
            // orthogonals.forEach(orthogonal=> {
            //   console.log(`orthogonal= ${orthogonal}`)
            // })
            orthogonalPoints.splice(this._index + 1, 0, leftPoint, currentPoint, nextPoint)
            OrthogonalHelper.cleanOrthogonalPoints(orthogonalPoints)
            this.target.orthogonalPoints = orthogonalPoints
          }
        }

        //this._startX = x
        //this._startY = y
        this.holder.refreshOrthogonalAnchors()
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      } else {
        this.updateEditorCursor()
      }
    }
  }

  // private cleanupLines(orthogonals: number[]) {
  //   const count = orthogonals.length / 2
  //   let index = count - 1
  //   while(index > 0) {
  //     if(index >= 2 && orthogonals[index * 2] == orthogonals[ index * 2 - 4] && orthogonals[index * 2] == orthogonals[index * 2 - 2] ) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     } else if(index >= 2 && orthogonals[index * 2 + 1] == orthogonals[ index * 2 - 3] && orthogonals[index * 2 + 1] == orthogonals[index * 2 - 1] ) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     } else if(index == count - 1 && count > 1 && orthogonals[index * 2 + 1] == 1 && orthogonals[index * 2 - 1] == 1) {
  //       orthogonals.splice(index * 2 , 2)
  //     } else if(index == count - 1 && count > 1 && orthogonals[index * 2 + 1] == 0 && orthogonals[index * 2 - 1] == 0) {
  //       orthogonals.splice(index * 2, 2)
  //     } else if(index == 1 && count > 1 && orthogonals[index * 2 + 1] == 0 && orthogonals[index * 2 - 1] == 0) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     } else if(index == 1 && count > 1 && orthogonals[index * 2 + 1] == 1 && orthogonals[index * 2 - 1] == 1) {
  //       orthogonals.splice(index * 2 - 2, 2)
  //     }
  //     index = index - 1
  //   }
  // }

  protected buildAnchor() {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }

  private updateEditorCursor() {
    if (this.target instanceof Connector) {
      const orthogonalPoints = this.target.orthogonalPoints
      const orthogonalPoint = orthogonalPoints[this._index]
      const nextOrthogonalPoint = orthogonalPoints[this._index + 1]
      if (orthogonalPoint.y === nextOrthogonalPoint.y) {
        this.editor.updateEditorMode(EditorMode.N_RESIZE)
      } else {
        this.editor.updateEditorMode(EditorMode.W_RESIZE)
      }
    } else {
      this.editor.updateEditorMode(EditorMode.AUTO)
    }
  }
}
