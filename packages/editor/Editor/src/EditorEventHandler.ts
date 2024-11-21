import { Editor } from './Editor'
import { EditorContext } from './EditorContext'

export class EditorEventHandler {
  private _editor: Editor
  private _editorContext: EditorContext

  public constructor(editor: Editor, editorContext: EditorContext) {
    this._editor = editor
    this._editorContext = editorContext
  }
}
