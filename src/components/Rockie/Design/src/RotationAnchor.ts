import { GraphicsUtils, Point2, Rectangle, Rotation } from '@/components/Engine';
import { Anchor } from './Anchor';
import { Holder } from './Holder';
import { EditorMode } from '../../Editor';

/**
 * 旋转
 */
export class RotationAnchor extends Anchor {
  private _inRaotating = false;
  private _startX = 0;
  private _startY = 0;
  private _centerX = 0;
  private _centerY = 0;

  public handlePointerClick(x: number, y: number) {}

  public handlePointerDown(x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._inRaotating = true;
    this._startX = this.target.width / 2 - Holder.ANCHOR_RADIUS + x;
    this._startY = -Holder.ANCHOR_RADIUS + y;
    this._centerX = this.target.width / 2;
    this._centerY = this.target.height / 2;
    console.log(`'anchor Pointer down' x=${x} y =${y}`);
  }

  public handlePointerUp(x: number, y: number) {
    if (!this.target) {
      return;
    }
    this._inRaotating = false;
    this.holder.rotation = this.target.rotation;
    this.holder.layoutAnchors();
  }

  public handlePointerMove(x: number, y: number) {
    if (!this.target) {
      return;
    }
    if (this._inRaotating) {
      // 计算旋转角度
      const target = new Point2(this._centerX, this._centerY);
      const start = new Point2(this._startX, this._startY);
      const end = new Point2(
        this.target.width / 2 - Holder.ANCHOR_RADIUS + x,
        -Holder.ANCHOR_RADIUS + y,
      );
      let angle = GraphicsUtils.getTriangleAngleEx(target, end, start);
      console.log(
        `rotation anchor moving x=${x} y =${y}   endX=${end.x} endY =${end.y} startx=${this._startX} startY=${this._startY} centerX=${this._centerX} centerY=${this._centerY} and angle=${angle}`,
      );

      angle = Math.round(angle / 5) * 5;

      // TODO: 鼠标移动会导致Anchor重定位，结果导致鼠标位置突变而引起图形突变。这里延缓变化频率以修复问题
      const nowTime = new Date().getTime();
      if (nowTime - this.lastMovingTime > Anchor.MIN_MOVING_INTERVAL) {
        // this.holder.rotate = new Rotation(this.target.width / 2, this.target.height / 2, angle)
        this.target.rotation = new Rotation(
          (angle * Math.PI) / 180,
           this.target.width / 2,
          this.target.height / 2,
        );
        
        // this.holder.rotate = new Rotation(this.target.left + this.target.width / 2, this.target.top + this.target.height / 2, angle * Math.PI / 180)
        // this.holder.layoutAnchors()
        this.lastMovingTime = nowTime;
      }
    } else {
      this.editor.updateEditorMode(EditorMode.POINTER)
    }
  }
  protected buildAnchor() {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
