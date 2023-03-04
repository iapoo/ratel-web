/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, Font, FontStyle, Graphics, Paint, PaintStyle, Paragraph, ParagraphBuilder, ParagraphStyle, Rectangle, TextAlignment, } from './Graphics'
import { Shape, } from './Shape'

export class TextShape extends Shape {
    private _text: string
    private _fontPaint: Paint
    private _paragraphBuilder: ParagraphBuilder
    private _paragraphStyle: ParagraphStyle
    private _paragraph: Paragraph

    constructor (text = '', left = 0, top = 0, width = 100, height = 100) {
      super(left, top, width, height)
      this._text = text
      this._fontPaint = new Paint()
      this._fontPaint.setColor(Colors.Blue)
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, width, height))
      this._paragraphStyle = new ParagraphStyle()
      this._paragraphBuilder = new ParagraphBuilder(this._paragraphStyle)
      this._paragraphBuilder.addText(this._text)
      this._paragraph = this._paragraphBuilder.build()
      this._paragraph.layout(this.boundary.width)
      this.buildParagraph()
    }

    public get fontPaint (): Paint {
      return this._fontPaint
    }

    public get text (): string {
      return this._text
    }

    public set text (value: string) {
      this._text = value
      this.markDirty()
    }

    public render (graphics: Graphics): void {
      super.render(graphics)
      if (this._text) {
        graphics.drawParagraph(this._paragraph, 0, 0)
      }
    }
    public update () {
      super.update()
      if (this.dirty) {
        this.path.reset()
        this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        this.buildParagraph()
      }
    }

    private buildParagraph () {
      // this._paragraphStyle = new ParagraphStyle(this._fontPaint.getColor(), this._font.fontSize, this._textAlignment)
      // this._paragraphBuilder = new ParagraphBuilder(this._paragraphStyle)
      this._paragraphBuilder.reset()
      this._paragraphBuilder.addText(this._text)
      this._paragraph = this._paragraphBuilder.build()
      this._paragraph.layout(this.boundary.width)
    }
}
