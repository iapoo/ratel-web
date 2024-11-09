import { Rectangle, TextAlignment, TextVerticalAlignment } from '@ratel-web/engine'
import { CustomTableEntity, CustomTableType, ShapeConstants } from '../../../Items'
import { EntityShapeType } from '../../../Shapes'

const TYPE_CUSTOM_TABLE__CLASS = 'Class'
const DESC_CUSTOM_TABLE__CLASS = 'Class'
const TEXT_CUSTOM_TABLE__CLASS = 'Class'
const TYPE_CUSTOM_TABLE__CLASS_2 = 'Class 2'
const DESC_CUSTOM_TABLE__CLASS_2 = 'Class 2'
const TEXT_CUSTOM_TABLE__CLASS_2 = 'Class 2'
const TYPE_CUSTOM_TABLE__CLASS_3 = 'Class 3'
const DESC_CUSTOM_TABLE__CLASS_3 = 'Class 3'
const TEXT_CUSTOM_TABLE__CLASS_3 = 'Class 3'
const TYPE_CUSTOM_TABLE__CLASS_4 = 'Class 4'
const DESC_CUSTOM_TABLE__CLASS_4 = 'Class 4'
const TEXT_CUSTOM_TABLE__CLASS_4 = 'Class 4'
const TYPE_CUSTOM_TABLE__CLASS_5 = 'Class 5'
const DESC_CUSTOM_TABLE__CLASS_5 = 'Class 5'
const TEXT_CUSTOM_TABLE__CLASS_5 = 'Class 5'
const TYPE_CUSTOM_TABLE__OBJECT = 'Object'
const DESC_CUSTOM_TABLE__OBJECT = 'Object'
const TEXT_CUSTOM_TABLE__OBJECT = 'Object'
const TYPE_CUSTOM_TABLE__OBJECT_2 = 'Object 2'
const DESC_CUSTOM_TABLE__OBJECT_2 = 'Object 2'
const TEXT_CUSTOM_TABLE__OBJECT_2 = 'Object 2'
const TYPE_CUSTOM_TABLE__OBJECT_3 = 'Object 3'
const DESC_CUSTOM_TABLE__OBJECT_3 = 'Object 3'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TEXT_CUSTOM_TABLE__OBJECT_3 = 'Object 3'
const TYPE_CUSTOM_TABLE__INTERFACE = 'Interface'
const DESC_CUSTOM_TABLE__INTERFACE = 'Interface'
const TEXT_CUSTOM_TABLE__INTERFACE = 'Interface'
const TYPE_CUSTOM_TABLE__INTERFACE_2 = 'Interface 2'
const DESC_CUSTOM_TABLE__INTERFACE_2 = 'Interface 2'
const TEXT_CUSTOM_TABLE__INTERFACE_2 = 'Interface 2'
const TYPE_CUSTOM_TABLE__INTERFACE_3 = 'Interface 3'
const DESC_CUSTOM_TABLE__INTERFACE_3 = 'Interface 3'
const TEXT_CUSTOM_TABLE__INTERFACE_3 = 'Interface 3'
const TYPE_CUSTOM_TABLE__PACKAGE = 'Package'
const DESC_CUSTOM_TABLE__PACKAGE = 'Package'
const TEXT_CUSTOM_TABLE__PACKAGE = 'Package'
const TYPE_CUSTOM_TABLE__PACKAGE_2 = 'Package 2'
const DESC_CUSTOM_TABLE__PACKAGE_2 = 'Package 2'
const TEXT_CUSTOM_TABLE__PACKAGE_2 = 'Package 2'
const TYPE_CUSTOM_TABLE__PACKAGE_3 = 'Package 3'
const DESC_CUSTOM_TABLE__PACKAGE_3 = 'Package 3'
const TEXT_CUSTOM_TABLE__PACKAGE_3 = 'Package 3'

