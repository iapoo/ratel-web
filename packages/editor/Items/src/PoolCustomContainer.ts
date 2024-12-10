import { ParagraphDirection, Rectangle } from '@ratel-web/engine'
import { EntityShape, EntityShapeType, PoolContainerShape, PoolLabelShape } from '../../Shapes'
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
  poolTextHorizontal: boolean
  stageTextHorizontal: boolean
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
    poolTextHorizontal: false,
    stageTextHorizontal: true,
    left: 0,
    top: 0,
    width: 550,
    height: 500,
    enableMask: true,
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
    poolTextHorizontal: false,
    stageTextHorizontal: true,
    left: 0,
    top: 0,
    width: 550,
    height: 250,
    enableMask: true,
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
    poolTextHorizontal: true,
    stageTextHorizontal: false,
    left: 0,
    top: 0,
    width: 500,
    height: 550,
    enableMask: true,
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
    poolTextHorizontal: true,
    stageTextHorizontal: false,
    left: 0,
    top: 0,
    width: 250,
    height: 550,
    enableMask: true,
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
  private static readonly DEFAULT_POOL_SIZE = 250
  private static readonly DEFAULT_STAGE_SIZE = 250
  private static readonly DEFAULT_STAGE_LABEL_TEXT = 'Stage'
  private static readonly DEFAULT_POOL_LABEL_TEXT = 'Pool'
  private static readonly DEFAULT_HEADER_LABEL_TEXT = 'Header'
  private _horizontal: boolean
  private _poolCount: number
  private _stageCount: number
  private _poolTextHorizontal: boolean
  private _stageTextHorizontal: boolean

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    poolCount = 2,
    stageCount = 2,
    horizontal = true,
    poolTextHorizontal = true,
    stageTextHorizontal = true,
    typeName = PoolCustomContainers.TYPE_HORIZONTAL_POOL,
    shapeTypes: PoolType[] = PoolCustomContainerTypes,
  ) {
    super(left, top, width, height, { shapeType: typeName }, shapeTypes)
    this._horizontal = horizontal
    this._poolCount = poolCount
    this._stageCount = stageCount
    this._poolTextHorizontal = poolTextHorizontal
    this._stageTextHorizontal = stageTextHorizontal
    const customTypeInfo = this.parseTypeInfo({ shapeType: typeName })
    this._shape = new PoolContainerShape(
      left,
      top,
      width,
      height,
      poolCount,
      stageCount,
      horizontal,
      poolTextHorizontal,
      stageTextHorizontal,
      this.buildShape,
      customTypeInfo,
    )
    this.initializeTheme()
    this.initializeShape()
    this.refreshPools()
  }

  public get poolCount(): number {
    return this._poolCount
  }

  public get stageCount() {
    return this._stageCount
  }

  public get horizontal() {
    return this._horizontal
  }

  public set horizontal(value: boolean) {
    if (this._horizontal !== value) {
      this._horizontal = value
      ;(this._shape as PoolContainerShape).horizontal = value
      this.switchPoolDirection()
      this.refreshTextDirection()
    }
  }

  public get poolTextHorizontal() {
    return this._poolTextHorizontal
  }

  public set poolTextHorizontal(value: boolean) {
    this._poolTextHorizontal = value
    ;(this._shape as PoolContainerShape).poolTextHorizontal = value
    this.refreshTextDirection()
  }

  public get stageTextHorizontal() {
    return this._stageTextHorizontal
  }

  public set stageTextHorizontal(value: boolean) {
    this._stageTextHorizontal = value
    ;(this._shape as PoolContainerShape).stageTextHorizontal = value
    this.refreshTextDirection()
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

  public appendPool() {
    const header = this.items[0]
    if (this._horizontal) {
      if (this._stageCount > 1) {
        if (this._poolCount >= 1) {
          const firstPoolLabel = this.items[1 + this._stageCount]
          const poolLabelWidth = firstPoolLabel.width
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_SIZE
          const poolLabel = new PoolLabelEntity(header.width, this.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width, header.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
        } else {
          // poolCount = 0
          const firstStageLabel = this.items[1]
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = header.height - firstStageLabel.height
          const poolLabel = new PoolLabelEntity(header.width, firstStageLabel.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          //header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width, header.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
          //super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
        }
      } else {
        // stage count = 1
        if (this._poolCount >= 1) {
          const firstPoolLabel = this.items[1]
          const poolLabelWidth = firstPoolLabel.width
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_SIZE
          const poolLabel = new PoolLabelEntity(header.width, this.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width, header.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
        } else {
          // poolCount = 0
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = header.height
          const poolLabel = new PoolLabelEntity(header.width, 0, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          //header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width, header.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
          //super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height + PoolCustomContainer.DEFAULT_POOL_SIZE)
        }
      }
    } else {
      // vertical
      if (this._stageCount > 1) {
        if (this._poolCount >= 1) {
          const firstPoolLabel = this.items[1 + this._stageCount]
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_SIZE
          const poolLabelHeight = firstPoolLabel.height
          const poolLabel = new PoolLabelEntity(this.width, firstPoolLabel.top, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width + PoolCustomContainer.DEFAULT_POOL_SIZE, header.height)
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width + PoolCustomContainer.DEFAULT_POOL_SIZE, this.height)
        } else {
          // poolCount = 0
          const firstStageLabel = this.items[1]
          const poolLabelWidth = this.width - firstStageLabel.width
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabel = new PoolLabelEntity(firstStageLabel.right, header.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          //header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width + PoolCustomContainer.DEFAULT_POOL_SIZE, header.height)
          //super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width + PoolCustomContainer.DEFAULT_POOL_SIZE, this.height)
        }
      } else {
        // stage count = 1
        if (this._poolCount >= 1) {
          const firstPoolLabel = this.items[1]
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_SIZE
          const poolLabelHeight = firstPoolLabel.height
          const poolLabel = new PoolLabelEntity(this.width, header.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width + PoolCustomContainer.DEFAULT_POOL_SIZE, header.height)
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width + PoolCustomContainer.DEFAULT_POOL_SIZE, this.height)
        } else {
          // poolCount = 0
          const poolLabelWidth = header.width
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabel = new PoolLabelEntity(0, header.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
          //header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width + PoolCustomContainer.DEFAULT_POOL_SIZE, header.height)
          //super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width + PoolCustomContainer.DEFAULT_POOL_SIZE, this.height)
        }
      }
    }
    this._poolCount++
    ;(this._shape as PoolContainerShape).poolCount++
  }

  public removePool() {
    if (this._poolCount > 0) {
      const header = this.items[0]
      if (this._horizontal) {
        if (this._poolCount > 1) {
          const lastPoolLabel = this.items[this.items.length - 1]
          this.removeItem(lastPoolLabel)
          header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width, header.height - lastPoolLabel.height)
          this._poolCount--
          ;(this._shape as PoolContainerShape).poolCount--
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height - lastPoolLabel.height)
        } else {
          // poolCount = 1
          const lastPoolLabel = this.items[this.items.length - 1]
          this.removeItem(lastPoolLabel)
          this._poolCount--
          ;(this._shape as PoolContainerShape).poolCount--
        }
      } else {
        // vertical
        if (this._poolCount > 1) {
          const lastPoolLabel = this.items[this.items.length - 1]
          this.removeItem(lastPoolLabel)
          header.boundary = Rectangle.makeLTWH(header.left, header.top, header.width - lastPoolLabel.width, header.height)
          this._poolCount--
          ;(this._shape as PoolContainerShape).poolCount--
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width - lastPoolLabel.width, this.height)
        } else {
          // poolCount = 1
          const lastPoolLabel = this.items[this.items.length - 1]
          this.removeItem(lastPoolLabel)
          this._poolCount--
          ;(this._shape as PoolContainerShape).poolCount--
        }
      }
    }
  }

  public addStage() {
    const header = this.items[0]
    if (this._horizontal) {
      if (this._stageCount > 1) {
        const lastStageLabel = this.items[this._stageCount]
        const stageLabelWidth = PoolCustomContainer.DEFAULT_STAGE_SIZE
        const stageLabelHeight = lastStageLabel.height
        const stageLabel = new PoolLabelEntity(lastStageLabel.right, lastStageLabel.top, stageLabelWidth, stageLabelHeight, this._stageTextHorizontal)
        stageLabel.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
        this.applyStyle(stageLabel)
        this.addItemAt(stageLabel, this._stageCount + 1)
        super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width + PoolCustomContainer.DEFAULT_STAGE_SIZE, this.height)
      } else {
        // stage count = 1
        const stageLabelWidth = (this.width - header.width) / 2
        const stageLabelHeight = PoolCustomContainer.DEFAULT_STAGE_LABEL_SIZE
        if (this._poolCount >= 1) {
          const firstPoolLabel = this.items[1]
          firstPoolLabel.boundary = Rectangle.makeLTWH(firstPoolLabel.left, stageLabelHeight, firstPoolLabel.width, firstPoolLabel.height - stageLabelHeight)
        }
        const stageLabel1 = new PoolLabelEntity(header.right, 0, stageLabelWidth, stageLabelHeight, this._stageTextHorizontal)
        stageLabel1.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
        this.applyStyle(stageLabel1)
        this.addItemAt(stageLabel1, 1)
        const stageLabel2 = new PoolLabelEntity(stageLabel1.right, 0, stageLabelWidth, stageLabelHeight, this._stageTextHorizontal)
        stageLabel2.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
        this.applyStyle(stageLabel2)
        this.addItemAt(stageLabel2, 2)
      }
    } else {
      if (this._stageCount > 1) {
        const lastStageLabel = this.items[this._stageCount]
        const stageLabelWidth = lastStageLabel.width
        const stageLabelHeight = PoolCustomContainer.DEFAULT_STAGE_SIZE
        const stageLabel = new PoolLabelEntity(lastStageLabel.left, lastStageLabel.bottom, stageLabelWidth, stageLabelHeight, this._stageTextHorizontal)
        stageLabel.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
        this.applyStyle(stageLabel)
        this.addItemAt(stageLabel, this._stageCount + 1)
        super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height + PoolCustomContainer.DEFAULT_STAGE_SIZE)
      } else {
        // stage count = 1
        const stageLabelWidth = PoolCustomContainer.DEFAULT_STAGE_LABEL_SIZE
        const stageLabelHeight = (this.height - header.height) / 2
        if (this._poolCount >= 1) {
          const firstPoolLabel = this.items[1]
          firstPoolLabel.boundary = Rectangle.makeLTWH(stageLabelWidth, header.height, firstPoolLabel.width - stageLabelWidth, firstPoolLabel.height)
        }
        const stageLabel1 = new PoolLabelEntity(0, header.bottom, stageLabelWidth, stageLabelHeight, this._stageTextHorizontal)
        stageLabel1.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
        this.applyStyle(stageLabel1)
        this.addItemAt(stageLabel1, 1)
        const stageLabel2 = new PoolLabelEntity(0, stageLabel1.bottom, stageLabelWidth, stageLabelHeight, this._stageTextHorizontal)
        stageLabel2.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
        this.applyStyle(stageLabel2)
        this.addItemAt(stageLabel2, 2)
      }
    }
    this._stageCount++
    ;(this._shape as PoolContainerShape).stageCount++
  }

  public removeStage() {
    if (this._stageCount > 1) {
      if (this._horizontal) {
        if (this._stageCount > 2) {
          const lastStageLabel = this.items[this._stageCount]
          this.removeItem(lastStageLabel)
          this._stageCount--
          ;(this._shape as PoolContainerShape).stageCount--
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width - lastStageLabel.width, this.height)
        } else {
          // stage count = 2
          const lastStageLabel = this.items[this._stageCount]
          this.removeItemAt(1)
          this.removeItemAt(1)
          this._stageCount--
          ;(this._shape as PoolContainerShape).stageCount--
          if (this._poolCount >= 1) {
            const firstPoolLabel = this.items[1]
            firstPoolLabel.boundary = Rectangle.makeLTWH(firstPoolLabel.left, 0, firstPoolLabel.width, firstPoolLabel.height + lastStageLabel.height)
          }
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height)
        }
      } else {
        if (this._stageCount > 2) {
          const lastStageLabel = this.items[this._stageCount]
          this.removeItem(lastStageLabel)
          this._stageCount--
          ;(this._shape as PoolContainerShape).stageCount--
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height - lastStageLabel.height)
        } else {
          // stage count = 2
          const lastStageLabel = this.items[this._stageCount]
          this.removeItemAt(1)
          this.removeItemAt(1)
          this._stageCount--
          ;(this._shape as PoolContainerShape).stageCount--
          if (this._poolCount > 1) {
            const firstPoolLabel = this.items[1]
            firstPoolLabel.boundary = Rectangle.makeLTWH(0, firstPoolLabel.top, firstPoolLabel.width + lastStageLabel.width, firstPoolLabel.height)
          }
          super.boundary = Rectangle.makeLTWH(this.left, this.top, this.width, this.height)
        }
      }
    }
  }

  public get boundary() {
    return super.boundary
  }

  public set boundary(value: Rectangle) {
    const oldWidth = this.width
    const oldHeight = this.height
    super.boundary = value
    this.recalculateBoundary(oldWidth, oldHeight)
  }

  private initializeShape() {
    switch (this._shape.typeInfo.name) {
      case PoolCustomContainers.TYPE_HORIZONTAL_POOL: {
        break
      }
      case PoolCustomContainers.TYPE_VERTICAL_POOL: {
        break
      }
      default:
        this.text = this._shape.typeInfo.text
        break
    }
  }

  private switchPoolDirection() {
    super.boundary = Rectangle.makeLTWH(this.left, this.top, this.height, this.width)
    this._poolTextHorizontal = !this._poolTextHorizontal
    this._stageTextHorizontal = !this._stageTextHorizontal
    this.items.forEach((item) => {
      if (item instanceof PoolLabelEntity) {
        item.boundary = Rectangle.makeLTWH(item.top, item.left, item.height, item.width)
      } else {
        item.boundary = Rectangle.makeLTWH(item.top, item.left, item.width, item.height)
      }
    })
  }

  private refreshPools() {
    this.removeAllItems()
    if (this._horizontal) {
      const header = new PoolLabelEntity(0, 0, PoolCustomContainer.DEFAULT_HEADER_SIZE, this.height, this._poolTextHorizontal)
      header.text = PoolCustomContainer.DEFAULT_HEADER_LABEL_TEXT
      this.applyStyle(header)
      this.addItem(header)
      if (this._stageCount > 1) {
        const stageWidth = (this.width - header.width) / this._stageCount
        const stageHeight = PoolCustomContainer.DEFAULT_STAGE_LABEL_SIZE
        for (let i = 0; i < this._stageCount; i++) {
          const stageLabel = new PoolLabelEntity(header.width + stageWidth * i, 0, stageWidth, stageHeight, this._stageTextHorizontal)
          stageLabel.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
          this.applyStyle(stageLabel)
          this.addItem(stageLabel)
        }
        if (this._poolCount === 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = this.height - stageHeight
          const poolLabel = new PoolLabelEntity(header.width, stageHeight, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = (this.height - stageHeight) / this._poolCount
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(header.width, stageHeight + poolLabelHeight * i, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
            poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
            this.applyStyle(poolLabel)
            this.addItem(poolLabel)
          }
        }
      } else {
        if (this._poolCount === 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = this.height
          const poolLabel = new PoolLabelEntity(header.width, 0, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabelHeight = this.height / this._poolCount
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(header.width, poolLabelHeight * i, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
            poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
            this.applyStyle(poolLabel)
            this.addItem(poolLabel)
          }
        }
      }
    } else {
      const header = new PoolLabelEntity(0, 0, this.width, PoolCustomContainer.DEFAULT_HEADER_SIZE, this._poolTextHorizontal)
      this.applyStyle(header)
      this.addItem(header)
      if (this._stageCount > 1) {
        const stageWidth = PoolCustomContainer.DEFAULT_STAGE_LABEL_SIZE
        const stageHeight = (this.height - header.height) / this._stageCount
        for (let i = 0; i < this._stageCount; i++) {
          const stageLabel = new PoolLabelEntity(0, header.height + stageHeight * i, stageWidth, stageHeight, this._stageTextHorizontal)
          stageLabel.text = PoolCustomContainer.DEFAULT_STAGE_LABEL_TEXT
          this.applyStyle(stageLabel)
          this.addItem(stageLabel)
        }
        if (this._poolCount === 1) {
          const poolLabelWidth = this.width - stageWidth
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabel = new PoolLabelEntity(stageWidth, header.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = (this.width - stageWidth) / this._poolCount
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(stageWidth + poolLabelWidth * i, header.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
            poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
            this.applyStyle(poolLabel)
            this.addItem(poolLabel)
          }
        }
      } else {
        if (this._poolCount === 1) {
          const poolLabelWidth = this.width
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          const poolLabel = new PoolLabelEntity(0, header.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
          poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
          this.applyStyle(poolLabel)
          this.addItem(poolLabel)
        } else if (this._poolCount > 1) {
          const poolLabelWidth = this.width / this._poolCount
          const poolLabelHeight = PoolCustomContainer.DEFAULT_POOL_LABEL_SIZE
          for (let i = 0; i < this._poolCount; i++) {
            const poolLabel = new PoolLabelEntity(i * poolLabelWidth, header.height, poolLabelWidth, poolLabelHeight, this._poolTextHorizontal)
            poolLabel.text = PoolCustomContainer.DEFAULT_POOL_LABEL_TEXT
            this.applyStyle(poolLabel)
            this.addItem(poolLabel)
          }
        }
      }
    }
  }

  public recalculateBoundary(oldWidth: number, oldHeight: number) {
    const widthRatio = this.width / oldWidth
    const heightRatio = this.height / oldHeight
    const header = this.items[0]
    if (this._horizontal) {
      header.boundary = Rectangle.makeLTWH(0, 0, header.width, header.height * heightRatio)
    } else {
      header.boundary = Rectangle.makeLTWH(0, 0, header.width * widthRatio, header.height)
    }
    if (this._stageCount > 1) {
      for (let i = 0; i < this._stageCount; i++) {
        const stageLabel = this.items[1 + i]
        if (this._horizontal) {
          const stageWidthRatio = (this.width - header.width) / (oldWidth - header.width)
          stageLabel.boundary = Rectangle.makeLTWH(
            header.width + (stageLabel.left - header.width) * stageWidthRatio,
            stageLabel.top,
            stageLabel.width * stageWidthRatio,
            stageLabel.height,
          )
        } else {
          const stageHeightRatio = (this.height - header.height) / (oldHeight - header.height)
          stageLabel.boundary = Rectangle.makeLTWH(
            stageLabel.left,
            header.height + (stageLabel.top - header.height) * stageHeightRatio,
            stageLabel.width,
            stageLabel.height * stageHeightRatio,
          )
        }
      }
      for (let i = 0; i < this._poolCount; i++) {
        const poolLabel = this.items[1 + this._stageCount + i]
        if (this._horizontal) {
          const stageHeightRatio = (this.height - this.items[1].height) / (oldHeight - this.items[1].height)
          poolLabel.boundary = Rectangle.makeLTWH(
            poolLabel.left,
            this.items[1].height + (poolLabel.top - this.items[1].height) * stageHeightRatio,
            poolLabel.width,
            poolLabel.height * stageHeightRatio,
          )
        } else {
          const stageWidthRatio = (this.width - this.items[1].width) / (oldWidth - this.items[1].width)
          poolLabel.boundary = Rectangle.makeLTWH(
            this.items[1].width + (poolLabel.left - this.items[1].width) * stageWidthRatio,
            poolLabel.top,
            poolLabel.width * stageWidthRatio,
            poolLabel.height,
          )
        }
      }
    } else {
      for (let i = 0; i < this._poolCount; i++) {
        const poolLabel = this.items[1 + i]
        if (this._horizontal) {
          poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left, poolLabel.top * heightRatio, poolLabel.width, poolLabel.height * heightRatio)
        } else {
          poolLabel.boundary = Rectangle.makeLTWH(poolLabel.left * widthRatio, poolLabel.top, poolLabel.width * widthRatio, poolLabel.height)
        }
      }
    }
  }

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
    for (let i = 0; i < theThis.children.length; i++) {
      const item = theThis.children[i] as PoolLabelShape
      if (theThis.stageCount > 1) {
        if (theThis.poolCount > 0) {
          if (i > 0 && i <= theThis.stageCount) {
            if (theThis.stageTextHorizontal) {
              item.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              item.paragraphDirection = ParagraphDirection.BottomTop
            }
          } else if (i === 0 || i <= theThis.stageCount + theThis.poolCount) {
            if (theThis.poolTextHorizontal) {
              item.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              item.paragraphDirection = ParagraphDirection.BottomTop
            }
          }
        } else {
          if (i > 0 && i <= theThis.stageCount) {
            if (theThis.stageTextHorizontal) {
              item.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              item.paragraphDirection = ParagraphDirection.BottomTop
            }
          } else if (i === 0) {
            if (theThis.poolTextHorizontal) {
              item.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              item.paragraphDirection = ParagraphDirection.BottomTop
            }
          }
        }
      } else {
        if (i <= theThis.poolCount) {
          if (theThis.poolTextHorizontal) {
            item.paragraphDirection = ParagraphDirection.LeftRight
          } else {
            item.paragraphDirection = ParagraphDirection.BottomTop
          }
        }
      }
    }
  }

  private refreshTextDirection() {
    for (let i = 0; i < this.items.length; i++) {
      const shape = this.items[i].shape as PoolLabelShape
      if (this.stageCount > 1) {
        if (this.poolCount > 0) {
          if (i > 0 && i <= this.stageCount) {
            shape.textHorizontal = this.stageTextHorizontal
            if (this.stageTextHorizontal) {
              shape.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              shape.paragraphDirection = ParagraphDirection.BottomTop
            }
          } else if (i === 0 || i <= this.stageCount + this.poolCount) {
            shape.textHorizontal = this.poolTextHorizontal
            if (this.poolTextHorizontal) {
              shape.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              shape.paragraphDirection = ParagraphDirection.BottomTop
            }
          }
        } else {
          if (i > 0 && i <= this.stageCount) {
            shape.textHorizontal = this.stageTextHorizontal
            if (this.stageTextHorizontal) {
              shape.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              shape.paragraphDirection = ParagraphDirection.BottomTop
            }
          } else if (i === 0) {
            shape.textHorizontal = this.poolTextHorizontal
            if (this.poolTextHorizontal) {
              shape.paragraphDirection = ParagraphDirection.LeftRight
            } else {
              shape.paragraphDirection = ParagraphDirection.BottomTop
            }
          }
        }
      } else {
        if (i <= this.poolCount) {
          shape.textHorizontal = this.poolTextHorizontal
          if (this.poolTextHorizontal) {
            shape.paragraphDirection = ParagraphDirection.LeftRight
          } else {
            shape.paragraphDirection = ParagraphDirection.BottomTop
          }
        }
      }
    }
  }

  private applyStyle(poolLabelEntity: PoolLabelEntity) {
    poolLabelEntity.strokeColor = this.strokeColor
    poolLabelEntity.fillColor = this.fillColor
    poolLabelEntity.fontSize = this.fontSize
    poolLabelEntity.fontColor = this.fontColor
    poolLabelEntity.fontWeight = this.fontWeight
    poolLabelEntity.fontSlant = this.fontSlant
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomContainer
    return shapeType
  }
}
