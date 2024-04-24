import { Colors, FontSlant, FontWeight, Graphics, ParagraphDirection, Rectangle, TextAlignment, TextVerticalAlignment } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, CustomTableEntity, Shapes, TableEntity } from '../../../Items'
import { Type } from '../../../Items/src/Item'


const TYPE_GRID_SHAPE_CLASS = 'Class'
const DESC_GRID_SHAPE_CLASS = 'Class'
const TEXT_GRID_SHAPE_CLASS = 'Class'
const TYPE_GRID_SHAPE_CLASS_2 = 'Class 2'
const DESC_GRID_SHAPE_CLASS_2 = 'Class 2'
const TEXT_GRID_SHAPE_CLASS_2 = 'Class 2'
const TYPE_GRID_SHAPE_CLASS_3 = 'Class 3'
const DESC_GRID_SHAPE_CLASS_3 = 'Class 3'
const TEXT_GRID_SHAPE_CLASS_3 = 'Class 3'
const TYPE_GRID_SHAPE_CLASS_4 = 'Class 4'
const DESC_GRID_SHAPE_CLASS_4 = 'Class 4'
const TEXT_GRID_SHAPE_CLASS_4 = 'Class 4'
const TYPE_GRID_SHAPE_CLASS_5 = 'Class 5'
const DESC_GRID_SHAPE_CLASS_5 = 'Class 5'
const TEXT_GRID_SHAPE_CLASS_5 = 'Class 5'
const TYPE_GRID_SHAPE_OBJECT = 'Object'
const DESC_GRID_SHAPE_OBJECT = 'Object'
const TEXT_GRID_SHAPE_OBJECT = 'Object'
const TYPE_GRID_SHAPE_INTERFACE = 'Interface'
const DESC_GRID_SHAPE_INTERFACE = 'Interface'
const TEXT_GRID_SHAPE_INTERFACE = 'Interface'
const TYPE_GRID_SHAPE_INTERFACE_2 = 'Interface 2'
const DESC_GRID_SHAPE_INTERFACE_2 = 'Interface 2'
const TEXT_GRID_SHAPE_INTERFACE_2 = 'Interface 2'
const TYPE_GRID_SHAPE_INTERFACE_3 = 'Interface 3'
const DESC_GRID_SHAPE_INTERFACE_3 = 'Interface 3'
const TEXT_GRID_SHAPE_INTERFACE_3 = 'Interface 3'
const TYPE_GRID_SHAPE_PACKAGE = 'Package'
const DESC_GRID_SHAPE_PACKAGE = 'Package'
const TEXT_GRID_SHAPE_PACKAGE = 'Package'
const TYPE_GRID_SHAPE_PACKAGE_2 = 'Package 2'
const DESC_GRID_SHAPE_PACKAGE_2 = 'Package 2'
const TEXT_GRID_SHAPE_PACKAGE_2 = 'Package 2'
const TYPE_GRID_SHAPE_PACKAGE_3 = 'Package 3'
const DESC_GRID_SHAPE_PACKAGE_3 = 'Package 3'
const TEXT_GRID_SHAPE_PACKAGE_3 = 'Package 3'


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

