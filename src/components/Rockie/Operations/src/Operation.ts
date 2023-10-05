import { Editor, EditorItem } from "../../Editor";


export enum OperationType {
    CREATE_ITEMS,
    DELETE_ITEMS,
    MOVE_ITEMS,
    UPDATE_ITEMS,
    ADD_SELECTION_ITEMS,
    REMOVE_SELECTION_ITEMS
}

export abstract class Operation {

    private _editor: Editor
    private _type: string
    private _description: string
    private _items: Array<EditorItem>

    public constructor(editor: Editor, type: string, description: string, items: Array<EditorItem>) {
        this._editor = editor
        this._type = type
        this._description = description
        this._items = items
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

    public get items() {
        return this._items
    }

    public abstract process(): void;
}