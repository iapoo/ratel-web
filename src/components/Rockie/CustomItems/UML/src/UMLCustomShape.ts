import { Colors, FontSlant, FontWeight, Graphics, ParagraphDirection, Rectangle, StrokeDashStyle, TextDecoration } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

export class UMLCustomShapes {
  public static TYPE_ACTOR_LIFELINE = 'Actor Lifeline'
  public static DESC_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TEXT_ACTOR_LIFELINE = 'Actor Lifeline'
  public static TYPE_OBJECT_LIFELINE = 'Object Lifeline'
  public static DESC_OBJECT_LIFELINE = 'Object Lifeline'
  public static TEXT_OBJECT_LIFELINE = 'Object'
  public static TYPE_ACTIVATION = 'Activation'
  public static DESC_ACTIVATION = 'Activation'
  public static TEXT_ACTIVATION = 'Activation'
  public static TYPE_FINAL_NODE = 'Final Node'
  public static DESC_FINAL_NODE = 'Final Node'
  public static TEXT_FINAL_NODE = ''
  public static TYPE_NODE = 'Node'
  public static DESC_NODE = 'Node'
  public static TEXT_NODE = 'Node'
  public static TYPE_NODE_2 = 'Node 2'
  public static DESC_NODE_2 = 'Node 2'
  public static TEXT_NODE_2 = 'Node'
  public static TYPE_MODULE = 'Module'
  public static DESC_MODULE = 'Module'
  public static TEXT_MODULE = 'Module'
  public static TYPE_COMPONENT = 'Component'
  public static DESC_COMPONENT = 'Component'
  public static TEXT_COMPONENT = 'Component'
  public static TYPE_LOLLIPOP_NOTATION = 'Lollipop Notation'
  public static DESC_LOLLIPOP_NOTATION = 'Lollipop Notation'
  public static TEXT_LOLLIPOP_NOTATION = 'Lollipop Notation'
  public static TYPE_REQUIRED_INTERFACE = 'Required Interface'
  public static DESC_REQUIRED_INTERFACE = 'Required Interface'
  public static TEXT_REQUIRED_INTERFACE = 'Required Interface'
}

