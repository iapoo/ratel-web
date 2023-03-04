import { EditorItemData, } from './EditorItemData'

export class EditorData {
    public name = ''
    public index = 0
    public zoom = 1
    public x = 0
    public y = 0
    public width = 2000
    public height = 2000
    public title = ''
    public key = ''
    public items: Array<EditorItemData> = new Array<EditorItemData>(0)
}
