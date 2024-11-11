import { EntityExtension, EntityRenderContext, EntityShapeType, ExtensionShape } from '../../Shapes'
import { CustomEntities, CustomEntityTypes } from './CustomEntity'
import { Categories, Type } from './Item'
import { ShapeEntity, ShapeOptions, ShapeType } from './ShapeEntity'

export interface Plugin {
  name: string
  description: string
  author: string
  homepage: string
  email: string
  extensions: EntityExtension[]
}

export class ExtendedEntity extends ShapeEntity {
  private _entityExtension: EntityExtension
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    entityExtension: EntityExtension,
    shapeOptions: ShapeOptions = { shapeType: CustomEntities.TYPE_CUSTOM_SHAPE },
    shapeTypes: ShapeType[] = CustomEntityTypes,
  ) {
    super(left, top, width, height, shapeOptions, shapeTypes)
    this._entityExtension = entityExtension
    const customTypeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new ExtensionShape(left, top, width, height, this._entityExtension, this.buildShape, customTypeInfo)
  }

  public get types(): Type[] {
    return CustomEntityTypes
  }

  public get category(): string {
    return Categories.CUSTOM_SHAPE
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public buildShape(renderContext: EntityRenderContext, extensionShape: ExtensionShape, entityExtension: EntityExtension) {
    renderContext.prepareRender()
    renderContext.path.reset()
    renderContext.secondPath.reset()
    renderContext.thirdPath.reset()
    renderContext.fourthPath.reset()
    entityExtension.buildShape(renderContext)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }
}
