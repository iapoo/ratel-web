import { MathUtils, Point2 } from '@ratel-web/engine'
import { Editor, EditorMode } from '../../Editor'
import { ShapeEntity } from '../../Items'
import { EditorUtils } from '../../Theme'
import { Anchor } from './Anchor'
import { Holder } from './Holder'

/**
 * 变形，如调整梯形的梯形大小等, 同ModifyAnchor功能类似
 */
export class ControllerAnchor extends Anchor {
  private _reshaping = false
  private _startX = 0
  private _startY = 0

  public constructor(editor: Editor, holder: Holder) {
    super(editor, holder)
    this.width = 10
    this.height = 10
    this.fill.setColor(EditorUtils.anchorControllerFillColor)
    this.stroke.setColor(EditorUtils.anchorControllerStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorControllerStrokeLineWidth)
    this.buildAnchor()
  }

  public handlePointerEnter(): void {}

  public handlePointerLeave(): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerClick(x: number, y: number) {}
  public handlePointerDown(x: number, y: number) {
    if (!this.target) {
      return
    }
    this._reshaping = true
    this._startX = x
    this._startY = y
    this.editor.beginOperation()
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerUp(x: number, y: number) {
    if (!this.target) {
      return
    }
    this._reshaping = false
    this.editor.finishOperation()
  }
  public handlePointerMove(x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if (this._reshaping && this.target instanceof ShapeEntity) {
      const resizeX = x - this._startX
      const resizeY = y - this._startY

      let shapeType = this.target.shapeType
      let startX = shapeType.controllerStartX * this.target.width
      let startY = shapeType.controllerStartY * this.target.height
      let endX = shapeType.controllerEndX * this.target.width
      let endY = shapeType.controllerEndY * this.target.height
      let controllerX = this.target.shape.controller.x + startX
      let controllerY = this.target.shape.controller.y + startY
      if (shapeType.controlInPercent) {
        controllerX = (endX - startX) * this.target.shape.controller.x + startX
        controllerY = (endY - startY) * this.target.shape.controller.y + startY
      }
      let newControllerX = controllerX + resizeX
      let newControllerY = controllerY + resizeY
      let targetController = this.target.shape.controller
      if (shapeType.controlInLine) {
        let newControllerPoint = MathUtils.getNearestPointOfPointToLine(newControllerX, newControllerY, startX, startY, endX, endY)
        //let newControllerValue = Math.sqrt((newControllerPoint.x - startX) * (newControllerPoint.x - startX) + (newControllerPoint.y - startY) * (newControllerPoint.y - startY))
        let newControllerXValue = newControllerPoint.x - startX //< startX ? startX : (newControllerPoint.x > endX ? endX : newControllerPoint.x)
        let newControllerYValue = newControllerPoint.y - startY //< startY ? startY : (newControllerPoint.y > endY ? endY : newControllerPoint.y)
        //console.log(newControllerPoint)
        if (shapeType.controlInPercent) {
          //newControllerValue = Math.sqrt((newControllerPoint.x - startX) * (newControllerPoint.x - startX) + (newControllerPoint.y - startY) * (newControllerPoint.y - startY)) /
          //Math.sqrt((endX - startX) * (endX - startX) + (endY - startX) * (endY - startX))
          newControllerXValue = Math.abs(endX - startX) > 0 ? (newControllerPoint.x - startX) / (endX - startX) : 0
          newControllerYValue = Math.abs(endY - startY) > 0 ? (newControllerPoint.y - startY) / (endY - startY) : 0
          newControllerXValue = newControllerXValue < 0 ? 0 : newControllerXValue > 1 ? 1 : newControllerXValue
          newControllerYValue = newControllerYValue < 0 ? 0 : newControllerYValue > 1 ? 1 : newControllerYValue
        }
        targetController = new Point2(newControllerXValue, newControllerYValue)
      } else {
        let newControllerXValue = newControllerX // - startX
        let newControllerYValue = newControllerY // - startY
        if (endX > startX) {
          newControllerXValue = newControllerXValue < startX ? startX : newControllerXValue > endX ? endX : newControllerXValue
        } else {
          newControllerXValue = newControllerXValue > startX ? startX : newControllerXValue < endX ? endX : newControllerXValue
        }
        if (endY > startY) {
          newControllerYValue = newControllerYValue < startY ? startY : newControllerYValue > endY ? endY : newControllerYValue
        } else {
          newControllerYValue = newControllerYValue > startY ? startY : newControllerYValue < endY ? endY : newControllerYValue
        }
        if (shapeType.controlInPercent) {
          newControllerXValue = (newControllerXValue - startX) / (endX - startX)
          newControllerYValue = (newControllerYValue - startY) / (endY - startY)
          newControllerXValue = newControllerXValue < 0 ? 0 : newControllerXValue > 1 ? 1 : newControllerXValue
          newControllerYValue = newControllerYValue < 0 ? 0 : newControllerYValue > 1 ? 1 : newControllerYValue
        }
        targetController = new Point2(newControllerXValue, newControllerYValue)
      }
      // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime()
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        this.target.shape.controller = targetController
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      }
    } else {
      this.editor.updateEditorMode(EditorMode.AUTO)
    }
  }
  protected buildAnchor() {
    this.path.reset()
    this.path.moveTo(this.width / 2, 0)
    this.path.lineTo(this.width, this.height / 2)
    this.path.lineTo(this.width / 2, this.height)
    this.path.lineTo(0, this.height / 2)
    this.path.lineTo(this.width / 2, 0)
  }
}
