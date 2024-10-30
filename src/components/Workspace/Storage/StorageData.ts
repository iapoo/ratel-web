import { EditorInfo } from '@/components/Rockie/Editor'
import { EditorData, } from '.'

export class StorageData {
    public version = '1.0'
    public author = ''
    public theme = ''
    public sheets: Array<EditorInfo> = new Array<EditorInfo>(0)
}
