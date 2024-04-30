import { Categories, Type } from './Item'
import { TableEntity } from './TableEntity'

export class CustomTableEntities {
  public static TYPE_CUSTOMER_TABLE = 'CustomTable'
  public static DESC_CUSTOMER_TABLE = 'CustomTable'
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

export class CustomTableEntity extends TableEntity {
  
  public constructor(left: number, top: number, width: number, height: number, shapeType: string, shapeTypeInfos: CustomTableType[], rowCount = 2, columnCount = 1) {
    super(left, top, width, height, rowCount, columnCount)
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


}
