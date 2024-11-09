import { MyShapes, RequestUtils } from '@/components/Workspace/Utils/RequestUtils'
import { Editor } from '@ratel-web/editor/Editor'
import { MyShape, MyShapeType } from '@ratel-web/editor/Items'
import { CommonUtils, EditorHelper, ImageUtils } from '@ratel-web/editor/Utils'

export class EditorUtils {
  public static async addToMyShapes(editor: Editor, callback: () => void) {
    const settingData = await RequestUtils.getSettings()
    if (settingData.status === 200 && settingData.data.success) {
      console.log(`Succeed to get settings`)
      const settings = settingData.data.data.settings
      let myShapes: MyShapes = settings ? JSON.parse(settings) : {}
      const selectionInfos = EditorHelper.generateEditorSelections(editor)
      const [left, top, right, bottom] = editor.getSelectionBoundary()
      const data = EditorHelper.exportSelected(editor, 'png', true)
      const largeData = EditorHelper.exportSelected(editor, 'png', false)
      const imageData = 'data:image/png;base64,' + data
      const largeImageData = 'data:image/png;base64,' + largeData
      const imageInfo = JSON.stringify(selectionInfos)
      const id = CommonUtils.generateID()
      if (!myShapes || !myShapes.shapes) {
        myShapes = {
          shapes: [
            {
              icon: imageData,
              image: largeImageData,
              info: imageInfo,
              type: MyShapeType.SELECTION,
              name: 'Custom Shape',
              id: id,
              width: right - left,
              height: bottom - top,
            },
          ],
        }
      } else {
        myShapes.shapes.push({
          icon: imageData,
          image: largeImageData,
          info: imageInfo,
          type: MyShapeType.SELECTION,
          name: 'Custom Shape',
          id: id,
          width: right - left,
          height: bottom - top,
        })
      }

      const myShapesInfo = JSON.stringify(myShapes)
      // console.log(`myShapesInfo= ${myShapes}`)
      const updateSettingsData = await RequestUtils.updateSettings(myShapesInfo)
      if (updateSettingsData.status === 200 && updateSettingsData.data.success) {
        console.log(`Succeed to update settings`)
      } else {
        console.log(`Fail to update settings`)
      }
      // SystemUtils.generateDownloadFile(data, 'test.png')
      if (callback) {
        callback()
      }
    } else {
      console.log(`Fail to get settings`)
    }
  }

  public static async addImageToMyShapes(
    icon: string,
    imageData: string,
    myShapes: MyShape[],
    callback: () => void,
    imageWidth: number,
    imageHeight: number,
  ) {
    const imageInfo = imageData
    const id = CommonUtils.generateID()
    myShapes.push({
      // @ts-ignore
      icon: icon,
      image: imageData,
      info: imageInfo,
      type: MyShapeType.IMAGE,
      name: 'Custom Image',
      id: id,
      width: imageWidth,
      height: imageHeight,
    })

    const myShapesInfo = JSON.stringify({ shapes: myShapes })
    // console.log(`myShapesInfo= ${myShapes}`)
    const updateSettingsData = await RequestUtils.updateSettings(myShapesInfo)
    if (updateSettingsData.status === 200 && updateSettingsData.data.success) {
      console.log(`Succeed to update settings`)
    } else {
      console.log(`Fail to update settings`)
    }
    // SystemUtils.generateDownloadFile(data, 'test.png')
    if (callback) {
      callback()
    }
  }

  public static async addSvgToMyShapes(
    svgData: string,
    myShapes: MyShape[],
    callback: () => void,
    imageWidth: number,
    imageHeight: number,
  ) {
    const imageInfo = ImageUtils.convertBase64ImageToString(svgData)
    const id = CommonUtils.generateID()
    myShapes.push({
      icon: svgData,
      image: svgData,
      info: imageInfo,
      type: MyShapeType.SVG,
      name: 'Custom SVG',
      id: id,
      width: imageWidth,
      height: imageHeight,
    })

    const myShapesInfo = JSON.stringify({ shapes: myShapes })
    // console.log(`myShapesInfo= ${myShapes}`)
    const updateSettingsData = await RequestUtils.updateSettings(myShapesInfo)
    if (updateSettingsData.status === 200 && updateSettingsData.data.success) {
      console.log(`Succeed to update settings`)
    } else {
      console.log(`Fail to update settings`)
    }
    // SystemUtils.generateDownloadFile(data, 'test.png')
    if (callback) {
      callback()
    }
  }
}
