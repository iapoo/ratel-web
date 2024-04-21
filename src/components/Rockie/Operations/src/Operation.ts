import { Editor, } from "../../Editor";
import { EditorItemInfo } from "../../Items";


export enum OperationType {
    ADD_ITEMS,
    REMOVE_ITEMS,
    UPDATE_ITEMS,
    ADD_SELECTION_ITEMS,     //Paste items, rename id
    REMOVE_SELECTION_ITEMS,  // Cut items, 
    SELECT_EDITOR,
    ADD_EDITOR,
    REMOVE_EDITOR,
    RENAME_EDITOR,
    MOVE_EDITOR,
    SHAPE_TEXT_EDIT,
    TABLE_TEXT_EDIT,
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
    private _beforeEditor: Editor | null
    private _beforeItemId: string | null
    private _inTextEditting: boolean
    private _textStart: number
    private _textEnd: number
    private _origTextStart: number
    private _origTextEnd: number
    private _editorTitle: string
    private _origEditorTitle: string
    private _origEditor: Editor | null
    private _tableCellIndex: number

    public constructor(editor: Editor, type: OperationType, itemInfos: Array<EditorItemInfo>, selected: boolean = false, 
        origItemInfos: Array<EditorItemInfo> = [], description: string = '', afterEditor: Editor | null = null, afterItemId: string | null = null, 
        beforeEditor: Editor | null = null, beforeItemId: string | null = null, inTextEditting: boolean = false, textStart: number = 0, 
        textEnd: number = 0, origTextStart: number = 0, origTextEnd: number = 0,  editorTitle: string = '', origEditorTitle: string = '', origEditor: Editor | null = null, tableCellIndex: number = 0) {
        this._editor = editor
        this._type = type
        this._description = description
        this._itemInfos = itemInfos
        this._origItemInfos = origItemInfos
        this._afterEditor = afterEditor
        this._afterItemId = afterItemId
        this._selected = selected
        this._beforeEditor = beforeEditor
        this._beforeItemId = beforeItemId
        this._inTextEditting = inTextEditting
        this._textStart = textStart
        this._textEnd = textEnd
        this._origTextStart = origTextStart
        this._origTextEnd = origTextEnd
        this._editorTitle = editorTitle
        this._origEditorTitle = origEditorTitle
        this._origEditor = origEditor
        this._tableCellIndex = tableCellIndex
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

    public get beforeEditor() {
        return this._beforeEditor
    }

    public get beforeItemId() {
        return this._beforeItemId
    }

    public get inTextEditting() {
        return this._inTextEditting
    }

    public get textStart() {
        return this._textStart
    }

    public get textEnd() {
        return this._textEnd
    }

    public get origTextStart() {
        return this._origTextStart
    }

    public get origTextEnd() {
        return this._origTextEnd
    }

    public get editorTitle() {
        return this._editorTitle
    }

    public get  origEditorTitle() {
        return this._origEditorTitle
    }

    public get origEditor() {
        return this._origEditor
    }

    public get tableCellIndex() {
        return this._tableCellIndex
    }
}