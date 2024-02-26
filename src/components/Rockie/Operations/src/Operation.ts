import { Editor, } from "../../Editor";
import { EditorItemInfo } from "../../Items";


export enum OperationType {
    ADD_ITEMS,
    REMOVE_ITEMS,
    MOVE_ITEMS,
    UPDATE_ITEMS,
    ADD_SELECTION_ITEMS,     //Paste items, rename id
    REMOVE_SELECTION_ITEMS,  // Cut items, 
    SELECT_EDITOR,
    ADD_EDITOR,
    REMOVE_EDITOR,
    RENAME_EDITOR,
    MOVE_EDITOR,
    ADD_ITEMS_TO_CONTAINER,
    REMOVE_ITEMS_FROM_CONTAINER,    
}

export class Operation {

    private _editor: Editor
    private _type: OperationType
    private _description: string
    private _itemInfos: Array<EditorItemInfo>
    private _origItemInfos: Array<EditorItemInfo>
    private _afterEditor: Editor | null
    private _afterItemId: string | null
    private _selected: boolean

    public constructor(editor: Editor, type: OperationType, itemInfos: Array<EditorItemInfo>, selected: boolean = false, origItemInfos: Array<EditorItemInfo> = [], description: string = '', afterEditor: Editor | null = null, afterItemId: string | null = null) {
        this._editor = editor
        this._type = type
        this._description = description
        this._itemInfos = itemInfos
        this._origItemInfos = origItemInfos
        this._afterEditor = afterEditor
        this._afterItemId = afterItemId
        this._selected = selected
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

    public get afterEditor() {
        return this._afterEditor
    }

    public get afterItemId() {
        return this._afterItemId
    }

    public get origItemInfos() {
        return this._origItemInfos
    }

    public get selected() {
        return this._selected
    }
}