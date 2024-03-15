import { Image } from "@/components/Engine"
import { CustomImageShape, } from "../../Shapes"
import { EntityShapeType } from "../../Shapes/src/EntityShape"
import { Categories, Type } from "./Item"
import { ShapeEntity, Shapes, } from "./ShapeEntity"
import { ImageUtils } from "../../Utils/src/ImageUtils"

const TYPE_IMAGE_CONTAINER = 'ImageContainer'
const DESC_IMAGE_CONTAINER = 'ImageContainer'
const TEXT_IMAGE_CONTAINER = ''

export const ImageContainerTypes = [{ name: TYPE_IMAGE_CONTAINER, description: DESC_IMAGE_CONTAINER, 
  freeze: Shapes.FREEZE_NONE, text: TEXT_IMAGE_CONTAINER, left: 0, top: 0, width: 100, height: 100, enableMask: false, 
  modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
  controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
  adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'Y', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
}]

export class ImageContainer extends ShapeEntity {
  private _image: string

  public constructor(left: number, top: number, width: number, height: number, image: string) {    
    super(left, top, width, height, {shapeType: TYPE_IMAGE_CONTAINER}, ImageContainerTypes)
    this._image =  image
    const customTypeInfo = this.parseTypeInfo({shapeType: TYPE_IMAGE_CONTAINER})
    this._shape = new CustomImageShape(left, top, width, height, image, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this._shape.filled = false
    this._shape.stroked = false
  }

  public get image() {
    return this._image
  }

  public set image(value: string) {
    this._image = value
    this.updateTheme()
  }

  public get types(): Type[] {
    return ImageContainerTypes
  }

  public get category(): string {
    return Categories.CUSTOM_IMAGE_SHAPE
  }

  public buildShape(theThis: CustomImageShape) {
    // const blob = ImageUtils.convertBase64StringToBlob(theThis.image)
    // if(blob) {
    //   await blob.arrayBuffer().then( arrayBuffer => {
    //     const image = Image.make(arrayBuffer)
    //     theThis.imageData = image
    //   })
    // }
    const blob2 = ImageUtils.convertBase64StringToUInt8Array(theThis.image)
    if(blob2) {
      const image = Image.make(blob2.buffer)
      theThis.imageData = image
    }

  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 
}
