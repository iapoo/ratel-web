/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
import { Point2, Rectangle, Rotation, } from '@/components/Engine'
import { Editor, EditorMode, } from '../../Editor/src/Editor'
import { SelectionLayer, } from '../../Editor/src/SelectionLayer'
import { Anchor, } from './Anchor'
import { Holder, } from './Holder'
import { EntityShapeFreezeType } from '../../Shapes/src/EntityShape'
import { EditorItem, TableEntity } from '../../Items'
import { EditorUtils } from '../../Theme'

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
    this.fill.setColor(EditorUtils.anchorResizeFillDefaultColor)
    this.stroke.setColor(EditorUtils.anchorResizeStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorResizeStrokeLineWidth)
  }

  public get resizeType (): ResizeType {
    return this._resizeType
  }
  public handlePointerEnter(): void {
    this.fill.setColor(EditorUtils.anchorResizeFillHighlightColor)
  }

  public handlePointerLeave(): void {
    this.fill.setColor(EditorUtils.anchorResizeFillDefaultColor)
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
    if(this.target) {
      this.editor.beginOperation(this.target)
    }
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
    this.editor.finishOperation(this.target)
  }

  public handlePointerMove (x: number, y: number) {
    // console.log(`'anchor Pointer moving' x=${x} y =${y}`)
    if (!this.target || !this.target.shape || !this.target.shape.typeInfo) {
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
          const resizeX = this.editor.alignToGridSize(x - this._startX)
          switch(this.target.shape.typeInfo.freeze) {
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
          const resizeX = this.editor.alignToGridSize(x - this._startX)
          const resizeY = this.editor.alignToGridSize(y - this._startY)
          switch(this.target.shape.typeInfo.freeze) {
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
          const resizeY = this.editor.alignToGridSize(y - this._startY)
          switch(this.target.shape.typeInfo.freeze) {
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
          const resizeX = this.editor.alignToGridSize(x - this._startX)
          const resizeY = this.editor.alignToGridSize(y - this._startY)
          switch(this.target.shape.typeInfo.freeze) {
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
          const resizeX = this.editor.alignToGridSize(x - this._startX)
          switch(this.target.shape.typeInfo.freeze) {
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
          const resizeX = this.editor.alignToGridSize(x - this._startX)
          const resizeY = this.editor.alignToGridSize(y - this._startY)
          switch(this.target.shape.typeInfo.freeze) {
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
          const resizeY = this.editor.alignToGridSize(y - this._startY)
          switch(this.target.shape.typeInfo.freeze) {
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
          const resizeX = this.editor.alignToGridSize(x - this._startX)
          const resizeY = this.editor.alignToGridSize(y - this._startY)
          switch(this.target.shape.typeInfo.freeze) {
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
        //newLeft = this.editor.alignToGridSize(newLeft)
        //newTop = this.editor.alignToGridSize(newTop)
        //newWidth = this.editor.alignToGridSize(newWidth)
        //newHeight = this.editor.alignToGridSize(newHeight)
        //this.holder.boundary = Rectangle.makeLTWH(newLeft, newTop, newWidth, newHeight)
        this.holder.width = newWidth
        this.holder.height = newHeight
        // Seems following code have internal dependence
        this.target.getAllSourceConnectors().forEach(connector => {
          if (connector.source === this.target && connector.sourceJoint && this.target) {
            const sourceJoint = new Point2(connector.sourceJoint.x * newWidth / this.target.width, connector.sourceJoint.y * newHeight / this.target.height)
            connector.sourceJoint = sourceJoint
          }
        })
        this.target.getAllTargetConnectors().forEach(connector => {
          if (connector.target === this.target && connector.targetJoint && this.target) {
            const targetJoint = new Point2(connector.targetJoint.x * newWidth / this.target.width, connector.targetJoint.y * newHeight / this.target.height)
            // console.log(`new target point is x = ${targetJoint.x}, y = ${targetJoint.y}, newWidth = ${newWidth}, width = ${this.target.width}, newHeight = ${newHeight}, height = ${this.target.height}`)
            connector.targetJoint = targetJoint
            //console.log(`connectr checking source joint x =  ${connector.sourceJoint?.x} , y =  x =  ${connector.sourceJoint?.y}`)
          }
        })
        this.updateItemBoundary(this.target, newLeft, newTop, newWidth, newHeight)

        //Recalculate rotation because it depends on width and height
        this.target.rotation = new Rotation(this.target.rotation.radius, this.target.width / 2, this.target.height / 2)

        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
        this.editor.triggerSelectionResized()
        // this.editor.hoverLayer.invalidateLayer()
        // this.editor.selectionLayer.invalidateLayer()
      }
    } else {
      this.updateEditorCursor()
    }
  }

  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }

  private updateItemBoundary(item: EditorItem, newLeft: number, newTop: number, newWidth: number, newHeight: number) {
    const oldWidth = item.width
    const oldHeight = item.height
    item.boundary = Rectangle.makeLTWH(newLeft, newTop, newWidth, newHeight)
    const count = item.items.length
    for(let i = 0; i < count; i ++) {
      const child = item.items[i]
      //this.updateItemBoundary(child, )
    }
    if(item instanceof TableEntity) {
      item.recalculateTableBoundary(oldWidth, oldHeight)
    }
  }

  private updateEditorCursor() {
    switch (this._resizeType) {
      case ResizeType.Left: {
        this.editor.updateEditorMode(EditorMode.W_RESIZE)
        break
      }
      case ResizeType.LeftTop: {
        this.editor.updateEditorMode(EditorMode.NW_RESIZE)
        break
      }
      case ResizeType.Top: {
        this.editor.updateEditorMode(EditorMode.N_RESIZE)
        break
      }
      case ResizeType.RightTop: {
        this.editor.updateEditorMode(EditorMode.NE_RESIZE)
        break
      }
      case ResizeType.Right: {
        this.editor.updateEditorMode(EditorMode.E_RESIZE)
        break
      }
      case ResizeType.RightBottom: {
        this.editor.updateEditorMode(EditorMode.SE_RESIZE)
        break
      }
      case ResizeType.Bottom: {
        this.editor.updateEditorMode(EditorMode.S_RESIZE)
        break
      }
      case ResizeType.LeftBottom:
      default: {
        this.editor.updateEditorMode(EditorMode.SW_RESIZE)
        break
      }
    }   
  }
}
