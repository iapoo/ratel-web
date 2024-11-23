import { Editor } from '@ratel-web/editor/Editor'
import { PointerEvent } from '@ratel-web/engine'

export class Writer extends Editor {
  public constructor(canvasId: string | HTMLCanvasElement) {
    super(canvasId)
  }

  public handlePointerDown(e: PointerEvent) {
    console.log(`Mouse down handler begin`)
    super.handlePointerDown(e)
    console.log(`Mouse down handler end`)
  }
}
