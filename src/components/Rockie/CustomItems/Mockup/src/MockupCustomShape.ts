import { Color, Colors, FontSlant, FontWeight, Graphics, ParagraphDirection, Rectangle, RoundRectangle, StrokeDashStyle, TextAlignment, TextDecoration, TextVerticalAlignment } from '@/components/Engine'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'
import { EntityShapeType } from '@/components/Rockie/Shapes/src/EntityShape'

export class MockupCustomShapes {
  public static TYPE_HEADER = 'Header'
  public static DESC_HEADER = 'Header'
  public static TEXT_HEADER = 'Header'
  public static TYPE_LABEL = 'Label'
  public static DESC_LABEL = 'Label'
  public static TEXT_LABEL = 'Label'
  public static TYPE_PARAGRAPH = 'Paragraph'
  public static DESC_PARAGRAPH = 'Paragraph'
  public static TEXT_PARAGRAPH = 'Content...'
  public static TYPE_LINK = 'Link'
  public static DESC_LINK = 'Link'
  public static TEXT_LINK = 'Link'
  public static TYPE_COMMENT = 'Comment'
  public static DESC_COMMENT = 'Comment'
  public static TEXT_COMMENT = ''
  public static TYPE_CALLOUT = 'Callout'
  public static DESC_CALLOUT = 'Callout'
  public static TEXT_CALLOUT = ''
  public static TYPE_PICTURE = 'Picture'
  public static DESC_PICTURE = 'Picture'
  public static TEXT_PICTURE = 'Picture'
  public static TYPE_VIDEO = 'Video'
  public static DESC_VIDEO = 'Video'
  public static TEXT_VIDEO = ''
  public static TYPE_HORIZONTAL_SCROLLBAR = 'Horizontal Scrollbar'
  public static DESC_HORIZONTAL_SCROLLBAR = 'Horizontal Scrollbar'
  public static TEXT_HORIZONTAL_SCROLLBAR = 'Horizontal Scrollbar'
  public static TYPE_VERTICAL_SCROLLBAR = 'Vertical Scrollbar'
  public static DESC_VERTICAL_SCROLLBAR = 'Vertical Scrollbar'
  public static TEXT_VERTICAL_SCROLLBAR = 'Vertical Scrollbar'
  public static TYPE_HORIZONTAL_LINE = 'Horizontal Line'
  public static DESC_HORIZONTAL_LINE = 'Horizontal Line'
  public static TEXT_HORIZONTAL_LINE = 'Horizontal Line'
  public static TYPE_VERTICAL_LINE = 'Vertical Line'
  public static DESC_VERTICAL_LINE = 'Vertical Line'
  public static TEXT_VERTICAL_LINE = 'Vertical Line'
  public static TYPE_LINE_CHART = 'Line Chart'
  public static DESC_LINE_CHART = 'Line Chart'
  public static TEXT_LINE_CHART = 'Line Chart'
  public static TYPE_PIE_CHART = 'Pie Chart'
  public static DESC_PIE_CHART = 'Pie Chart'
  public static TEXT_PIE_CHART = 'Pie Chart'
  public static TYPE_BAR_CHART = 'Bar Chart'
  public static DESC_BAR_CHART = 'Bar Chart'
  public static TEXT_BAR_CHART = 'Bar Chart'
  public static TYPE_COLUMN_CHART = 'Column Chart'
  public static DESC_COLUMN_CHART = 'Column Chart'
  public static TEXT_COLUMN_CHART = 'Column Chart'
}

