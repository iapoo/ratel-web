import { Editor, } from "../../Editor";
import { EditorItemInfo } from "../../Items";


export enum OperationType {
    ADD_ITEMS,
    REMOVE_ITEMS,
    MOVE_ITEMS,
    UPDATE_ITEMS,
    ADD_SELECTION_ITEMS,
    REMOVE_SELECTION_ITEMS,
    SELECT_EDITOR,
    ADD_EDITOR,
    REMOVE_EDITOR,
    RENAME_EDITOR,
    MOVE_EDITOR,
}

export class Operation {

    private _editor: Editor
    private _type: OperationType
    private _description: string
    private _itemInfos: Array<EditorItemInfo>
    private _targetEditor: Editor | undefined

    public constructor(editor: Editor, type: OperationType, itemInfos: Array<EditorItemInfo>, description: string = '', targetEditor: Editor | undefined = undefined) {
        this._editor = editor
        this._type = type
        this._description = description
        this._itemInfos = itemInfos
        this._targetEditor = targetEditor
    }

    public get editor() {
        return this._editor
    }

    public get type() {
        return this._type
    }

    public get description() {
        return this._description
    }

    public get itemInfos() {
        return this._itemInfos
    }

    public get targetEditor() {
        return this._targetEditor
    }
}