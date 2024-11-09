import { Rectangle } from '@ratel-web/engine'
import { Editor } from '../../Editor'
import { EditorUtils } from '../../Theme'
import { Anchor } from './Anchor'
import { Holder } from './Holder'

/**
 * 创建新图形
 */
export class CreationAnchor extends Anchor {
  private static DEFAULT_ALPHA = 0.2
  private static HIGHTLIGHT_ALPHA = 1
  public constructor(editor: Editor, holder: Holder) {
    super(editor, holder)
    this.fill.setColor(EditorUtils.anchorCreationFillColor)
    this.stroke.setColor(EditorUtils.anchorCreationStrokeColor)
    this.stroke.setStrokeWidth(EditorUtils.anchorCreationStrokeLineWidth)
    this.fill.setAlpha(CreationAnchor.DEFAULT_ALPHA)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerClick(x: number, y: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerDown(x: number, y: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerUp(x: number, y: number) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handlePointerMove(x: number, y: number) {}

  public handlePointerEnter(): void {
    this.fill.setAlpha(CreationAnchor.HIGHTLIGHT_ALPHA)
  }

  public handlePointerLeave(): void {
    this.fill.setAlpha(CreationAnchor.DEFAULT_ALPHA)
  }

  protected buildAnchor() {
    this.path.reset()
    this.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
  }
}