export const MockupCustomShapeTypes = [
  {
    name: MockupCustomShapes.TYPE_HEADER, description: MockupCustomShapes.DESC_HEADER, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_HEADER, left: 0, top: 0, width: 120, height: 40, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_LABEL, description: MockupCustomShapes.DESC_LABEL, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_LABEL, left: 0, top: 0, width: 100, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_PARAGRAPH, description: MockupCustomShapes.DESC_PARAGRAPH, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_PARAGRAPH, left: 0, top: 0, width: 160, height: 80, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_LINK, description: MockupCustomShapes.DESC_LINK, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_LINK, left: 0, top: 0, width: 100, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_COMMENT, description: MockupCustomShapes.DESC_COMMENT, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_COMMENT, left: 0, top: 0, width: 120, height: 80, enableMask: false,
    modifiable: true, modifierX: 0.6, modifierY: 0.5, modifierStartX: 0.5, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_CALLOUT, description: MockupCustomShapes.DESC_CALLOUT, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_CALLOUT, left: 0, top: 0, width: 120, height: 60, enableMask: false,
    modifiable: true, modifierX: 0.3, modifierY: 0, modifierStartX: 0.3, modifierStartY: 0, modifierEndX: 0.7, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: true, controllerX: 0.4, controllerY: 0.4, controllerStartX: 0.7, controllerStartY: 0.7, controllerEndX: 1, controllerEndY: 1, controlInLine: false, controlInPercent: true,
    adaptable: true, adapterX: 0.1, adapterY: 0.7, adapterDirection: 'X', adapterSize: 0.4, adapterStartX: 0.3, adapterStartY: 0, adapterEndX: 0.7, adapterEndY: 0.3, adaptInLine: false, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_PICTURE, description: MockupCustomShapes.DESC_PICTURE, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_PICTURE, left: 0, top: 0, width: 280, height: 210, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_VIDEO, description: MockupCustomShapes.DESC_VIDEO, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_VIDEO, left: 0, top: 0, width: 280, height: 210, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class MockupCustomShape extends CustomEntity {

  public constructor(left: number, top: number, width: number, height: number, typeName: string) {
    super(left, top, width, height, '', { shapeType: typeName }, MockupCustomShapeTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: typeName })
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.initializeShape()
    this.strokeColor = Colors.Gray
    //Dark color
    this.secondFillColor = Colors.DimGray
    this.secondStrokeColor = Colors.DimGray
    //Light Color
    this.thirdStrokeColor = Colors.Gainsboro
    this.thirdFillColor = Colors.Gainsboro
    //Hightlight Color
    this.fourthStrokeColor = Colors.Blue
    this.fourthFillColor = Colors.Blue
  }

  public get types(): Type[] {
    return MockupCustomShapeTypes
  }

  private initializeShape() {
    switch (this._shape.typeInfo.name) {
      case MockupCustomShapes.TYPE_HEADER: {
        this.filled = false
        this.stroked = false
        this.fontWeight = FontWeight.BOLD
        this.fontSize = 26
        this.text = this._shape.typeInfo.text
        break;
      }
      case MockupCustomShapes.TYPE_LABEL: {
        this.filled = false
        this.stroked = false
        this.text = this._shape.typeInfo.text
        break;
      }
      case MockupCustomShapes.TYPE_PARAGRAPH: {
        this.filled = false
        this.stroked = false
        this.text = this._shape.typeInfo.text
        this.textAlignment = TextAlignment.LEFT
        this.textVerticalAlignment = TextVerticalAlignment.TOP
        break;
      }
      case MockupCustomShapes.TYPE_LINK: {
        this.filled = false
        this.stroked = false
        this.textDecoration = TextDecoration.UNDERLINE
        this.text = this._shape.typeInfo.text
        this.fontColor = Colors.Blue
        this.useTheme = false
        break;
      }
      case MockupCustomShapes.TYPE_COMMENT: {
        this.useTheme = false
        this.fillColor = new Color(255, 247, 189, 255)
        //this.strokeColor = strokeColor
        this.text = this._shape.typeInfo.text
        break;
      }
      case MockupCustomShapes.TYPE_CALLOUT: {
        this.text = this._shape.typeInfo.text
        break;
      }
      case MockupCustomShapes.TYPE_PICTURE: {
        this.text = this._shape.typeInfo.text
        break;
      }
      case MockupCustomShapes.TYPE_VIDEO: {
        this.text = this._shape.typeInfo.text
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
    let adapterWidth = theThis.adapter.x + theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if (theThis.typeInfo.modifyInPercent) {
      modifierWidth = theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) + theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight = theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) + theThis.typeInfo.modifierStart.y * theThis.height
    }
    if (theThis.typeInfo.controlInPercent) {
      controllerWidth = theThis.width * theThis.controller.x * (theThis.typeInfo.controllerEnd.x - theThis.typeInfo.controllerStart.x) + theThis.typeInfo.controllerStart.x * theThis.width
      controllerHeight = theThis.height * theThis.controller.y * (theThis.typeInfo.controllerEnd.y - theThis.typeInfo.controllerStart.y) + theThis.typeInfo.controllerStart.y * theThis.height
    }
    if (theThis.typeInfo.adaptInPercent) {
      adapterWidth = theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      adapterHeight = theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) + theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    theThis.path.reset()
    theThis.secondPath.reset()
    theThis.thirdPath.reset()
    theThis.fourthPath.reset()
    switch (theThis.typeInfo.name) {
      case MockupCustomShapes.TYPE_HEADER: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_LABEL: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_PARAGRAPH: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_LINK: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_COMMENT: {
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, this.height)
        theThis.path.lineTo(this.width, this.height)
        theThis.path.lineTo(this.width, modifierHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(modifierWidth, 0)
        theThis.path.lineTo(0, 0)
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(this.width, modifierHeight)
        theThis.path.lineTo(modifierWidth, 0)
        break;
      }
      case MockupCustomShapes.TYPE_CALLOUT: {
        theThis.textHeight = adapterHeight
        const arcWidth = this.width - controllerWidth
        const arcHeight = this.height - controllerHeight
        theThis.path.moveTo(0, adapterHeight + arcHeight)
        //theThis.path.addArc(Rectangle.makeLTWH(0, adapterHeight, arcWidth * 2, arcHeight * 2), 180, 90)
        //theThis.path.arcToRotated(arcWidth, adapterHeight + arcHeight, 90, true, false, arcWidth, adapterHeight)
        theThis.path.quadTo(0, adapterHeight, arcWidth, adapterHeight)
        //theThis.path.moveTo(arcWidth, adapterHeight)
        theThis.path.lineTo(adapterWidth, adapterHeight)
        theThis.path.lineTo(modifierWidth, modifierHeight)
        theThis.path.lineTo(adapterWidth + adapterSizeX, adapterHeight)
        theThis.path.lineTo(this.width - arcWidth, adapterHeight)
        //theThis.path.addArc(Rectangle.makeLTWH(this.width - arcWidth * 2, adapterHeight, arcWidth * 2, arcHeight * 2), 270, 90)
        //theThis.path.arcToRotated(this.width - arcWidth, adapterHeight + arcHeight, 90, true, false, this.width, adapterHeight + arcHeight)
        theThis.path.quadTo(this.width, adapterHeight, this.width, adapterHeight + arcHeight)
        theThis.path.lineTo(this.width, this.height - arcHeight)
        //theThis.path.addArc(Rectangle.makeLTWH(this.width - arcWidth * 2, this.height - arcHeight * 2, arcWidth * 2, arcHeight * 2), 0, 90)
        //theThis.path.arcToRotated(this.width - arcWidth, this.height - arcHeight, 90, true, false, this.width - arcWidth, this.height)
        theThis.path.quadTo(this.width, this.height, this.width - arcWidth, this.height)
        theThis.path.lineTo(arcWidth, this.height)
        //theThis.path.addArc(Rectangle.makeLTWH(0, this.height - arcHeight * 2, arcWidth * 2, arcHeight * 2), 90, 90)
        //theThis.path.arcToRotated(arcWidth, adapterHeight + arcHeight, 90, true, false, 0, this.height - arcHeight)
        theThis.path.quadTo(0, this.height, 0, this.height - arcHeight)
        theThis.path.lineTo(0, adapterHeight + arcHeight)

        break;
      }
      case MockupCustomShapes.TYPE_PICTURE: {
        theThis.secondPath.moveTo(theThis.width * 0.1, theThis.height * 0.85)
        theThis.secondPath.lineTo(theThis.width * 0.5, theThis.height * 0.4)
        theThis.secondPath.lineTo(theThis.width * 0.65, theThis.height * 0.5)
        theThis.secondPath.lineTo(theThis.width * 0.75, theThis.height * 0.2)
        theThis.secondPath.lineTo(theThis.width * 0.9, theThis.height * 0.85)
        theThis.secondPath.lineTo(theThis.width * 0.1, theThis.height * 0.85)
        theThis.secondPath.addOval(Rectangle.makeLTWH(theThis.width * 0.3, theThis.height * 0.2, theThis.width * 0.1, theThis.width * 0.1))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_VIDEO: {
        const videoWidth = 40 // theThis.width * 0.15
        const videoRegionHeight = theThis.height - 28 // theThis.height * 0.87
        const videoLeft = (theThis.width - videoWidth) * 0.5
        const videoTop = (videoRegionHeight - videoWidth) * 0.5
        const playWidth = 14 //theThis.width * 0.05
        const playLeft = 14 //theThis.width * 0.05
        const playTop = videoRegionHeight + (theThis.height - videoRegionHeight - playWidth) * 0.5
        const voiceRight = theThis.width - 14 //theThis.width * 0.95
        const voiceWidth = 14 //theThis.width * 0.05
        const voiceLeft = voiceRight - voiceWidth
        const voiceTop = videoRegionHeight + (theThis.height - videoRegionHeight - voiceWidth) * 0.5
        const seperatorHeight = 0.1
        const progressLeft = theThis.width - playWidth - playLeft - 12
        const progressHeight = 6
        const progressWidth = theThis.width - progressLeft * 2
        const progressTop = videoRegionHeight + (theThis.height - videoRegionHeight - progressHeight) * 0.5
        //Light Color
        theThis.thirdStroke.setColor(Colors.DimGray)
        theThis.thirdStroke.setStrokeWidth(2)
        theThis.thirdFill.setColor(Colors.White)
        const indicatorLeft = progressLeft + progressWidth * 0.5
        const indicatorWidth = 14
        const indicatorTop = videoRegionHeight + (theThis.height - videoRegionHeight - indicatorWidth) * 0.5
        theThis.secondPath.moveTo(videoLeft, videoTop)
        theThis.secondPath.lineTo(videoLeft, videoTop + videoWidth)
        theThis.secondPath.lineTo(videoLeft + videoWidth, videoTop + videoWidth * 0.5)
        theThis.secondPath.lineTo(videoLeft, videoTop)
        theThis.secondPath.moveTo(playLeft, playTop)
        theThis.secondPath.lineTo(playLeft, playTop + playWidth)
        theThis.secondPath.lineTo(playLeft + playWidth, playTop + playWidth * 0.5)
        theThis.secondPath.lineTo(playLeft, voiceTop)
        theThis.secondPath.moveTo(voiceLeft, voiceTop + voiceWidth * 0.25)
        theThis.secondPath.lineTo(voiceLeft, voiceTop + voiceWidth * 0.75)
        theThis.secondPath.lineTo(voiceLeft + voiceWidth * 0.6, voiceTop + voiceWidth * 0.75)
        theThis.secondPath.lineTo(voiceLeft + voiceWidth, voiceTop + voiceWidth)
        theThis.secondPath.lineTo(voiceLeft + voiceWidth, voiceTop)
        theThis.secondPath.lineTo(voiceLeft + voiceWidth * 0.6, voiceTop + voiceWidth * 0.25)
        theThis.secondPath.lineTo(voiceLeft, voiceTop + voiceWidth * 0.25)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(progressLeft, progressTop, progressWidth, progressHeight))
        theThis.thirdPath.addOval(Rectangle.makeLTWH(indicatorLeft, indicatorTop, indicatorWidth, indicatorWidth))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, videoRegionHeight, theThis.width, seperatorHeight))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
    }
  }

  protected parseHeaderShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }

}
