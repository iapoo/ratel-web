import { Editor, } from '@/components/Rockie/Editor'
import { StorageData, } from '../Storage'

export class Utils {
    public static HEADER_HEIGHT = 76
    public static FOOTER_HEIGHT = 0
    public static TITLE_HEIGHT = 56
    public static DEFAULT_NAVIGATOR_WIDTH = 204
    public static MIN_NAVIGATOR_WIDTH = 32
    public static MAX_NAVIGATOR_WIDTH = 480
    public static DEFAULT_DIVIDER_WIDTH = 6    

    public static enablePropertyEditor: boolean = false
    
    public static currentEditor: Editor | undefined

    public static editors: Array<Editor> = new Array<Editor>(0)

    public static storageData: StorageData | undefined

    public static updateEditorSize : ()=> void

    public static isModified: boolean = false

    public static loadData: () => void

    public static saveData: () => void

    public static checkIfModified: (ifModified: boolean) => void
}
