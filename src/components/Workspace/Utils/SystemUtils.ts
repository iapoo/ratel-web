/**
 * 定义一些全局方法和状态信息
 */

import { Utils } from '@/components/Workspace/Utils/Utils'
import { EditorMode } from '@ratel-web/editor/Editor'
import { Connector, ConnectorArrowType, ConnectorArrowTypes, EditorItem, PoolCustomContainer, PoolLabelEntity, TableEntity } from '@ratel-web/editor/Items'
import { Operation, OperationType } from '@ratel-web/editor/Operations'
import { Constants, EditorHelper } from '@ratel-web/editor/Utils'
import { Point2 } from '@ratel-web/engine'
import moment from 'moment'

export enum OSType {
  MACOS,
  WINDOWS,
  IOS,
  ANDROID,
  LINUX,
  UNKNOWN,
}

export class SystemUtils {
  public static extractDateFromServerCalendar(dateTime: number) {
    return moment(dateTime).format('YYYY-MM-DD')
  }

  public static extractTimeFromServerCalendar(dateTime: number) {
    return moment(dateTime).format('HH:mm')
  }

  public static extractDateTimeFromServerCalendar(dateTime: number) {
    return moment(dateTime).format('YYYY-MM-DD HH:mm')
  }

  public static convertDocumentData(documentData: any) {
    let content = documentData.data.data.content.content
    let data = JSON.parse(content)
    return data
  }

  public static handleInternalError(message: string) {
    alert(message)
    console.log(message)
  }

  public static parseUrl(url: string) {
    const urlObj = {
      protocol: /^(.+):\/\//,
      host: /:\/\/(.+?)[?#\s/]/,
      path: /\w(\/.*?)[?#\s]/,
      query: /\?(.+?)[#/\s]/,
      hash: /#(\w+)\s$/,
    }
    const theUrl = url + ' '
    // eslint-disable-next-line guard-for-in
    for (const key in urlObj) {
      // @ts-ignore
      const pattern = urlObj[key]
      // @ts-ignore
      urlObj[key] = key === 'query' ? pattern.exec(theUrl) && SystemUtils.formatQuery(pattern.exec(theUrl)[1]) : pattern.exec(theUrl) && pattern.exec(theUrl)[1]
    }
    return urlObj
  }

  private static formatQuery(str: string) {
    return str.split('&').reduce((a, b) => {
      const arr = b.split('=')
      // @ts-ignore
      a[arr[0]] = arr[1]
      return a
    }, {})
  }
  /**
   * REF: https://www.jb51.net/javascript/2915111pf.htm
   * REF: https://www.php.cn/faq/526256.html
   * @param content
   * @param fileName
   * @param fileFormat
   * @param fileType
   */
  public static generateDownloadFile(content: any, fileName: string) {
    let alink = document.createElement('a')
    alink.download = fileName
    alink.style.display = 'none'
    let blob = new Blob([content])
    alink.href = URL.createObjectURL(blob)
    document.body.appendChild(alink)
    alink.click()
    document.body.removeChild(alink)
  }

  public static findConnectorArrowType(connectorArrowTypeName: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let connectorArrowTypeNameValue = ConnectorArrowTypes[0].name
    ConnectorArrowTypes.forEach((connectorArrowType) => {
      if (connectorArrowType.name === connectorArrowTypeName) {
        connectorArrowTypeNameValue = connectorArrowType.name
      }
    })
    return connectorArrowTypeName
  }

  public static cloneConnectorLineArrowType(connectorArrowType: ConnectorArrowType): ConnectorArrowType {
    return {
      name: connectorArrowType.name,
      description: connectorArrowType.description,
      type: connectorArrowType.type,
      height: connectorArrowType.height,
      width: connectorArrowType.width,
      modifier: connectorArrowType.modifier,
      count: connectorArrowType.count,
      outline: connectorArrowType.outline,
      close: connectorArrowType.close,
      displayMode: connectorArrowType.displayMode,
    }
  }

  public static debugPoints(points: Point2[]) {
    let count = points.length
    let output = `Array data: length = ${count}, data = `
    for (let i = 0; i < count; i++) {
      const point = points[i]
      output = output + `${i}:[${point.x}, ${point.y}],`
    }
    console.log(output)
  }

  public static generateEditorMode(editorMode: EditorMode) {
    switch (editorMode) {
      case EditorMode.AUTO:
        return Constants.EDITOR_CURSOR_AUTO
      case EditorMode.DEFAULT:
        return Constants.EDITOR_CURSOR_DEFAULT
      case EditorMode.ALL_SCROLL:
        return Constants.EDITOR_CURSOR_ALL_SCROLL
      case EditorMode.HELP:
        return Constants.EDITOR_CURSOR_HELP
      case EditorMode.MOVE:
        return Constants.EDITOR_CURSOR_MOVE
      case EditorMode.POINTER:
        return Constants.EDITOR_CURSOR_POINTER
      case EditorMode.PROGRESS:
        return Constants.EDITOR_CURSOR_PROGRESS
      case EditorMode.TEXT:
        return Constants.EDITOR_CURSOR_TEXT
      case EditorMode.VERTICAL_TEXT:
        return Constants.EDITOR_CURSOR_VERTICAL_TEXT
      case EditorMode.WAIT:
        return Constants.EDITOR_CURSOR_WAIT
      case EditorMode.NO_DROP:
        return Constants.EDITOR_CURSOR_NO_DROP
      case EditorMode.NOT_ALLOWED:
        return Constants.EDITOR_CURSOR_NOT_ALLOWED
      case EditorMode.E_RESIZE:
        return Constants.EDITOR_CURSOR_E_RESIZE
      case EditorMode.N_RESIZE:
        return Constants.EDITOR_CURSOR_N_RESIZE
      case EditorMode.S_RESIZE:
        return Constants.EDITOR_CURSOR_S_RESIZE
      case EditorMode.W_RESIZE:
        return Constants.EDITOR_CURSOR_W_RESIZE
      case EditorMode.NE_RESIZE:
        return Constants.EDITOR_CURSOR_NE_RESIZE
      case EditorMode.NW_RESIZE:
        return Constants.EDITOR_CURSOR_NW_RESIZE
      case EditorMode.SE_RESIZE:
        return Constants.EDITOR_CURSOR_SE_RESIZE
      case EditorMode.SW_RESIZE:
        return Constants.EDITOR_CURSOR_SW_RESIZE
      case EditorMode.ROW_RESIZE:
        return Constants.EDITOR_CURSOR_ROW_RESIZE
      case EditorMode.COL_RESIZE:
        return Constants.EDITOR_CURSOR_COL_RESIZE
      case EditorMode.CROSSHAIR:
        return Constants.EDITOR_CURSOR_CROSSHAIR
      default:
        return Constants.EDITOR_CURSOR_AUTO
    }
  }

  public static getOS() {
    const userAgent = navigator.userAgent
    const platform = navigator.platform
    const macOS = /Mac OS/.test(userAgent)
    const windows = /win16|win8|win32|win64|x64|x32/.test(userAgent) || /wow64/.test(userAgent)
    const ios = /iPhone|iPad|iPod/.test(userAgent) && /OS [1-9]_/.test(userAgent)
    const android = /Android/.test(userAgent)
    const linux = /Linux/.test(platform)

    if (macOS) return OSType.MACOS
    if (windows) return OSType.WINDOWS
    if (ios) return OSType.IOS
    if (android) return OSType.ANDROID
    if (linux) return OSType.LINUX

    return 'Unknown OS'
  }

  /**
   * Generate random string with specified length
   * @param length
   * @returns
   */
  public static generateRandomString(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length))
      result += randomChar
    }
    return result
  }