export const UMLCustomShapeTypes = [
  { name: UMLCustomShapes.TYPE_ACTOR_LIFELINE, description: UMLCustomShapes.DESC_ACTOR_LIFELINE, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_ACTOR_LIFELINE, left: 0, top: 0, width: 20, height: 200, enableMask: true, 
    modifiable: true, modifierX: 0, modifierY: 40, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomShapes.TYPE_OBJECT_LIFELINE, description: UMLCustomShapes.DESC_OBJECT_LIFELINE, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_OBJECT_LIFELINE, left: 0, top: 0, width: 80, height: 200, enableMask: false, 
    modifiable: true, modifierX: 0, modifierY: 40, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomShapes.TYPE_ACTIVATION, description: UMLCustomShapes.DESC_ACTIVATION, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_ACTIVATION, left: 0, top: 0, width: 20, height: 80, enableMask: false, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomShapes.TYPE_FINAL_NODE, description: UMLCustomShapes.DESC_FINAL_NODE, freeze: Shapes.FREEZE_ASPECT_RATIO , text: UMLCustomShapes.TEXT_FINAL_NODE, left: 0, top: 0, width: 40, height: 40,  enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true },
  { name: UMLCustomShapes.TYPE_NODE, description: UMLCustomShapes.DESC_NODE, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_NODE, left: 0, top: 0, width: 120, height: 100, enableMask: false,
    modifiable: true, modifierX: 0.85, modifierY: 0.15, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: UMLCustomShapes.TYPE_NODE_2, description: UMLCustomShapes.DESC_NODE_2, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_NODE_2, left: 0, top: 0, width: 120, height: 100,  enableMask: false,
    modifiable: true, modifierX: 0.85, modifierY: 0.15, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 1, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true  },
  { name: UMLCustomShapes.TYPE_MODULE, description: UMLCustomShapes.DESC_MODULE, freeze: Shapes.FREEZE_ASPECT_RATIO , text: UMLCustomShapes.TEXT_MODULE, left: 0, top: 0, width: 120, height: 60,  enableMask: false,
    modifiable: true, modifierX: 0.2, modifierY: 0.5, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 1, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true },
  { name: UMLCustomShapes.TYPE_COMPONENT, description: UMLCustomShapes.DESC_COMPONENT, freeze: Shapes.FREEZE_ASPECT_RATIO , text: UMLCustomShapes.TEXT_COMPONENT, left: 0, top: 0, width: 180, height: 100,  enableMask: false,
    modifiable: true, modifierX: 0.5, modifierY: 0.5, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true },
  { name: UMLCustomShapes.TYPE_LOLLIPOP_NOTATION, description: UMLCustomShapes.DESC_LOLLIPOP_NOTATION, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_LOLLIPOP_NOTATION, left: 0, top: 0, width: 80, height: 40, enableMask: true, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
  { name: UMLCustomShapes.TYPE_REQUIRED_INTERFACE, description: UMLCustomShapes.DESC_REQUIRED_INTERFACE, freeze: Shapes.FREEZE_NONE, text: UMLCustomShapes.TEXT_REQUIRED_INTERFACE, left: 0, top: 0, width: 60, height: 40, enableMask: true, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true},
]

export class UMLCustomShape extends CustomEntity {
  
  public constructor(left: number, top: number, width: number, height: number, typeName: string) {
    super(left, top, width, height, '', {shapeType: typeName}, UMLCustomShapeTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: typeName})
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.initializeShape()
  }

  public get types(): Type[] {
    return UMLCustomShapeTypes
  }

  private initializeShape() {
    switch(this._shape.typeInfo.name) {
      case UMLCustomShapes.TYPE_ACTOR_LIFELINE: {        
        break;
      }
      case UMLCustomShapes.TYPE_OBJECT_LIFELINE: {
        this.text = this._shape.typeInfo.text
        break;
      }
      case UMLCustomShapes.TYPE_ACTIVATION: {
        break;
      }
      case UMLCustomShapes.TYPE_FINAL_NODE: {
        break;
      }
      case UMLCustomShapes.TYPE_NODE: {
        this.fontWeight = FontWeight.BOLD
        this.text = this._shape.typeInfo.text
        break;
      }
      case UMLCustomShapes.TYPE_NODE_2: {
        this.fontWeight = FontWeight.BOLD
        this.textDecoration = TextDecoration.UNDERLINE
        this.text = this._shape.typeInfo.text
        break;
      }
      case UMLCustomShapes.TYPE_MODULE: {
        this.fontWeight = FontWeight.BOLD
        this.text = this._shape.typeInfo.text
        break;
      }
      case UMLCustomShapes.TYPE_COMPONENT: {
        this.shape.selectionStyle.italic = true
        this.shape.insert('<<Annotation>>\r\n')
        this.shape.selectionStyle.italic = false
        this.shape.selectionStyle.bold = true
        this.shape.insert('Component')
        break;
      }
      default:
        break;
    }
  }

  public buildShape(theThis: CustomShape) {
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let controllerWidth = theThis.controller.x + theThis.typeInfo.controllerStart.x * theThis.width
    let controllerHeight = theThis.controller.y + theThis.typeInfo.controllerStart.y * theThis.height
    let adapterWidth = theThis.adapter.x +theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if(theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if(theThis.typeInfo.controlInPercent) {
      controllerWidth = theThis.width * theThis.controller.x * (theThis.typeInfo.controllerEnd.x - theThis.typeInfo.controllerStart.x) + theThis.typeInfo.controllerStart.x * theThis.width
      controllerHeight = theThis.height * theThis.controller.y * (theThis.typeInfo.controllerEnd.y - theThis.typeInfo.controllerStart.y) + theThis.typeInfo.controllerStart.y * theThis.height
    }
    if(theThis.typeInfo.adaptInPercent) {
      adapterWidth = theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      adapterHeight = theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) + theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    theThis.path.reset()
    theThis.secondPath.reset()
    switch(theThis.typeInfo.name) {
      case UMLCustomShapes.TYPE_ACTOR_LIFELINE: {
        theThis.textHeight = modifierHeight
        theThis.path.addOval(Rectangle.makeLTWH(theThis.width * 0.25, 0, theThis.width * 0.5, modifierHeight * 0.25))
        theThis.path.moveTo(0, modifierHeight / 3)
        theThis.path.lineTo(theThis.width, modifierHeight / 3)
        theThis.path.close()
        theThis.path.moveTo(theThis.width * 0.5, modifierHeight * 0.25)
        theThis.path.lineTo(theThis.width * 0.5, modifierHeight * 2 / 3)
        theThis.path.close()
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(theThis.width * 0.5, modifierHeight * 2 / 3)
        theThis.path.lineTo(theThis.width, modifierHeight)
        theThis.path.lineTo(theThis.width * 0.5, modifierHeight * 2 / 3)
        theThis.path.lineTo(0, modifierHeight)
        theThis.secondStroke.setStrokeDashStyle(StrokeDashStyle.DASH)
        theThis.secondPath.moveTo(theThis.width / 2, modifierHeight)
        theThis.secondPath.lineTo(theThis.width / 2, theThis.height)
        break;
      }
      case UMLCustomShapes.TYPE_OBJECT_LIFELINE: {
        theThis.textHeight = modifierHeight
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, modifierHeight))
        theThis.secondStroke.setStrokeDashStyle(StrokeDashStyle.DASH)
        theThis.secondPath.moveTo(theThis.width / 2, modifierHeight)
        theThis.secondPath.lineTo(theThis.width / 2, theThis.height)
        break;
      }
      case UMLCustomShapes.TYPE_ACTIVATION: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case UMLCustomShapes.TYPE_FINAL_NODE: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.path.addOval(Rectangle.makeLTWH(theThis.width * 0.1, theThis.width * 0.1, theThis.width * 0.8, theThis.height * 0.8))
        break;
      }
      case UMLCustomShapes.TYPE_NODE_2:
      case UMLCustomShapes.TYPE_NODE: {
        theThis.textTop = modifierHeight
        theThis.textWidth = modifierWidth
        theThis.textHeight = this.height - modifierHeight
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(theThis.width - modifierWidth, 0)
        theThis.path.lineTo(theThis.width, 0)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth, theThis.height)
        theThis.path.lineTo(theThis.width, theThis.height - modifierHeight)
        theThis.path.lineTo(theThis.width, 0)
        theThis.path.addRectangle(Rectangle.makeLTWH(0, modifierHeight, modifierWidth, this.height - modifierHeight))
        break;
      }
      case UMLCustomShapes.TYPE_MODULE: {
        theThis.textLeft = modifierWidth * 2
        theThis.textWidth = this.width - modifierWidth * 2
        const top =  modifierHeight <= this.height / 2 ? modifierHeight * 0.4 : this.height - (this.height - modifierHeight) * 0.4 * 4
        const height = modifierHeight <= this.height / 2 ? modifierHeight * 0.4 : (this.height - modifierHeight) * 0.4
        theThis.path.addRectangle(Rectangle.makeLTWH(0, top, modifierWidth * 2, height))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, top + height * 2, modifierWidth * 2, height))
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(modifierWidth, top)
        theThis.path.moveTo(modifierWidth, top + height)
        theThis.path.lineTo(modifierWidth, top + height * 2)
        theThis.path.moveTo(modifierWidth, top + height * 3)
        theThis.path.lineTo(modifierWidth, this.height)
        theThis.path.lineTo(this.width, this.height)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(modifierWidth, 0)
        break;
      }
      case UMLCustomShapes.TYPE_COMPONENT: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width , this.height))
        const moduleLeft = modifierWidth + (this.width - modifierWidth) * 0.1
        const moduleTop = modifierHeight * 0.2
        const moduleWidth = (this.width - modifierWidth) * 0.8
        const moduleHeight = modifierHeight * 0.8
        const height = moduleHeight * 0.2
        const width = moduleWidth * 0.2
        // theThis.path.addRectangle(Rectangle.makeLTWH(moduleLeft + width * 0.5, moduleTop, moduleWidth  - width * 0.5 , moduleHeight))
        theThis.path.addRectangle(Rectangle.makeLTWH(moduleLeft, moduleTop + height, width, height))
        theThis.path.addRectangle(Rectangle.makeLTWH(moduleLeft, moduleTop + height * 3, width, height))
        theThis.path.moveTo(moduleLeft + width * 0.5, moduleTop)
        theThis.path.lineTo(moduleLeft + width * 0.5, moduleTop + height)
        theThis.path.moveTo(moduleLeft + width * 0.5, moduleTop + height * 2)
        theThis.path.lineTo(moduleLeft + width * 0.5, moduleTop + height * 3)
        theThis.path.moveTo(moduleLeft + width * 0.5, moduleTop + height * 4)
        theThis.path.lineTo(moduleLeft + width * 0.5, moduleTop + moduleHeight)
        theThis.path.lineTo(moduleLeft + moduleWidth,  moduleTop + moduleHeight)
        theThis.path.lineTo(moduleLeft + moduleWidth, moduleTop)
        theThis.path.lineTo(moduleLeft + width * 0.5, moduleTop)
        break;
      }
      case UMLCustomShapes.TYPE_LOLLIPOP_NOTATION: {
        if(this.width > this.height) {
          theThis.path.addOval(Rectangle.makeLTWH(theThis.width * 0.5 - theThis.height * 0.25, theThis.height * 0.25, theThis.height * 0.5, theThis.height * 0.5))
          theThis.path.addArc(Rectangle.makeLTWH(this.width * 0.5 - theThis.height * 0.5, 0, theThis.height, theThis.height), 270, 180)
          theThis.path.moveTo(0, theThis.height * 0.5)
          theThis.path.lineTo(theThis.width * 0.5 - theThis.height * 0.25, theThis.height * 0.5)
          theThis.path.moveTo(theThis.width * 0.5 + theThis.height * 0.5, theThis.height * 0.5)
          theThis.path.lineTo(theThis.width, theThis.height * 0.5)
        } else if(this.width > this.height * 0.5) {
          theThis.path.addOval(Rectangle.makeLTWH(theThis.width * 0.5 - theThis.height * 0.25, theThis.height * 0.25, theThis.height * 0.5, theThis.height * 0.5))
          theThis.path.moveTo(0, theThis.height * 0.5)
          theThis.path.lineTo(theThis.width * 0.5 - theThis.height * 0.25, theThis.height * 0.5)
          //Ref to: https://www.ibashu.cn/news/show_261576.html
          //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
          let k = this.width  * 0.5 / 0.75
          theThis.path.moveTo(this.width * 0.5, 0)
          theThis.path.cubicTo(this.width *  0.5 + k, 0, this.width * 0.5 + k, this.height, this.width * 0.5, this.height)
        } else {
          theThis.path.addOval(Rectangle.makeLTWH(0, theThis.height * 0.25, theThis.width, theThis.height * 0.5))
          //Ref to: https://www.ibashu.cn/news/show_261576.html
          //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
          let k = this.width  * 0.5 / 0.75
          theThis.path.moveTo(this.width * 0.5, 0)
          theThis.path.cubicTo(this.width *  0.5 + k, 0, this.width * 0.5 + k, this.height, this.width * 0.5, this.height)
        }
        break;
      }
      case UMLCustomShapes.TYPE_REQUIRED_INTERFACE: {
        if (this.width > this.height * 0.5) {
          theThis.path.moveTo(theThis.height * 0.5, theThis.height * 0.5)
          theThis.path.lineTo(theThis.width, theThis.height * 0.5)
          //Ref to: https://www.ibashu.cn/news/show_261576.html
          //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
          let k = this.height * 0.5 / 0.75
          theThis.path.moveTo(0, 0)
          theThis.path.cubicTo(k, 0, k, this.height, 0, this.height)
        } else {
          //Ref to: https://www.ibashu.cn/news/show_261576.html
          //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
          let k = this.width / 0.75
          theThis.path.moveTo(0, 0)
          theThis.path.cubicTo(k, 0, k, this.height, 0, this.height)
        }
        break;
      }
    }
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
