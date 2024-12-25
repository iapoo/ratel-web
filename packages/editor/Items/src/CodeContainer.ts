import { Image } from '@ratel-web/engine'
import { CustomCodeShape, EntityShapeType } from '../../Shapes'
import { ImageUtils } from '../../Utils'
import { Categories, Type } from './Item'
import { ShapeConstants, ShapeEntity } from './ShapeEntity'

const TYPE_CODE_CONTAINER = 'CodeContainer'
const DESC_CODE_CONTAINER = 'Code Editor'
const TEXT_CODE_CONTAINER = ''

export const CodeContainerTypes = [
  {
    name: TYPE_CODE_CONTAINER,
    description: DESC_CODE_CONTAINER,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CODE_CONTAINER,
    left: 0,
    top: 0,
    width: 360,
    height: 320,
    enableMask: false,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: true,
    modifyInPercent: true,
    controllable: false,
    controllerX: 0,
    controllerY: 0,
    controllerStartX: 0,
    controllerStartY: 0,
    controllerEndX: 0,
    controllerEndY: 0,
    controlInLine: true,
    controlInPercent: true,
    adaptable: false,
    adapterX: 0,
    adapterY: 0,
    adapterDirection: 'Y',
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
]

export class CodeContainer extends ShapeEntity {
  private _codeImage: string
  private _codeContent: string

  public constructor(left: number, top: number, width: number, height: number, codeContent: string, codeImage: string) {
    super(left, top, width, height, { shapeType: TYPE_CODE_CONTAINER }, CodeContainerTypes)
    this._codeImage = codeImage
    this._codeContent = codeContent
    const customTypeInfo = this.parseTypeInfo({ shapeType: TYPE_CODE_CONTAINER })
    this._shape = new CustomCodeShape(left, top, width, height, codeImage, this.buildShape, customTypeInfo)
    this.filled = false
    this.initializeTheme()
    this.lineWidth = 0.25
    this.useTheme = false
  }

  public get codeImage() {
    return this._codeImage
  }

  public set codeImage(value: string) {
    this._codeImage = value
    ;(this._shape as CustomCodeShape).image = value
    this.updateTheme()
  }

  public get codeContent() {
    return this._codeContent
  }

  public set codeContent(value: string) {
    this._codeContent = value
    this.updateTheme()
  }

  public get types(): Type[] {
    return CodeContainerTypes
  }

  public get category(): string {
    return Categories.CODE_CONTAINER
  }

  public buildShape(theThis: CustomCodeShape) {
    // const blob = CodeUtils.convertBase64StringToBlob(theThis.code)
    // if(blob) {
    //   await blob.arrayBuffer().then( arrayBuffer => {
    //     const code = Code.make(arrayBuffer)
    //     theThis.codeData = code
    //   })
    // }
    const blob2 = ImageUtils.convertBase64StringToUInt8Array(theThis.image)
    if (blob2) {
      theThis.imageData = Image.make(blob2.buffer)
    }
    //console.log(`${theThis}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    return EntityShapeType.CustomShape
  }
}
