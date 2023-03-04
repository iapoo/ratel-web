/* eslint-disable complexity */
import { Point2, Rectangle, } from '@/components/Engine'
import { Editor, } from '../../Editor'
import { SelectionLayer, } from '../../Editor/src/SelectionLayer'
import { LineEntity, LineType, } from '../../Items'
import { Anchor, } from './Anchor'
import { Holder, } from './Holder'

/**
 * 创建如直线等
 */
export class PointAnchor extends Anchor {
  private _inMoving = false;
  private _startX = 0;
  private _startY = 0;
  private _isStart;

  public constructor (editor: Editor, holder: Holder, isStart: boolean) {
    super(editor, holder)
    this._isStart = isStart
  }
  public handlePointerClick (x: number, y: number) {

  }

  public handlePointerDown (x: number, y: number) {
    this._inMoving = true
    this._startX = x
    this._startY = y
    // console.log(`'anchor Pointer down' x=${x} y =${y}`)
  }

  public handlePointerUp (x: number, y: number) {
    this._inMoving = false
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
    if (this._inMoving) {
      const lineEntity = this.target as LineEntity
      const start = lineEntity.start
      const end = lineEntity.end
      const resizeX = x - this._startX
      const resizeY = y - this._startY
      // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime()
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        // console.log(`'anchor Pointer moving' x=${x} y =${y} resizex= ${resizeX} resizeY = ${resizeY} startx=${start.x} startY = ${start.y}`)
        if (this._isStart) {
          lineEntity.start = new Point2(start.x + resizeX, start.y + resizeY)
        } else {
          lineEntity.end = new Point2(end.x + resizeX, end.y + resizeY)
        }
        this._startX = x
        this._startY = y
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
        this.editor.hoverLayer.invalidateLayer()
        this.editor.selectionLayer.invalidateLayer()
      }
    }
  }

  public handlePointerMove2 (x: number, y: number) {
    // console.log(`'anchor Pointer moving' x=${x} y =${y}`)
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if (this._inMoving) {
      let newLeft = this.target.left
      let newTop = this.target.top
      let newWidth = this.target.width
      let newHeight = this.target.height
      const lineEntity = this.target as LineEntity
      const resizeX = x - this._startX
      const resizeY = y - this._startY

      if (this._isStart) {
        switch (lineEntity.lineType) {
        case LineType.LEFT_TOP:
          newLeft = this.target.left + resizeX
          newTop = this.target.top + resizeY
          newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
          newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
          break
        case LineType.LEFT_BOTTOM:
          newLeft = this.target.left + resizeX
          newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
          newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
          break
        case LineType.RIGHT_TOP:
          newTop = this.target.top + resizeY
          newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
          newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
          break
        case LineType.RIGHT_BOTTOM:
          newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
          newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
          break
        }
      } else {
        switch (lineEntity.lineType) {
        case LineType.LEFT_TOP:
          newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
          newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
          break
        case LineType.LEFT_BOTTOM:
          newTop = this.target.top + resizeY
          newWidth = this.target.width + resizeX >= this.target.minWidth ? this.target.width + resizeX : this.target.minWidth
          newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
          break
        case LineType.RIGHT_TOP:
          newLeft = this.target.left + resizeX
          newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
          newHeight = this.target.height + resizeY >= this.target.minHeight ? this.target.height + resizeY : this.target.minHeight
          break
        case LineType.RIGHT_BOTTOM:
          newLeft = this.target.left + resizeX
          newTop = this.target.top + resizeY
          newWidth = this.target.width - resizeX >= this.target.minWidth ? this.target.width - resizeX : this.target.minWidth
          newHeight = this.target.height - resizeY >= this.target.minHeight ? this.target.height - resizeY : this.target.minHeight
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

        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
        // this.editor.hoverLayer.invalidateLayer()
        // this.editor.selectionLayer.invalidateLayer()
      }
    }
  }
  protected buildAnchor () {
  }
}
