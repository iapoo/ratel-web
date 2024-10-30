import { Editor } from "../../Editor"
import { Operation } from "./Operation"

export class OperationService {
    private static operationService: OperationService = new OperationService()

    private _editors: Array<Editor> = new Array<Editor>(0)
    private _undoOperations: Array<Operation> = new Array<Operation>(0)
    private _redoOperations: Array<Operation> = new Array<Operation>(0)

    public static get instance() {
        return OperationService.operationService
    }

    private constructor() {

    }

    public addOperation(operation: Operation) {
        this._undoOperations.push(operation)
        this._redoOperations.length = 0
    }

    public removeAllOperations() {
        this._undoOperations.length = 0
        this._redoOperations.length = 0
    }

    public undo() {
        if (this._undoOperations.length > 0) {
            this._redoOperations.push(this._undoOperations[this._undoOperations.length - 1])
            this._undoOperations.pop()
        }
    }

    public redo() {
        if (this._redoOperations.length > 0) {
            this._undoOperations.push(this._redoOperations[this._redoOperations.length - 1])
            this._redoOperations.pop()
        }
    }

    public getUndoOperations(): Operation[] {
        return this._undoOperations

    }

    public getUndoOperation(): Operation | undefined {
        if (this._undoOperations.length > 0) {
            return this._undoOperations[this._undoOperations.length - 1]
        } else {
            return undefined
        }
    }

    public getRedoOperations(): Operation[] {
        return this._redoOperations
    }

    public getRedoOperation(): Operation | undefined {
        if (this._redoOperations.length > 0) {
            return this._redoOperations[this._redoOperations.length - 1]
        } else {
            return undefined
        }
    }
}