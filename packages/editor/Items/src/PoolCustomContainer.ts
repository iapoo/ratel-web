import { Rectangle } from '@ratel-web/engine'
import { EntityShape, EntityShapeType, PoolContainerShape } from '../../Shapes'
import { ContainerEntity } from './ContainerEntity'
import { Categories, Type } from './Item'
import { PoolLabelEntity } from './PoolLabelEntity'
import { ShapeConstants } from './ShapeEntity'

export class PoolCustomContainers {
  public static TYPE_HORIZONTAL_POOL = 'Horizontal Pool'
  public static DESC_HORIZONTAL_POOL = 'Horizontal Pool 2'
  public static TEXT_HORIZONTAL_POOL = ''
  public static TYPE_HORIZONTAL_POOL_2 = 'Horizontal Pool 2'
  public static DESC_HORIZONTAL_POOL_2 = 'Horizontal Pool 2'
  public static TEXT_HORIZONTAL_POOL_2 = ''
  public static TYPE_VERTICAL_POOL = 'Vertical Pool'
  public static DESC_VERTICAL_POOL = 'Vertical Pool'
  public static TEXT_VERTICAL_POOL = ''
  public static TYPE_VERTICAL_POOL_2 = 'Vertical Pool 2'
  public static DESC_VERTICAL_POOL_2 = 'Vertical Pool 2'
  public static TEXT_VERTICAL_POOL_2 = ''
}

export interface PoolType {
  name: string
  description: string
  freeze: string
  text: string
  horizontal: boolean
  stageCount: number
  poolCount: number
  left: number
  top: number
  width: number
  height: number
  enableMask: boolean
  modifiable: boolean
  modifierX: number
  modifierY: number
  modifierStartX: number
  modifierStartY: number
  modifierEndX: number
  modifierEndY: number
  modifyInLine: boolean
  modifyInPercent: boolean
  controllable: boolean
  controllerX: number
  controllerY: number
  controllerStartX: number
  controllerStartY: number
  controllerEndX: number
  controllerEndY: number
  controlInLine: boolean
  controlInPercent: boolean
  adaptable: boolean
  adapterX: number
  adapterY: number
  adapterDirection: string
  adapterSize: number
  adapterStartX: number
  adapterStartY: number
  adapterEndX: number
  adapterEndY: number
  adaptInLine: boolean
  adaptInPercent: boolean
}

