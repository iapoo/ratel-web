import { Graphics, ParagraphDirection, Rectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes, TableEntity } from '../../../Items'
import { Type } from '../../../Items/src/Item'

export class UMLBasicClass extends TableEntity {
  
  public constructor(left: number, top: number, width: number, height: number, rowCount = 2, columnCount = 1) {
    super(left, top, width, height, rowCount, columnCount)
  }

  public getAllTypes(): Type[] {
    return [{ name: TableEntity.TABLE_TYPE_TABLE, description: TableEntity.TABLE_DESC_TABLE, },]
  }

  public get category(): string {
    return Categories.TABLE
  }


}