  /**
   * Generic update operation for item attribute update
   * @param update
   * @param isTextUpdate
   */
  public static updateEditorItem = (update: (editorItem: EditorItem) => void, isTextUpdate: boolean) => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof PoolCustomContainer && editorItems.length === 1) {
          if (Utils.currentEditor?.target && Utils.currentEditor?.target !== editorItem) {
            update(Utils.currentEditor.target)
          } else {
            update(editorItem)
            editorItem.items.forEach((child) => {
              if (child instanceof PoolLabelEntity) {
                update(child)
              }
            })
          }
        } else if (editorItem instanceof TableEntity) {
          if (Utils.currentEditor?.targetItem) {
            update(Utils.currentEditor.targetItem)
          } else {
            editorItem.items.forEach((child) => {
              update(child)
            })
          }
        } else {
          update(editorItem)
        }
      })
      Utils.currentEditor.focus()
      if (isTextUpdate) {
        Utils.currentEditor.triggerTextEditStyleChange()
      }
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }

  /**
   * Generic update operation for item attribute update
   * @param update
   * @param isTextUpdate
   */
  public static updateConnector = (update: (connector: Connector) => void) => {
    if (Utils.currentEditor) {
      const editorItems = Utils.currentEditor.selectionLayer.getAllEditorItems()
      const beforeSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      editorItems.forEach((editorItem: EditorItem) => {
        if (editorItem instanceof Connector) {
          update(editorItem)
        }
      })
      Utils.currentEditor.focus()
      Utils.currentEditor.triggerTextEditStyleChange()
      const afterSelections = EditorHelper.generateEditorSelections(Utils.currentEditor)
      const operation: Operation = new Operation(
        Utils.currentEditor,
        OperationType.UPDATE_ITEMS,
        afterSelections,
        true,
        beforeSelections,
        '',
        null,
        null,
        null,
        null,
      )
      Utils.currentEditor.operationService.addOperation(operation)
      Utils.currentEditor.triggerOperationChange()
    }
  }
}