export const PoolCustomContainerTypes: PoolType[] = [
  {
    name: PoolCustomContainers.TYPE_HORIZONTAL_POOL,
    description: PoolCustomContainers.DESC_HORIZONTAL_POOL,
    freeze: ShapeConstants.FREEZE_NONE,
    text: PoolCustomContainers.TEXT_HORIZONTAL_POOL,
    horizontal: true,
    stageCount: 2,
    poolCount: 2,
    left: 0,
    top: 0,
    width: 550,
    height: 500,
    enableMask: true,
    modifiable: true,
    modifierX: 0,
    modifierY: 40,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 1,
    modifyInLine: true,
    modifyInPercent: false,
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
    adapterDirection: 'X',
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: PoolCustomContainers.TYPE_HORIZONTAL_POOL_2,
    description: PoolCustomContainers.DESC_HORIZONTAL_POOL_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: PoolCustomContainers.TEXT_HORIZONTAL_POOL_2,
    horizontal: true,
    stageCount: 1,
    poolCount: 1,
    left: 0,
    top: 0,
    width: 550,
    height: 250,
    enableMask: true,
    modifiable: true,
    modifierX: 0,
    modifierY: 40,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 1,
    modifyInLine: true,
    modifyInPercent: false,
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
    adapterDirection: 'X',
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: PoolCustomContainers.TYPE_VERTICAL_POOL,
    description: PoolCustomContainers.DESC_VERTICAL_POOL,
    freeze: ShapeConstants.FREEZE_NONE,
    text: PoolCustomContainers.TEXT_VERTICAL_POOL,
    horizontal: false,
    stageCount: 2,
    poolCount: 2,
    left: 0,
    top: 0,
    width: 500,
    height: 550,
    enableMask: true,
    modifiable: true,
    modifierX: 0,
    modifierY: 40,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 1,
    modifyInLine: true,
    modifyInPercent: false,
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
    adapterDirection: 'X',
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: PoolCustomContainers.TYPE_VERTICAL_POOL_2,
    description: PoolCustomContainers.DESC_VERTICAL_POOL_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: PoolCustomContainers.TEXT_VERTICAL_POOL_2,
    horizontal: false,
    stageCount: 1,
    poolCount: 1,
    left: 0,
    top: 0,
    width: 250,
    height: 550,
    enableMask: true,
    modifiable: true,
    modifierX: 0,
    modifierY: 40,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 1,
    modifyInLine: true,
    modifyInPercent: false,
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
    adapterDirection: 'X',
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
]

export class PoolCustomContainer extends ContainerEntity {
  private static readonly DEFAULT_HEADER_SIZE = 40
  private static readonly DEFAULT_POOL_LABEL_SIZE = 30
  private static readonly DEFAULT_STAGE_LABEL_SIZE = 24
  private _horizontal: boolean
  private _poolCount: number
  private _stageCount: number
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    poolCount = 2,
    stageCount = 2,
    horizontal = true,
    typeName = PoolCustomContainers.TYPE_HORIZONTAL_POOL,
    shapeTypes: PoolType[] = PoolCustomContainerTypes,
  ) {
    super(left, top, width, height, { shapeType: typeName }, shapeTypes)
    this._horizontal = horizontal
    this._poolCount = poolCount
    this._stageCount = stageCount
    const customTypeInfo = this.parseTypeInfo({ shapeType: typeName })
    this._shape = new PoolContainerShape(left, top, width, height, poolCount, stageCount, horizontal, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.initializeShape()
    this.refreshPools()
  }

  public get poolCount(): number {
    return this._poolCount
  }

  public set poolCount(value: number) {
    this._poolCount = value
  }

  public get stageCount() {
    return this._stageCount
  }

  public set stageCount(value: number) {
    this._stageCount = value
  }

  public get horizontal() {
    return this._horizontal
  }

  public set horizontal(value: boolean) {
    this._horizontal = value
  }

  public get isContainer(): boolean {
    return true
  }

  public get types(): Type[] {
    return PoolCustomContainerTypes
  }

  public get category(): string {
    return Categories.POOL
  }

  public insertPool() {
    this._poolCount++
  }

  public removePool() {
    if (this._poolCount > 0) {
      this._poolCount--
    }
  }

  public insertStage() {
    this._stageCount++
  }

  public removeStage() {
    if (this._stageCount > 1) {
      this._stageCount--
    }
  }

  public get boundary() {
    return super.boundary
  }

  public set boundary(value: Rectangle) {
    super.boundary = value
    this.refreshPools()
  }

  private initializeShape() {
    switch (this._shape.typeInfo.name) {
      case PoolCustomContainers.TYPE_HORIZONTAL_POOL: {
        break
      }
      case PoolCustomContainers.TYPE_VERTICAL_POOL: {
        this.text = this._shape.typeInfo.text
        break
      }
      default:
        break
    }
  }

  private refreshPools() {
    this.removeAllItems()
    if (this._horizontal) {
      const header = new PoolLabelEntity(0, 0, PoolCustomContainer.DEFAULT_HEADER_SIZE, this.height)
      this.addItem(header)
      if (this._stageCount > 1) {
        const stageWidth = (this.width - header.width) / this._stageCount
        const stageHeight = PoolCustomContainer.DEFAULT_STAGE_LABEL_SIZE
        for (let i = 0; i < this._stageCount; i++) {
          const stageLabel = new PoolLabelEntity(header.width + stageWidth * i, 0, stageWidth, stageHeight)
          this.addItem(stageLabel)
        }
        if (this._poolCount === 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = this.height - stageHeight
          const poolLabel = new PoolLabelEntity(header.width, stageHeight, poolLabelWidth, poolLabelHeight)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = (this.height - stageHeight) / this._poolCount
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(header.width, stageHeight + poolLabelHeight * i, poolLabelWidth, poolLabelHeight)
            this.addItem(poolLabel)
          }
        }
      } else {
        if (this._poolCount === 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = this.height
          const poolLabel = new PoolLabelEntity(header.width, 0, poolLabelWidth, poolLabelHeight)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = this.height / this._poolCount
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(header.width, poolLabelHeight * i, poolLabelWidth, poolLabelHeight)
            this.addItem(poolLabel)
          }
        }
      }
    } else {
      const header = new PoolLabelEntity(0, 0, this.width, PoolCustomContainer.DEFAULT_HEADER_SIZE)
      this.addItem(header)
      if (this._stageCount > 1) {
        const stageWidth = PoolCustomContainer.DEFAULT_STAGE_LABEL_SIZE
        const stageHeight = (this.height - header.height) / this._stageCount
        for (let i = 0; i < this._stageCount; i++) {
          const stageLabel = new PoolLabelEntity(0, header.height + stageHeight * i, stageWidth, stageHeight)
          this.addItem(stageLabel)
        }
        if (this._poolCount === 1) {
          const poolLabelWidth = this.width - stageWidth
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabel = new PoolLabelEntity(stageWidth, header.height, poolLabelWidth, poolLabelHeight)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = (this.width - stageWidth) / this._poolCount
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(stageWidth + poolLabelWidth * i, header.height, poolLabelWidth, poolLabelHeight)
            this.addItem(poolLabel)
          }
        }
      } else {
        if (this._poolCount === 1) {
          const poolLabelWidth = this.width
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabel = new PoolLabelEntity(0, header.height, poolLabelWidth, poolLabelHeight)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = this.width / this._poolCount
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(i * poolLabelWidth, header.height, poolLabelWidth, poolLabelHeight)
            this.addItem(poolLabel)
          }
        }
      }
    }
  }

  public recalculateBoundary(oldWidth: number, oldHeight: number) {
    const widthRatio = this.width / oldWidth
    const heightRatio = this.height / oldHeight
    console.log(`${widthRatio}    ${heightRatio}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public buildShape(theThis: PoolContainerShape) {
    theThis.path.reset()
    theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
    if (theThis.horizontal) {
      if (theThis.stageCount > 1) {
        const headerLabel = theThis.children[0] as EntityShape
        for (let i = 0; i < theThis.stageCount; i++) {
          theThis.path.moveTo((theThis.children[i + 1] as EntityShape).right, 0)
          theThis.path.lineTo((theThis.children[i + 1] as EntityShape).right, this.height)
        }
        for (let i = 0; i < theThis.poolCount; i++) {
          theThis.path.moveTo(headerLabel.width, (theThis.children[i + 1 + theThis.stageCount] as EntityShape).bottom)
          theThis.path.lineTo(theThis.width, (theThis.children[i + 1 + theThis.stageCount] as EntityShape).bottom)
        }
      } else {
        const headerLabel = theThis.children[0] as EntityShape
        for (let i = 0; i < theThis.poolCount; i++) {
          theThis.path.moveTo(headerLabel.width, (theThis.children[i + 1] as EntityShape).bottom)
          theThis.path.lineTo(theThis.width, (theThis.children[i + 1] as EntityShape).bottom)
        }
      }
    } else {
      if (theThis.stageCount > 1) {
        for (let i = 0; i < theThis.stageCount; i++) {
          theThis.path.moveTo((theThis.children[i + 1] as EntityShape).right, (theThis.children[i + 1] as EntityShape).bottom)
          theThis.path.lineTo(theThis.width, (theThis.children[i + 1] as EntityShape).bottom)
        }
        for (let i = 0; i < theThis.poolCount; i++) {
          theThis.path.moveTo(
            (theThis.children[i + 1 + theThis.stageCount] as EntityShape).right,
            (theThis.children[i + 1 + theThis.stageCount] as EntityShape).bottom,
          )
          theThis.path.lineTo((theThis.children[i + 1 + theThis.stageCount] as EntityShape).right, this.height)
        }
      } else {
        for (let i = 0; i < theThis.poolCount; i++) {
          theThis.path.moveTo((theThis.children[i + theThis.stageCount] as EntityShape).right, (theThis.children[i + theThis.stageCount] as EntityShape).bottom)
          theThis.path.lineTo((theThis.children[i + theThis.stageCount] as EntityShape).right, this.height)
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomContainer
    return shapeType
  }
}
