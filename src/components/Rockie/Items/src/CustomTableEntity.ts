import { Categories, Type } from './Item'
import { Shapes } from './ShapeEntity'
import { TableEntity } from './TableEntity'

export class CustomTableEntities {
  public static TYPE_CUSTOMER_TABLE = 'CustomTable'
  public static DESC_CUSTOMER_TABLE = 'CustomTable'
  public static TEXT_CUSTOMER_TABLE = 'CustomTable'
}

export interface CustomTableType {
  name: string
  description: string
  freeze: string
  text: string
  left: number
  top: number
  width: number
  height: number
  rowCount: number
  columnCount: number
  fixedFirstRow: boolean
  firstRowHeight: number
  fixedFirstColumn: boolean
  firstColumnWidth: number
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



const CustomTableTypes: CustomTableType[] = [
  {
    name: CustomTableEntities.TYPE_CUSTOMER_TABLE, description: CustomTableEntities.DESC_CUSTOMER_TABLE, freeze: Shapes.FREEZE_NONE, text: CustomTableEntities.TEXT_CUSTOMER_TABLE, left: 0, top: 0, width: 250, height: 160, enableMask: false,
    rowCount: 3, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class CustomTableEntity extends TableEntity {
  private _customTableTypeName: string
  private _customTableTypeInfos: CustomTableType[]
  private _customTableType: CustomTableType
  public constructor(left: number, top: number, width: number, height: number, customTableeTypeName: string = CustomTableEntities.TYPE_CUSTOMER_TABLE, customTableTypeInfos: CustomTableType[] = CustomTableTypes, rowCount = 2, columnCount = 1) {
    super(left, top, width, height, rowCount, columnCount)
    this._customTableTypeName = customTableeTypeName
    this._customTableTypeInfos = customTableTypeInfos
    this._customTableType = this.parseTableTypeInfo(customTableeTypeName)
  }

  public get isContainer(): boolean {
    return true
  }

  public get customTableeType() {
    return this._customTableType
  }

  public get customTableTypeName() {
    return this._customTableTypeName
  }

  public get customTableTypeInfos() {
    return this._customTableTypeInfos
  }

  public get customizable() {
    return false
  }

  public getAllTypes(): Type[] {
    return [{ name: CustomTableEntities.TYPE_CUSTOMER_TABLE, description: CustomTableEntities.DESC_CUSTOMER_TABLE, },]
  }

  public get category(): string {
    return Categories.CUSTOM_TABLE
  }

  private parseTableTypeInfo(customTableTypeName: string): CustomTableType {
    let result: CustomTableType = this._customTableTypeInfos[0]
    this._customTableTypeInfos.forEach((customTableType: CustomTableType) => {
      if (customTableType.name == customTableTypeName) {
        result = customTableType
      }
    })
    return result
  }

}
