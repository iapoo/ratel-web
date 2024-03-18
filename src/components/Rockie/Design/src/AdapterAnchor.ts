import { Colors, MathUtils, Paint, Point2 } from '@/components/Engine'
import { Editor, EditorMode } from '../../Editor'
import { Anchor, } from './Anchor'
import { Holder } from './Holder'
import { ShapeEntity, Shapes } from '../../Items'
import { AdapterDirection } from '../../Shapes/src/EntityShape'
import { EditorUtils } from '../../Theme'


export enum AdapterType {
  BEGIN,
  END
}
/**
 * 辅助调节器，如调整提示框的箭头大小等
 */
export class AdapterAnchor extends Anchor {
  private _adaptering = false
  private _startX = 0
  private _startY = 0
  private _adapterType: AdapterType

  public constructor(editor: Editor, holder: Holder, adapterType: AdapterType) {
    super(editor, holder)
    this._adapterType = adapterType
    this.width = 12
    this.height = 12
    this.fill.setColor(EditorUtils.anchorAdapterFillColor)
    this.stroke.setColor(EditorUtils.anchorAdapterStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorAdapterStrokeLineWidth)
    this.buildAnchor()
  }

  public handlePointerEnter(): void {
    
  }

  public handlePointerLeave(): void {
    
  }
  public handlePointerClick(x: number, y: number) {

  }
  public handlePointerDown(x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._adaptering = true;
    this._startX = x;
    this._startY = y;

  }
  public handlePointerUp(x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._adaptering = false;
  }
  public handlePointerMove(x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if (this._adaptering && this.target instanceof ShapeEntity) {
      const resizeX = x - this._startX
      const resizeY = y - this._startY

      let shapeType = this.target.shapeType
      let startX = shapeType.adapterStartX * this.target.width
      let startY = shapeType.adapterStartY * this.target.height
      let endX = shapeType.adapterEndX * this.target.width
      let endY = shapeType.adapterEndY * this.target.height
      let targetAdapter = this.target.shape.adapter
      let targetAdapterSize = this.target.shape.adapterSize
      if (this._adapterType == AdapterType.BEGIN) {
        if (shapeType.adapterDirection == Shapes.ADAPTER_DIRECTION_X) {
          let endXForBegin = startX + this.target.shape.adapter.x + this.target.shape.adapterSize
          let endYForBegin = endY
          let adapterX = this.target.shape.adapter.x + startX
          let adapterY = this.target.shape.adapter.y + startY
          let adapterSize = this.target.shape.adapterSize
          let adapterDefaultSize = this.target.shape.typeInfo.adapterSize
          if (shapeType.adaptInPercent) {
            endXForBegin = startX + (endX - startX) * this.target.shape.adapter.x + (endX - startX) * this.target.shape.adapterSize
            if (endXForBegin > endX) {
              endXForBegin = endX
            }
            endYForBegin = endY
            adapterX = (endX - startX) * this.target.shape.adapter.x + startX
            adapterY = (endY - startY) * this.target.shape.adapter.y + startY
            adapterSize = this.target.shape.adapterSize * (endX - startX)
            adapterDefaultSize = this.target.shape.typeInfo.adapterSize * (endX - startX)
          }
          let newAdapterX = adapterX + resizeX
          let newAdapterY = adapterY + resizeY
          let newAdapterXValue = 0
          let newAdapterYValue = 0
          if (shapeType.adaptInLine) {
            let newAdapterPoint = MathUtils.getNearestPointOfPointToLine(newAdapterX, newAdapterY, startX, startY, endX, endY)
            newAdapterXValue = newAdapterPoint.x < startX ? startX : (newAdapterPoint.x > endX ? endX : newAdapterPoint.x)
            newAdapterYValue = newAdapterPoint.y < startY ? startY : (newAdapterPoint.y > endY ? endY : newAdapterPoint.y)
            //console.log(newAdapterPoint)
            if (shapeType.adaptInPercent) {
              newAdapterXValue = (endX - startX) > 0 ? (newAdapterX - startX) / (endX - startX) : 0
              newAdapterYValue = (endY - startY) > 0 ? (newAdapterY - startY) / (endY - startY) : 0
              newAdapterXValue = newAdapterXValue < 0 ? 0 : (newAdapterXValue > 1 ? 1 : newAdapterXValue)
              newAdapterYValue = newAdapterYValue < 0 ? 0 : (newAdapterYValue > 1 ? 1 : newAdapterYValue)
            }
            targetAdapter = new Point2(newAdapterXValue, newAdapterYValue)
          } else { // adaptInLine is false
            newAdapterXValue = newAdapterX - startX
            //console.log(`newAdapterXValue= ${newAdapterXValue} newAdapterX= ${newAdapterX} startX= ${startX}`)
            newAdapterYValue = newAdapterY - startY
            newAdapterXValue = newAdapterXValue < startX ? startX : (newAdapterXValue > endXForBegin ? endXForBegin : newAdapterXValue)
            newAdapterYValue = newAdapterYValue < startY ? startY : (newAdapterYValue > endYForBegin ? endYForBegin : newAdapterYValue)
            if (startX + newAdapterXValue + adapterSize > endX) {
              adapterSize = endX - startX - newAdapterXValue
            }
            //restore adapter size if it is too small 
            if(newAdapterXValue < adapterX && adapterSize < adapterDefaultSize) {
              if(adapterSize + newAdapterXValue - adapterX > adapterDefaultSize) {
                adapterSize = adapterDefaultSize
              } else {
                adapterSize = adapterSize + adapterX - newAdapterXValue
              }
            }
            //console.log(`adapterSize= ${adapterSize} newAdapterXValue= ${newAdapterXValue} adapterX= ${adapterX}`)

            if (shapeType.adaptInPercent) {
              newAdapterXValue = (newAdapterX - startX) / (endX - startX)
              newAdapterYValue = (newAdapterY - startY) / (endY - startY)
              newAdapterXValue = newAdapterXValue < 0 ? 0 : (newAdapterXValue > endXForBegin / endX ? endXForBegin / endX : newAdapterXValue)
              newAdapterYValue = newAdapterYValue < 0 ? 0 : (newAdapterYValue > endYForBegin / endY ? endYForBegin / endY : newAdapterYValue)
              adapterSize = adapterSize / (endX - startX)
            }
            targetAdapter = new Point2(newAdapterXValue, newAdapterYValue)
            targetAdapterSize = adapterSize
          }
        } else if (shapeType.adapterDirection == Shapes.ADAPTER_DIRECTION_Y) {
          let endXForBegin = startX + this.target.shape.adapter.x + this.target.shape.adapterSize
          let endYForBegin = endY
          let adapterX = this.target.shape.adapter.x + startX
          let adapterY = this.target.shape.adapter.y + startY
          if (shapeType.adaptInPercent) {
            adapterX = (endX - startX) * this.target.shape.adapter.x + startX
            adapterY = (endY - startY) * this.target.shape.adapter.y + startY
          }
          let newAdapterX = adapterX + resizeX
          let newAdapterY = adapterY + resizeY
          if (shapeType.adaptInLine) {
            let newAdapterPoint = MathUtils.getNearestPointOfPointToLine(newAdapterX, newAdapterY, startX, startY, endX, endY)
            let newAdapterXValue = newAdapterPoint.x < startX ? startX : (newAdapterPoint.x > endX ? endX : newAdapterPoint.x)
            let newAdapterYValue = newAdapterPoint.y < startY ? startY : (newAdapterPoint.y > endY ? endY : newAdapterPoint.y)
            //console.log(newAdapterPoint)
            if (shapeType.adaptInPercent) {
              newAdapterXValue = (endX - startX) > 0 ? (newAdapterX - startX) / (endX - startX) : 0
              newAdapterYValue = (endY - startY) > 0 ? (newAdapterY - startY) / (endY - startY) : 0
              newAdapterXValue = newAdapterXValue < 0 ? 0 : (newAdapterXValue > 1 ? 1 : newAdapterXValue)
              newAdapterYValue = newAdapterYValue < 0 ? 0 : (newAdapterYValue > 1 ? 1 : newAdapterYValue)
            }
            targetAdapter = new Point2(newAdapterXValue, newAdapterYValue)
          } else { // adaptInPercent
            let newAdapterXValue = newAdapterX - startX
            let newAdapterYValue = newAdapterY - startY
            newAdapterXValue = newAdapterXValue < startX ? startX : (newAdapterXValue > endXForBegin ? endXForBegin : newAdapterXValue)
            newAdapterYValue = newAdapterYValue < startY ? startY : (newAdapterYValue > endYForBegin ? endYForBegin : newAdapterYValue)
            if (shapeType.adaptInPercent) {
              newAdapterXValue = (newAdapterX - startX) / (endX - startX)
              newAdapterYValue = (newAdapterY - startY) / (endY - startY)
              newAdapterXValue = newAdapterXValue < 0 ? 0 : (newAdapterXValue > endXForBegin / endX ? endXForBegin / endX : newAdapterXValue)
              newAdapterYValue = newAdapterYValue < 0 ? 0 : (newAdapterYValue > endYForBegin / endY ? endYForBegin / endY : newAdapterYValue)
            }
            targetAdapter = new Point2(newAdapterXValue, newAdapterYValue)
          }
        }
      } else {  //TODO: Adapter is END
        if (shapeType.adapterDirection == Shapes.ADAPTER_DIRECTION_X) {
          let startXForEnd = startX + this.target.shape.adapter.x
          let endXForEnd = endX
          let adapterSize = this.target.shape.adapterSize
          if (shapeType.adaptInPercent) {
            startXForEnd = startX + this.target.shape.adapter.x * (endX - startX)
            endXForEnd = endX
            adapterSize = (endX - startX) * this.target.shape.adapterSize
          }
          let newAdapterSize = adapterSize + resizeX
          if (shapeType.adaptInLine) {
            let newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endXForEnd - startXForEnd ? endXForEnd - startXForEnd : newAdapterSize)
            if (shapeType.adaptInPercent) {
              newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endXForEnd - startXForEnd ? (endXForEnd - startXForEnd) / (endX - startX) : newAdapterSize / (endX - startX))
            }
            targetAdapterSize = newAdapterSizeValue
          } else { // adaptInLine is false
            let newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endXForEnd - startXForEnd ? endXForEnd - startXForEnd : newAdapterSize)
            if (shapeType.adaptInPercent) {
              newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endXForEnd - startXForEnd ? (endXForEnd - startXForEnd) / (endX - startX) : newAdapterSize / (endX - startX))
            }
            targetAdapterSize = newAdapterSizeValue
          }
        } else if (shapeType.adapterDirection == Shapes.ADAPTER_DIRECTION_Y) {
          let startYForEnd = startY + this.target.shape.adapter.y
          let endYForEnd = endY
          let adapterSize = this.target.shape.adapterSize
          if (shapeType.adaptInPercent) {
            startYForEnd = startY + this.target.shape.adapter.y * (endY - startY)
            endYForEnd = endY
            adapterSize = (endY - startY) * this.target.shape.adapterSize
          }
          let newAdapterSize = adapterSize + resizeY
          if (shapeType.adaptInLine) {
            let newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endYForEnd - startYForEnd ? endYForEnd - startYForEnd : newAdapterSize)
            if (shapeType.adaptInPercent) {
              newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endYForEnd - startYForEnd ? (endYForEnd - startYForEnd) / (endY - startY) : newAdapterSize / (endY - startY))
            }
            targetAdapterSize = newAdapterSizeValue
          } else { // adaptInLine is false
            let newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endYForEnd - startYForEnd ? endYForEnd - startYForEnd : newAdapterSize)
            if (shapeType.adaptInPercent) {
              newAdapterSizeValue = newAdapterSize < 0 ? 0 : (newAdapterSize > endYForEnd - startYForEnd ? (endYForEnd - startYForEnd) / (endY - startY) : newAdapterSize / (endY - startY))
            }
            targetAdapterSize = newAdapterSizeValue
          }
        }
      }
      // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime()
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        this.target.shape.adapter = targetAdapter
        this.target.shape.adapterSize = targetAdapterSize
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
      }
    } else {
      this.updateEditorCursor()
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

  private updateEditorCursor() {
    this.editor.updateEditorMode(EditorMode.AUTO)
  }
}
