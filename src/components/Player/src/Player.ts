import { Control, Layer, Point2, Rectangle2D, Rotation, Shape, TextShape, Button, Line2D, } from '@/components/Engine'
import { Painter, } from '@/components/Painter'

export class Player extends Painter {
  private _content: Layer
  private _controller: Layer

  public constructor(canvasId: string) {
    super(canvasId)
    this._content = new Layer(0, 0, this.width, this.height)
    this._controller = new Layer(0, 0, this.width, this.height)
    const rectangle = new Rectangle2D(100, 170, 100, 80)
    const text = new TextShape('text非 edit edit edit edit edit edit edit edit edit edit edit 常渴啦啊aa', 50, 50, 150, 54)
    text.position = new Point2(80, 60)
    text.rotation = new Rotation(0.1, 0, 0)
    const control = new Control(200, 200, 160, 60, 'Control')
    const button = new Button(300, 400, 160, 60, 'Button')
    const line = new Line2D(100, 100, 600, 400)
    // this.root.addNode(this._content)
    // this.root.addNode(this._controller)
    this.root.addNode(text)
    this.root.addNode(rectangle)
    this.root.addNode(control)
    this.root.addNode(button)
    this.root.addNode(line)

    text.onPointerDown(callback => {
      console.log('=============text mouse works')
    })
    text.onPointerClick(callback => {
      console.log('=============text mouse click works')
    })
    text.onPointerEnter(callback => {
      console.log('=============text mouse enter works')
    })
    text.onPointerLeave(callback => {
      console.log('=============text mouse leave works')
    })
    rectangle.onPointerDown(callback => {
      console.log('=============rectangle mouse works')
    })
    rectangle.onPointerMove(callback => {
      console.log('==============moving ')
    })
  }

  public get content() {
    return this._content
  }

  public addShape(shape: Shape) {
    this._content?.addNode(shape)
  }
}