export const UMLGridShapeTypes = [
  { name: TYPE_GRID_SHAPE_CLASS, description: DESC_GRID_SHAPE_CLASS, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_CLASS, left: 0, top: 0, width: 250, height: 160, enableMask: false, 
    rowCount: 3, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_CLASS_2, description: DESC_GRID_SHAPE_CLASS_2, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_CLASS_2, left: 0, top: 0, width: 250, height: 90, enableMask: false, 
    rowCount: 2, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_CLASS_3, description: DESC_GRID_SHAPE_CLASS_3, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_CLASS_3, left: 0, top: 0, width: 120, height: 80, enableMask: false, 
    rowCount: 1, columnCount: 1, fixedFirstRow: false, firstRowHeight: 0, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_CLASS_4, description: DESC_GRID_SHAPE_CLASS_4, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_CLASS_4, left: 0, top: 0, width: 120, height: 80, enableMask: false, 
    rowCount: 3, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_CLASS_5, description: DESC_GRID_SHAPE_CLASS_5, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_CLASS_5, left: 0, top: 0, width: 120, height: 80, enableMask: false, 
    rowCount: 2, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_INTERFACE, description: DESC_GRID_SHAPE_INTERFACE, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_INTERFACE, left: 0, top: 0, width: 250, height: 160, enableMask: false, 
    rowCount: 3, columnCount: 1, fixedFirstRow: true, firstRowHeight: 50, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_INTERFACE_2, description: DESC_GRID_SHAPE_INTERFACE_2, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_INTERFACE_2, left: 0, top: 0, width: 250, height: 100, enableMask: false, 
    rowCount: 2, columnCount: 1, fixedFirstRow: true, firstRowHeight: 50, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_INTERFACE_3, description: DESC_GRID_SHAPE_INTERFACE_3, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_INTERFACE_3, left: 0, top: 0, width: 120, height: 60, enableMask: false, 
    rowCount: 1, columnCount: 1, fixedFirstRow: false, firstRowHeight: 0, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_OBJECT, description: DESC_GRID_SHAPE_OBJECT, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_OBJECT, left: 0, top: 0, width: 120, height: 60, enableMask: false, 
    rowCount: 1, columnCount: 1, fixedFirstRow: false, firstRowHeight: 0, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_PACKAGE, description: DESC_GRID_SHAPE_PACKAGE, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_PACKAGE, left: 0, top: 0, width: 120, height: 100, enableMask: false, 
    rowCount: 2, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_PACKAGE_2, description: DESC_GRID_SHAPE_PACKAGE_2, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_PACKAGE_2, left: 0, top: 0, width: 120, height: 100, enableMask: false, 
    rowCount: 2, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_GRID_SHAPE_PACKAGE_3, description: DESC_GRID_SHAPE_PACKAGE_3, freeze: Shapes.FREEZE_NONE, text: TEXT_GRID_SHAPE_PACKAGE_3, left: 0, top: 0, width: 120, height: 100, enableMask: false, 
    rowCount: 2, columnCount: 1, fixedFirstRow: true, firstRowHeight: 32, fixedFirstColumn: false, firstColumnWidth: 0,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class UMLGridShape extends CustomTableEntity {
  private _customGridType: CustomTableType
  public constructor(left: number, top: number, width: number, height: number, gridShapeType: string) {
    super(left, top, width, height, 1, 1)
    this._customGridType = this.parseTableTypeInfo(gridShapeType)
    this.buildShape()
  }

  public buildShape() {    
    for(let i = 0; i < this._customGridType.rowCount - 1; i ++) {
      this.insertRowAfter(this.rowCount - 1)
    }
    for(let i = 0; i < this._customGridType.columnCount - 1; i ++) {
      this.insertColumnAfter(this.columnCount - 1)
    }
    this.boundary =  Rectangle.makeLTWH(0, 0, this._customGridType.width, this._customGridType.height)
    this.refreshGrid()
    switch(this._customGridType.name) {
      case TYPE_GRID_SHAPE_CLASS_2: {   
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        break;
      }
      case TYPE_GRID_SHAPE_CLASS_3: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        break;
      }
      case TYPE_GRID_SHAPE_CLASS_4: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        break;
      }
      case TYPE_GRID_SHAPE_CLASS_5: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        break;
      }
      case TYPE_GRID_SHAPE_OBJECT: {
        this.items[0].shape.text = 'Object'
        break;
      }
      case TYPE_GRID_SHAPE_INTERFACE: {
        this.items[0].shape.selectionStyle.italic = true
        this.items[0].shape.insert('<<interface>>\r\n')
        this.items[0].shape.selectionStyle.italic = false
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.insert('Interface')
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        this.items[2].textAlignment = TextAlignment.LEFT
        this.items[2].shape.text = ' + operation1(params): returnType\r\n + operation2(params)\r\n - operation3()'
        break;
      }
      case TYPE_GRID_SHAPE_INTERFACE_2: {
        this.items[0].shape.selectionStyle.italic = true
        this.items[0].shape.insert('<<interface>>\r\n')
        this.items[0].shape.selectionStyle.italic = false
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.insert('Interface')
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        break;
      }
      case TYPE_GRID_SHAPE_INTERFACE_3: {
        this.items[0].shape.selectionStyle.italic = true
        this.items[0].shape.insert('<<interface>>\r\n')
        this.items[0].shape.selectionStyle.italic = false
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.insert('Interface')
        break;
      }
      case TYPE_GRID_SHAPE_PACKAGE: {
        this.items[0].boundary = Rectangle.makeLTWH(this.items[0].left, this.items[0].top, 90, this.items[0].height)
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Package'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].textVerticalAlignment = TextVerticalAlignment.TOP
        break;
      }
      case TYPE_GRID_SHAPE_PACKAGE_2: {
        this.items[0].boundary = Rectangle.makeLTWH(this.items[0].left, this.items[0].top, 90, this.items[0].height)
        this.items[0].shape.selectionStyle.bold = true
        this.items[1].shape.selectionStyle.bold = true
        this.items[1].shape.text = 'Package'
        this.items[1].textVerticalAlignment = TextVerticalAlignment.TOP
        break;
      }
      case TYPE_GRID_SHAPE_PACKAGE_3: {
        this.items[0].boundary = Rectangle.makeLTWH(this.items[0].left, this.items[0].top, 90, this.items[0].height)
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Package'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = 'Attributes'
        this.items[1].textVerticalAlignment = TextVerticalAlignment.TOP
        break;
      }
      case TYPE_GRID_SHAPE_CLASS: 
      default: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        this.items[2].textAlignment = TextAlignment.LEFT
        this.items[2].shape.text = ' + operation1(params): returnType\r\n + operation2(params)\r\n - operation3()'
        break;
      }
    }

  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Table
    return shapeType
  } 

  public parseTableTypeInfo(gridShapeTypeName: string): CustomTableType {
    let result: CustomTableType = UMLGridShapeTypes[0]
    UMLGridShapeTypes.forEach((gridShapeType: CustomTableType) => {
      if(gridShapeType.name  == gridShapeTypeName) {
        result = gridShapeType
      }
    })
    return result 
  }

  private refreshGrid() {
    const cellWidth = (this._customGridType.fixedFirstColumn && this._customGridType.columnCount > 1) ? (this.width - this._customGridType.firstColumnWidth) / (this._customGridType.columnCount - 1) : this.width / this._customGridType.columnCount
    const cellHeight = (this._customGridType.fixedFirstRow && this._customGridType.rowCount > 1) ? (this.height - this._customGridType.firstRowHeight) / (this._customGridType.rowCount - 1) : this.height / this._customGridType.rowCount
    const firstRowHeight = this._customGridType.fixedFirstRow ? this._customGridType.firstRowHeight : cellHeight
    const firstColumnWidth = this._customGridType.fixedFirstColumn ? this._customGridType.firstColumnWidth : cellWidth
    let cellTop = 0
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      let cellLeft = 0
      for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
        const cell = this.items[this.columnCount * rowIndex + columnIndex]
        const theCellWidth = columnIndex == 0 ? firstColumnWidth : cellWidth
        const theCellHeight = rowIndex == 0 ? firstRowHeight : cellHeight
        cell.boundary = Rectangle.makeLTWH(Math.round(cellLeft), Math.round(cellTop), Math.round(theCellWidth), Math.round(theCellHeight))
        cellLeft += theCellWidth
      }
      cellTop += rowIndex == 0 ? firstRowHeight : cellHeight
    }
  }
}
