/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
import { Point2, Rectangle, Rotation, } from '@/components/Engine'
import { Editor, } from '../../Editor/src/Editor'
import { SelectionLayer, } from '../../Editor/src/SelectionLayer'
import { Anchor, } from './Anchor'
import { Holder, } from './Holder'
import { EntityShapeFreezeType } from '../../Shapes/src/EntityShape'

export enum ResizeType {
  Left,
  LeftTop,
  Top,
  RightTop,
  Right,
  RightBottom,
  Bottom,
  LeftBottom,
}

/**
 * 调整大小
 */
export class ResizeAnchor extends Anchor {
  private _resizeType: ResizeType;
  private _inResizing = false;
  private _startX = 0;
  private _startY = 0;

  public constructor (editor: Editor, holder: Holder, resizeType: ResizeType) {
    super(editor, holder)
    this._resizeType = resizeType
    // this.fontName = 'vapo'
    // this.text = 'C'
  }

  public get resizeType (): ResizeType {
    return this._resizeType
  }

  public handlePointerClick (x: number, y: number) {
    // console.log(`'anchor Pointer click'`)
  }

  public handlePointerDown (x: number, y: number) {
    this._inResizing = true
    this._startX = x
    this._startY = y
    // console.log(`'anchor Pointer down' x=${x} y =${y}`)
    // this.editor.selectionLayer.removeAllEditorItems()
    // this.editor.controllerLayer.removeAllEditorItems()
    // this.editor.hoverLayer.removeAllEditorItems()
  }

  public handlePointerUp (x: number, y: number) {
    this._inResizing = false
    // console.log(`'anchor Pointer up' x=${x} y =${y}`)
    const theSelectionLayer = this.editor.selectionLayer as SelectionLayer
    if (!this.target) {
      console.log(`'anchor Pointer up bad target' x=${x} y =${y}`)
      return
    }
    if (!theSelectionLayer.hasEditorItem(this.target)) {
      theSelectionLayer.inHolder = true
      theSelectionLayer.removeAllEditorItems()
      theSelectionLayer.addEditorItem(this.target)
    }
  }

  public handlePointerMove (x: number, y: number) {
    // console.log(`'anchor Pointer moving' x=${x} y =${y}`)
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if (this._inResizing) {
      let newLeft = this.target.left
      let newTop = this.target.top
      let newWidth = this.target.width
      let newHeight = this.target.height

      switch (this._resizeType) {
        case ResizeType.Left: {
          const resizeX = x - this._startX
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              break
            case EntityShapeFreezeType.Height:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              break
            case EntityShapeFreezeType.WidthHeight:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              break
            case EntityShapeFreezeType.AspectRatio:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height * newWidth / this.target.width
              break
            case EntityShapeFreezeType.None:
            default:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              break
          }
          break
        }
        case ResizeType.LeftTop: {
          const resizeX = x - this._startX
          const resizeY = y - this._startY
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newLeft = this.target.left + resizeX
              newTop = this.target.top + resizeY
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.Height:
              newLeft = this.target.left + resizeX
              newTop = this.target.top + resizeY
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.WidthHeight:
              newLeft = this.target.left + resizeX
              newTop = this.target.top + resizeY
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.AspectRatio:
              newLeft = this.target.left + resizeX
              newTop = this.target.top + resizeY
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              //newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              newHeight = this.target.height * newWidth / this.target.width
              break;
            case EntityShapeFreezeType.None:
            default:
              newLeft = this.target.left + resizeX
              newTop = this.target.top + resizeY
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
          }
          break
        }
        case ResizeType.Top: {
          const resizeY = y - this._startY
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newTop = this.target.top + resizeY
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.Height:
              newTop = this.target.top + resizeY
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.WidthHeight:
              newTop = this.target.top + resizeY
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.AspectRatio:
              newTop = this.target.top + resizeY
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              newWidth = this.target.width * newHeight / this.target.height
              break
            case EntityShapeFreezeType.None:
            default:
              newTop = this.target.top + resizeY
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
          }
          break
        }
        case ResizeType.RightTop: {
          const resizeX = x - this._startX
          const resizeY = y - this._startY
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newTop = this.target.top + resizeY
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.Height:
              newTop = this.target.top + resizeY
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.WidthHeight:
              newTop = this.target.top + resizeY
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.AspectRatio:
              newTop = this.target.top + resizeY
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              //newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              newHeight = this.target.height * newWidth / this.target.width
              break;
            case EntityShapeFreezeType.None:
            default:
              newTop = this.target.top + resizeY
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
              break
          }
          break
        }
        case ResizeType.Right: {
          const resizeX = x - this._startX
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              break
            case EntityShapeFreezeType.Height:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              break
            case EntityShapeFreezeType.WidthHeight:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              break
            case EntityShapeFreezeType.AspectRatio:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height * newWidth / this.target.width
              break
            case EntityShapeFreezeType.None:
            default:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              break
          }
          break
        }
        case ResizeType.RightBottom: {
          const resizeX = x - this._startX
          const resizeY = y - this._startY
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.Height:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.WidthHeight:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.AspectRatio:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              //newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              newHeight = this.target.height * newWidth / this.target.width
              break
            case EntityShapeFreezeType.None:
              default:
              newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
          }
          break
        }
        case ResizeType.Bottom: {
          const resizeY = y - this._startY
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.Height:
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.WidthHeight:
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.AspectRatio:
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              newWidth = this.target.width * newHeight / this.target.height
              break
            case EntityShapeFreezeType.None:
            default:
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
          }
          break
        }
        case ResizeType.LeftBottom:
        default: {
          const resizeX = x - this._startX
          const resizeY = y - this._startY
          switch(this.target.shape.freezeType) {
            case EntityShapeFreezeType.Width:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.Height:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.WidthHeight:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
            case EntityShapeFreezeType.AspectRatio:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              //newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              newHeight = this.target.height * newWidth / this.target.width
              break
            case EntityShapeFreezeType.None:
            default:
              newLeft = this.target.left + resizeX
              newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
              newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
              break
          }
          break
        }
      }
      // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime()
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        this.holder.boundary = Rectangle.makeLTWH(newLeft, newTop, newWidth, newHeight)
        // Seems following code have internal dependence
        this.target.getAllConnectors().forEach(connector => {
          if (connector.source === this.target && connector.sourceJoint && this.target) {
            const sourceJoint = new Point2(connector.sourceJoint.x * newWidth / this.target.width, connector.sourceJoint.y * newHeight / this.target.height)
            connector.sourceJoint = sourceJoint
          }
        })
        this.target.getAllConnectors().forEach(connector => {
          if (connector.target === this.target && connector.targetJoint && this.target) {
            const targetJoint = new Point2(connector.targetJoint.x * newWidth / this.target.width, connector.targetJoint.y * newHeight / this.target.height)
            // console.log(`new target point is x = ${targetJoint.x}, y = ${targetJoint.y}, newWidth = ${newWidth}, width = ${this.target.width}, newHeight = ${newHeight}, height = ${this.target.height}`)
            connector.targetJoint = targetJoint
          }
        })
        this.target.boundary = Rectangle.makeLTWH(newLeft, newTop, newWidth, newHeight)

        //Recalculate rotation because it depends on width and height
        this.target.rotation = new Rotation(this.target.rotation.radius, this.target.width / 2, this.target.height / 2)

        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
        // this.editor.hoverLayer.invalidateLayer()
        // this.editor.selectionLayer.invalidateLayer()
      }
    }
  }

  protected buildAnchor () {}
}