export const UMLCustomTableTypes: CustomTableType[] = [
  {
    name: TYPE_CUSTOM_TABLE__CLASS,
    description: DESC_CUSTOM_TABLE__CLASS,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__CLASS,
    left: 0,
    top: 0,
    width: 250,
    height: 160,
    enableMask: false,
    rowCount: 3,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 32,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__CLASS_2,
    description: DESC_CUSTOM_TABLE__CLASS_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__CLASS_2,
    left: 0,
    top: 0,
    width: 250,
    height: 90,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 32,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__CLASS_3,
    description: DESC_CUSTOM_TABLE__CLASS_3,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__CLASS_3,
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    rowCount: 1,
    columnCount: 1,
    fixedFirstRow: false,
    firstRowHeight: 0,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__CLASS_4,
    description: DESC_CUSTOM_TABLE__CLASS_4,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__CLASS_4,
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    rowCount: 3,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 32,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__CLASS_5,
    description: DESC_CUSTOM_TABLE__CLASS_5,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__CLASS_5,
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 32,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__INTERFACE,
    description: DESC_CUSTOM_TABLE__INTERFACE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__INTERFACE,
    left: 0,
    top: 0,
    width: 250,
    height: 160,
    enableMask: false,
    rowCount: 3,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 50,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__INTERFACE_2,
    description: DESC_CUSTOM_TABLE__INTERFACE_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__INTERFACE_2,
    left: 0,
    top: 0,
    width: 250,
    height: 100,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 50,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__INTERFACE_3,
    description: DESC_CUSTOM_TABLE__INTERFACE_3,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__INTERFACE_3,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    rowCount: 1,
    columnCount: 1,
    fixedFirstRow: false,
    firstRowHeight: 0,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__OBJECT,
    description: DESC_CUSTOM_TABLE__OBJECT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__OBJECT,
    left: 0,
    top: 0,
    width: 140,
    height: 60,
    enableMask: false,
    rowCount: 1,
    columnCount: 1,
    fixedFirstRow: false,
    firstRowHeight: 0,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__OBJECT_2,
    description: DESC_CUSTOM_TABLE__OBJECT_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__OBJECT_2,
    left: 0,
    top: 0,
    width: 140,
    height: 80,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 50,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__OBJECT_3,
    description: DESC_CUSTOM_TABLE__OBJECT_3,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__OBJECT_2,
    left: 0,
    top: 0,
    width: 140,
    height: 80,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 50,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__PACKAGE,
    description: DESC_CUSTOM_TABLE__PACKAGE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__PACKAGE,
    left: 0,
    top: 0,
    width: 120,
    height: 100,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 32,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__PACKAGE_2,
    description: DESC_CUSTOM_TABLE__PACKAGE_2,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__PACKAGE_2,
    left: 0,
    top: 0,
    width: 120,
    height: 100,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 32,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_CUSTOM_TABLE__PACKAGE_3,
    description: DESC_CUSTOM_TABLE__PACKAGE_3,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_CUSTOM_TABLE__PACKAGE_3,
    left: 0,
    top: 0,
    width: 120,
    height: 100,
    enableMask: false,
    rowCount: 2,
    columnCount: 1,
    fixedFirstRow: true,
    firstRowHeight: 32,
    fixedFirstColumn: false,
    firstColumnWidth: 0,
    modifiable: false,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
]

export class UMLCustomTable extends CustomTableEntity {
  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    customTableType: string,
    customTableTypeInfos: CustomTableType[],
  ) {
    super(left, top, width, height, customTableType, customTableTypeInfos, 1, 1)
    this.buildShape()
  }

  public buildShape() {
    for (let i = 0; i < this.customTableeType.rowCount - 1; i++) {
      this.insertRowAfter(this.rowCount - 1, false)
    }
    for (let i = 0; i < this.customTableeType.columnCount - 1; i++) {
      this.insertColumnAfter(this.columnCount - 1, false)
    }
    //this.boundary =  Rectangle.makeLTWH(0, 0, this.width, this.height)
    this.refreshGrid()
    switch (this.customTableeType.name) {
      case TYPE_CUSTOM_TABLE__CLASS_2: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        break
      }
      case TYPE_CUSTOM_TABLE__CLASS_3: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        break
      }
      case TYPE_CUSTOM_TABLE__CLASS_4: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        break
      }
      case TYPE_CUSTOM_TABLE__CLASS_5: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        break
      }
      case TYPE_CUSTOM_TABLE__OBJECT: {
        this.items[0].shape.selectionStyle.underline = true
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Object'
        break
      }
      case TYPE_CUSTOM_TABLE__OBJECT_2: {
        this.items[0].shape.selectionStyle.underline = true
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Object:Class'
        break
      }
      case TYPE_CUSTOM_TABLE__OBJECT_3: {
        this.items[0].shape.selectionStyle.underline = true
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Object:Class'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute = data'
        break
      }
      case TYPE_CUSTOM_TABLE__INTERFACE: {
        this.items[0].shape.selectionStyle.italic = true
        this.items[0].shape.insert('<<interface>>\r\n')
        this.items[0].shape.selectionStyle.italic = false
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.insert('Interface')
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        this.items[2].textAlignment = TextAlignment.LEFT
        this.items[2].shape.text = ' + operation1(params): returnType\r\n + operation2(params)\r\n - operation3()'
        break
      }
      case TYPE_CUSTOM_TABLE__INTERFACE_2: {
        this.items[0].shape.selectionStyle.italic = true
        this.items[0].shape.insert('<<interface>>\r\n')
        this.items[0].shape.selectionStyle.italic = false
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.insert('Interface')
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        break
      }
      case TYPE_CUSTOM_TABLE__INTERFACE_3: {
        this.items[0].shape.selectionStyle.italic = true
        this.items[0].shape.insert('<<interface>>\r\n')
        this.items[0].shape.selectionStyle.italic = false
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.insert('Interface')
        break
      }
      case TYPE_CUSTOM_TABLE__PACKAGE: {
        this.items[0].boundary = Rectangle.makeLTWH(this.items[0].left, this.items[0].top, 90, this.items[0].height)
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Package'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].textVerticalAlignment = TextVerticalAlignment.TOP
        break
      }
      case TYPE_CUSTOM_TABLE__PACKAGE_2: {
        this.items[0].boundary = Rectangle.makeLTWH(this.items[0].left, this.items[0].top, 90, this.items[0].height)
        this.items[0].shape.selectionStyle.bold = true
        this.items[1].shape.selectionStyle.bold = true
        this.items[1].shape.text = 'Package'
        this.items[1].textVerticalAlignment = TextVerticalAlignment.TOP
        break
      }
      case TYPE_CUSTOM_TABLE__PACKAGE_3: {
        this.items[0].boundary = Rectangle.makeLTWH(this.items[0].left, this.items[0].top, 90, this.items[0].height)
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Package'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = 'Attributes'
        this.items[1].textVerticalAlignment = TextVerticalAlignment.TOP
        break
      }
      case TYPE_CUSTOM_TABLE__CLASS:
      default: {
        this.items[0].shape.selectionStyle.bold = true
        this.items[0].shape.text = 'Class Name'
        this.items[1].textAlignment = TextAlignment.LEFT
        this.items[1].shape.text = ' + attribute1: Type\r\n + attribute2: Type\r\n - attribute3: Type'
        this.items[2].textAlignment = TextAlignment.LEFT
        this.items[2].shape.text = ' + operation1(params): returnType\r\n + operation2(params)\r\n - operation3()'
        break
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Table
    return shapeType
  }

  private refreshGrid() {
    const cellWidth =
      this.customTableeType.fixedFirstColumn && this.customTableeType.columnCount > 1
        ? (this.width - this.customTableeType.firstColumnWidth) / (this.customTableeType.columnCount - 1)
        : this.width / this.customTableeType.columnCount
    const cellHeight =
      this.customTableeType.fixedFirstRow && this.customTableeType.rowCount > 1
        ? (this.height - this.customTableeType.firstRowHeight) / (this.customTableeType.rowCount - 1)
        : this.height / this.customTableeType.rowCount
    const firstRowHeight = this.customTableeType.fixedFirstRow ? this.customTableeType.firstRowHeight : cellHeight
    const firstColumnWidth = this.customTableeType.fixedFirstColumn ? this.customTableeType.firstColumnWidth : cellWidth
    let cellTop = 0
    for (let rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
      let cellLeft = 0
      for (let columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
        const cell = this.items[this.columnCount * rowIndex + columnIndex]
        const theCellWidth = columnIndex === 0 ? firstColumnWidth : cellWidth
        const theCellHeight = rowIndex === 0 ? firstRowHeight : cellHeight
        cell.boundary = Rectangle.makeLTWH(
          Math.round(cellLeft),
          Math.round(cellTop),
          Math.round(theCellWidth),
          Math.round(theCellHeight),
        )
        cellLeft += theCellWidth
      }
      cellTop += rowIndex === 0 ? firstRowHeight : cellHeight
    }
  }
}
