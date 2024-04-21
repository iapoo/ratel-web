import { Categories, Type } from './Item'
import { TableEntity } from './TableEntity'

export class CustomTableEntities {
  public static TYPE_CUSTOMER_TABLE = 'CustomTable'
  public static DESC_CUSTOMER_TABLE = 'CustomTable'
}

export class CustomTableEntity extends TableEntity {
  
  public constructor(left: number, top: number, width: number, height: number, rowCount = 2, columnCount = 1) {
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
