import { EditorInfo } from '@ratel-web/editor/Editor'

export class StorageData {
  public version = '1.0'
  public author = ''
  public theme = ''
  public sheets: Array<EditorInfo> = new Array<EditorInfo>(0)
}
