import { EditorData, } from '.'

export class StorageData {
    public version = '1.0'
    public author =''
    public sheets: Array<EditorData> = new Array<EditorData>(0)
}
