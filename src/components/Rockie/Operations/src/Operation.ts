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
    RENAME_EDITOR
}

export class Operation {

    private _editor: Editor
    private _type: OperationType
    private _description: string
    private _itemInfos: Array<EditorItemInfo>

    public constructor(editor: Editor, type: OperationType, itemInfos: Array<EditorItemInfo>, description: string = '') {
        this._editor = editor
        this._type = type
        this._description = description
        this._itemInfos = itemInfos
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
}