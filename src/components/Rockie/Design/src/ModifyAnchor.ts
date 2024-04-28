import { Colors, MathUtils, Paint, Point2 } from '@/components/Engine'
import { Editor, EditorMode } from '../../Editor'
import { Anchor, } from './Anchor'
import { Holder } from './Holder'
import { ShapeEntity } from '../../Items'
import { EditorUtils } from '../../Theme'

/**
 * 变形，如调整梯形的梯形大小等
 */
export class ModifyAnchor extends Anchor {
  private _reshaping = false
  private _startX = 0
  private _startY = 0

  public constructor (editor: Editor, holder: Holder) {
    super(editor, holder)
    this.width = 10
    this.height = 10
    this.fill.setColor(EditorUtils.anchorModifyFillColor)
    this.stroke.setColor(EditorUtils.anchorModifyStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorModifyStrokeLineWidth)
    this.buildAnchor()
  }

  public handlePointerEnter(): void {
    
  }

  public handlePointerLeave(): void {
    
  }
  public handlePointerClick (x: number, y: number) {

  }
  public handlePointerDown (x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._reshaping = true;
    this._startX = x;
    this._startY = y;

  }
  public handlePointerUp (x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._reshaping = false;
  }
  public handlePointerMove (x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if(this._reshaping && this.target instanceof ShapeEntity) {
      const resizeX = x - this._startX
      const resizeY = y - this._startY

      let shapeType = this.target.shapeType
      let startX = shapeType.modifierStartX * this.target.width
      let startY = shapeType.modifierStartY * this.target.height
      let endX = shapeType.modifierEndX * this.target.width
      let endY = shapeType.modifierEndY * this.target.height
      let modifierX = this.target.shape.modifier.x +  startX
      let modifierY = this.target.shape.modifier.y + startY
      if(shapeType.modifyInPercent) {
        modifierX = (endX - startX) * this.target.shape.modifier.x +  startX
        modifierY = (endY - startY) * this.target.shape.modifier.y + startY
      }
      let newModifierX = modifierX + resizeX
      let newModifierY = modifierY + resizeY
      let targetModifier = this.target.shape.modifier
      if(shapeType.modifyInLine) {
        let newModifierPoint = MathUtils.getNearestPointOfPointToLine(newModifierX, newModifierY, startX, startY, endX, endY)
        //let newModifierValue = Math.sqrt((newModifierPoint.x - startX) * (newModifierPoint.x - startX) + (newModifierPoint.y - startY) * (newModifierPoint.y - startY))
        let newModifierXValue = newModifierPoint.x - startX //< startX ? startX : (newModifierPoint.x > endX ? endX : newModifierPoint.x)
        let newModifierYValue = newModifierPoint.y - startY //< startY ? startY : (newModifierPoint.y > endY ? endY : newModifierPoint.y)
        //console.log(newModifierPoint)
        if(shapeType.modifyInPercent) {
          //newModifierValue = Math.sqrt((newModifierPoint.x - startX) * (newModifierPoint.x - startX) + (newModifierPoint.y - startY) * (newModifierPoint.y - startY)) /
          //Math.sqrt((endX - startX) * (endX - startX) + (endY - startX) * (endY - startX))
          newModifierXValue = Math.abs(endX - startX) > 0 ? (newModifierPoint.x - startX) / (endX - startX) : 0
          newModifierYValue = Math.abs(endY - startY) > 0 ? (newModifierPoint.y - startY) / (endY - startY) : 0
          newModifierXValue = newModifierXValue < 0 ? 0 : (newModifierXValue > 1 ? 1 : newModifierXValue)
          newModifierYValue = newModifierYValue < 0 ? 0 : (newModifierYValue > 1 ? 1 : newModifierYValue)
        }  
        targetModifier = new Point2(newModifierXValue, newModifierYValue)
      } else {
        let newModifierXValue = newModifierX //- startX
        let newModifierYValue = newModifierY //- startY
        if(endX > startX) {
          newModifierXValue = newModifierXValue < startX ? startX : (newModifierXValue > endX ? endX : newModifierXValue)
        } else {
          newModifierXValue = newModifierXValue > startX ? startX : (newModifierXValue < endX ? endX : newModifierXValue)
        }
        if(endY > startY) {
          newModifierYValue = newModifierYValue < startY ? startY : (newModifierYValue > endY ? endY : newModifierYValue)
        } else {
          newModifierYValue = newModifierYValue > startY ? startY : (newModifierYValue < endY ? endY : newModifierYValue)
        }
        if(shapeType.modifyInPercent) {
          newModifierXValue = (newModifierXValue - startX) / (endX - startX)
          newModifierYValue = (newModifierYValue - startY) / (endY - startY)
          newModifierXValue = newModifierXValue < 0 ? 0 : (newModifierXValue > 1 ? 1 : newModifierXValue)
          newModifierYValue = newModifierYValue < 0 ? 0 : (newModifierYValue > 1 ? 1 : newModifierYValue)
        }  
        targetModifier = new Point2(newModifierXValue, newModifierYValue)
      }
        // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime()
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        this.target.shape.modifier = targetModifier
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      }
    } else {
      this.editor.updateEditorMode(EditorMode.AUTO)
    }
  }
  protected buildAnchor () {
    this.path.reset()
    this.path.moveTo(this.width / 2, 0)
    this.path.lineTo(this.width, this.height / 2)
    this.path.lineTo(this.width / 2, this.height)
    this.path.lineTo(0, this.height / 2)
    this.path.lineTo(this.width / 2, 0)
  }
}
