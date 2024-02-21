import { Colors, Paint, Point2, Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Connector } from '../../Items'
import { Editor, EditorMode } from '../../Editor'
import { Holder } from './Holder'
import { ConnectorShape } from '../../Shapes'
import { OrthogonalHelper } from './OrthogonalHelper'
import { SystemUtils } from '@/components/Workspace/Utils'
import { SelectionLayer } from '../../Editor/src/SelectionLayer'

/**
 * 创建连接线
 */
export class OrthogonalMovementAnchor extends Anchor {
  private _moving = false
  private _startX = 0
  private _startY = 0
  private _index = 0
  private _orthogonalPoints: Point2[] = []

  public constructor(editor: Editor, holder: Holder, index: number) {
    super(editor, holder)
    this.width = 12
    this.height = 12
    this._index = index
    this.fill = Paint.makeColorPaint(Colors.Green)
    this.buildAnchor()
  }

  public get index() {
    return this._index
  }

  public get orthogonalPoints() {
    return this._orthogonalPoints
  }

  public handlePointerClick (x: number, y: number) {

  }
  public handlePointerDown (x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._moving = true
    this._startX = x;
    this._startY = y;
    //this.makeReady()
    if(this.target instanceof Connector) {
      this._orthogonalPoints.length = 0
      this._orthogonalPoints = this._orthogonalPoints.concat(this.target.orthogonalPoints)
      //if(this._orthogonalPoints.length == 0) {
      //  console.log(`Exception is here`)
      //}
    }

  }
  
  public handlePointerUp (x: number, y: number) {
    if (!this.target) {
      return;
    }
    const theSelectionLayer = this.editor.selectionLayer as SelectionLayer
    if (!theSelectionLayer.hasEditorItem(this.target)) {
      theSelectionLayer.inHolder = true
      theSelectionLayer.removeAllEditorItems()
      theSelectionLayer.addEditorItem(this.target)
    }
    this.editor.triggerSelectionChange()

    this._moving = false
  }

  public handlePointerMove (x: number, y: number) {
    if (!this.target) {
      console.log(`'anchor Pointer moving bad target' x=${x} y =${y}`)
      return
    }
    if(!this._moving) {
      this.updateEditorCursor()
      return
    }
    //console.log(`x = ${x} y = ${y} startx = ${this._startX} starty = ${this._startY}`)
    //if(!this.ready) {
    //  this._startX = x
    //  this._startY = y
    //  this.makeReady()
    //  return
    //}
    // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
    const nowTime = new Date().getTime()
    if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
      if(this._moving && this.target instanceof Connector) {
        //console.log(`a= ${this._orthogonalPoints}   b= ${this.target.orthogonalPoints}`)
        const moveX = x - this._startX
        const moveY = y - this._startY
        let orthogonalPoints: Point2[] =  [] 
        orthogonalPoints = orthogonalPoints.concat(this._orthogonalPoints)
        const orthogonalPoint = orthogonalPoints[this._index]
        const nextOrthogonalPoint = orthogonalPoints[this._index + 1]
        if(orthogonalPoint.x == nextOrthogonalPoint.x) {
          if(this._index == 1) {
            orthogonalPoints.splice(this._index + 1, 0, new Point2(orthogonalPoint.x + moveX, orthogonalPoint.y))
            orthogonalPoints[this._index + 2] = new Point2(nextOrthogonalPoint.x + moveX, nextOrthogonalPoint.y)
          } else if(this._index == orthogonalPoints.length - 3) {
            orthogonalPoints[this._index] = new Point2(orthogonalPoint.x + moveX, orthogonalPoint.y)
            orthogonalPoints.splice(this._index + 1, 0, new Point2(nextOrthogonalPoint.x + moveX, nextOrthogonalPoint.y))
          } else {
            orthogonalPoints[this._index] = new Point2(orthogonalPoint.x + moveX, orthogonalPoint.y)
            orthogonalPoints[this._index + 1] = new Point2(nextOrthogonalPoint.x + moveX, nextOrthogonalPoint.y)
          }
          OrthogonalHelper.cleanOrthogonalPoints(orthogonalPoints)
          this.target.orthogonalPoints = orthogonalPoints
          // console.log(`Debug points`)
          // SystemUtils.debugPoints(orthogonalPoints)
          // SystemUtils.debugPoints(this._orthogonalPoints)
          //console.log(`count= ${this.holder.count} x = ${x} moveX = ${moveX} startX = ${this._startX} width=${this.target.width} `)
        } else {
          if(this._index == 1) {
            orthogonalPoints.splice(this._index + 1, 0, new Point2(orthogonalPoint.x, orthogonalPoint.y + moveY))
            orthogonalPoints[this._index + 2] = new Point2(nextOrthogonalPoint.x, nextOrthogonalPoint.y + moveY)
          } else if(this._index == orthogonalPoints.length - 3) {
            orthogonalPoints[this._index] = new Point2(orthogonalPoint.x, orthogonalPoint.y + moveY)
            orthogonalPoints.splice(this._index + 1, 0, new Point2(nextOrthogonalPoint.x, nextOrthogonalPoint.y + moveY))
          } else {
            orthogonalPoints[this._index] = new Point2(orthogonalPoint.x, orthogonalPoint.y + moveY)
            orthogonalPoints[this._index + 1] = new Point2(nextOrthogonalPoint.x, nextOrthogonalPoint.y + moveY)
          }
          OrthogonalHelper.cleanOrthogonalPoints(orthogonalPoints)
          this.target.orthogonalPoints = orthogonalPoints
          // console.log(`Debug points`)
          // SystemUtils.debugPoints(orthogonalPoints)
          // SystemUtils.debugPoints(this._orthogonalPoints)
          //console.log(`count= ${this.holder.count} x = ${x} moveX = ${moveX} startX = ${this._startX} width=${this.target.width} `)
        }    
        //this._startX = x
        //this._startY = y
        this.holder.refreshOrthogonalAnchors()
        this.holder.layoutAnchors()
        this.lastMovingTime = nowTime
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
  //       orthogonals.splice(index * 2, 2)
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



  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }


  private updateEditorCursor() {
    if(this.target instanceof Connector) {
      const orthogonalPoints = this.target.orthogonalPoints
      const orthogonalPoint = orthogonalPoints[this._index]
      const nextOrthogonalPoint = orthogonalPoints[this._index + 1]
      if(orthogonalPoint.x == nextOrthogonalPoint.x) {
        if(this._index == 1) {
          this.editor.updateEditorMode(EditorMode.W_RESIZE)
        } else if(this._index == orthogonalPoints.length - 3) {
          this.editor.updateEditorMode(EditorMode.W_RESIZE)
        } else {
          this.editor.updateEditorMode(EditorMode.W_RESIZE)
        }
      } else {
        if(this._index == 1) {
          this.editor.updateEditorMode(EditorMode.N_RESIZE)
        } else if(this._index == orthogonalPoints.length - 3) {
          this.editor.updateEditorMode(EditorMode.N_RESIZE)
        } else {
          this.editor.updateEditorMode(EditorMode.N_RESIZE)
        }
      }   
    } else {
      this.editor.updateEditorMode(EditorMode.AUTO)
    }
  }
}
