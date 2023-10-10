import { Editor } from "../../Editor"
import { Operation } from "./Operation"

export class OperationService {
    private _editors: Array<Editor> = new Array<Editor>(0)
    private _undoOperations: Array<Operation> = new Array<Operation>(0)
    private _redoOperations: Array<Operation> = new Array<Operation>(0)

    public addEditor(editor: Editor) {
        if(this._editors.indexOf(editor) < 0) {
            this._editors.push(editor)
        }
    }

    public removeEditor(editor: Editor) {
        const index = this._editors.indexOf(editor)
        if(index >= 0) {
            this._editors.splice(index, 1)
        }
    }

    public getAllEditors() {
        return this._editors;
    }

    public addOperation(operation: Operation) {
        this._undoOperations.push(operation)    
    }

    public removeAllOperations() {
        this._undoOperations.length = 0
        this._redoOperations.length = 0
    }

    public undo() {
        if(this._undoOperations.length > 0) {
            this._redoOperations.push(this._undoOperations[this._undoOperations.length - 1])
            this._undoOperations.pop()            
        }
    }

    public redo() {
        if(this._redoOperations.length > 0) {
            this._undoOperations.push(this._undoOperations[this._undoOperations.length - 1])
            this._redoOperations.pop()            
        }
    }

    public getUndoOperations() : Operation[] {
        return this._undoOperations
        
    }

    public getUndoOperation(): Operation | undefined {
        if(this._undoOperations.length > 0) {
            return this._undoOperations[this._undoOperations.length - 1]
        } else {
            return undefined
        }
    }

    public getRedoOperations() : Operation[]  {
        return this._redoOperations
    }

    public getRedoOperation(): Operation | undefined {
        if(this._redoOperations.length > 0) {
            return this._redoOperations[this._redoOperations.length - 1]
        } else {
            return undefined
        }
    }
}