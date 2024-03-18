import { Rectangle } from '@/components/Engine'
import { Anchor, } from './Anchor'
import { Editor } from '../../Editor'
import { Holder } from './Holder'
import { EditorUtils } from '../../Theme'

/**
 * 创建新图形
 */
export class CreationAnchor extends Anchor {
  public constructor (editor: Editor, holder: Holder) {
    super(editor, holder)
    this.fill.setColor(EditorUtils.anchorCreationFillColor)
    this.stroke.setColor(EditorUtils.anchorCreationStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorCreationStrokeLineWidth)
  }
  public handlePointerClick (x: number, y: number) {

  }
  public handlePointerDown (x: number, y: number) {

  }
  public handlePointerUp (x: number, y: number) {
  }
  public handlePointerMove (x: number, y: number) {

  }
  protected buildAnchor () {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
