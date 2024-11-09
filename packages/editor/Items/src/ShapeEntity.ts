/* eslint-disable max-params */
import { Point2, Rectangle, Rotation } from '@ratel-web/engine'
import { Editor } from '../../Editor'
import { AdapterDirection, EntityShape, EntityShapeFreezeType, EntityShapeType, ShapeTypeInfo } from '../../Shapes'
import { CommonUtils } from '../../Utils'
import { EditorItemInfo } from './EditorItemInfo'
import { Entity } from './Entity'
import { Categories, Type } from './Item'
import { ShapeInfo } from './ShapeInfo'

export class ShapeConstants {
  public static TYPE_RECTANGLE = 'Rectangle'
  public static TYPE_ROUND_RECTANGLE = 'Round Rectangle'
  public static TYPE_TEXT = 'Text'
  public static TYPE_ELLIPSE = 'Ellipse'
  public static TYPE_SQUARE = 'Square'
  public static TYPE_CIRCLE = 'Circle'
  public static TYPE_PROCESS = 'Process'
  public static TYPE_DIAMOND = 'Diamond'
  public static TYPE_PARALLELOGRAM = 'Parallelogram'
  public static TYPE_HEXAGON = 'Hexagon'
  public static TYPE_TRIANGLE = 'Triangle'
  public static TYPE_CYLINDER = 'Cylinder'
  public static TYPE_CLOUD = 'Cloud'
  public static TYPE_DOCUMENT = 'Document'
  public static TYPE_INTERNAL_STORAGE = 'Internal Storage'
  public static TYPE_CUBE = 'Cube'
  public static TYPE_STEP = 'Step'
  public static TYPE_TRAPEZOID = 'Trapezoid'
  public static TYPE_TAPE = 'Tape'
  public static TYPE_NOTE = 'Note'
  public static TYPE_CARD = 'Card'
  public static TYPE_CALLOUT = 'Callout'
  public static TYPE_ACTOR = 'Actor'

  public static DESC_RECTANGLE = 'Rectangle'
  public static DESC_ROUND_RECTANGLE = 'Round Rectangle'
  public static DESC_TEXT = 'Text'
  public static DESC_ELLIPSE = 'Ellipse'
  public static DESC_SQUARE = 'Square'
  public static DESC_CIRCLE = 'Circle'
  public static DESC_PROCESS = 'Process'
  public static DESC_DIAMOND = 'Diamond'
  public static DESC_PARALLELOGRAM = 'Parallelogram'
  public static DESC_HEXAGON = 'Hexagon'
  public static DESC_TRIANGLE = 'Triangle'
  public static DESC_CYLINDER = 'Cylinder'
  public static DESC_CLOUD = 'Cloud'
  public static DESC_DOCUMENT = 'Document'
  public static DESC_INTERNAL_STORAGE = 'Internal Storage'
  public static DESC_CUBE = 'Cube'
  public static DESC_STEP = 'Step'
  public static DESC_TRAPEZOID = 'Trapezoid'
  public static DESC_TAPE = 'Tape'
  public static DESC_NOTE = 'Note'
  public static DESC_CARD = 'Card'
  public static DESC_CALLOUT = 'Callout'
  public static DESC_ACTOR = 'Actor'

  public static FREEZE_NONE = 'None'
  public static FREEZE_WIDTH = 'Width'
  public static FREEZE_WIDTH_HEIGHT = 'WidthHeight'
  public static FREEZE_HEIGHT = 'Height'
  public static FREEZE_ASPECT_RATIO = 'AspectRatio'

  public static ADAPTER_DIRECTION_X = 'X'
  public static ADAPTER_DIRECTION_Y = 'Y'
}

export interface ShapeType {
  name: string
  description: string
  freeze: string
  text: string
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

export const ShapeTypes = [
  {
    name: ShapeConstants.TYPE_RECTANGLE,
    description: ShapeConstants.DESC_RECTANGLE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_ROUND_RECTANGLE,
    description: ShapeConstants.DESC_ROUND_RECTANGLE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.2,
    modifierY: 0.2,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 0.5,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_TEXT,
    description: ShapeConstants.DESC_TEXT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: 'Text',
    left: 0,
    top: 0,
    width: 60,
    height: 30,
    enableMask: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_ELLIPSE,
    description: ShapeConstants.DESC_ELLIPSE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_SQUARE,
    description: ShapeConstants.DESC_SQUARE,
    freeze: ShapeConstants.FREEZE_ASPECT_RATIO,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 120,
    enableMask: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_CIRCLE,
    description: ShapeConstants.DESC_CIRCLE,
    freeze: ShapeConstants.FREEZE_ASPECT_RATIO,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 120,
    enableMask: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_PROCESS,
    description: ShapeConstants.DESC_PROCESS,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 12,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 0,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_DIAMOND,
    description: ShapeConstants.DESC_DIAMOND,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 120,
    enableMask: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_PARALLELOGRAM,
    description: ShapeConstants.DESC_PARALLELOGRAM,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 12,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.8,
    modifierEndY: 0,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_HEXAGON,
    description: ShapeConstants.DESC_HEXAGON,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 0.3,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_TRIANGLE,
    description: ShapeConstants.DESC_TRIANGLE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 120,
    enableMask: false,
    modifiable: true,
    modifierX: 0.5,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 1,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_CYLINDER,
    description: ShapeConstants.DESC_CYLINDER,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 80,
    height: 120,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 0.25,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0.5,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_CLOUD,
    description: ShapeConstants.DESC_CLOUD,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_DOCUMENT,
    description: ShapeConstants.DESC_DOCUMENT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 0.7,
    modifierStartX: 0,
    modifierStartY: 0.5,
    modifierEndX: 0,
    modifierEndY: 1,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_INTERNAL_STORAGE,
    description: ShapeConstants.DESC_INTERNAL_STORAGE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 16,
    modifierY: 16,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 0.5,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_CUBE,
    description: ShapeConstants.DESC_CUBE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 100,
    enableMask: false,
    modifiable: true,
    modifierX: 40,
    modifierY: 20,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.6,
    modifierEndY: 0.6,
    modifyInLine: false,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_STEP,
    description: ShapeConstants.DESC_STEP,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 0.2,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0.5,
    modifierEndX: 0.95,
    modifierEndY: 0.5,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_TRAPEZOID,
    description: ShapeConstants.DESC_TRAPEZOID,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 12,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
    modifierEndY: 0,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_TAPE,
    description: ShapeConstants.DESC_TAPE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 90,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 0.3,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0,
    modifierEndY: 0.45,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_NOTE,
    description: ShapeConstants.DESC_NOTE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 90,
    height: 120,
    enableMask: false,
    modifiable: true,
    modifierX: 0.4,
    modifierY: 0.4,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 1,
    modifierEndY: 0.5,
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
    name: ShapeConstants.TYPE_CARD,
    description: ShapeConstants.DESC_CARD,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 90,
    height: 120,
    enableMask: false,
    modifiable: true,
    modifierX: 0.3,
    modifierY: 0.3,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 1,
    modifierEndY: 1,
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
    name: ShapeConstants.TYPE_CALLOUT,
    description: ShapeConstants.DESC_CALLOUT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 120,
    height: 80,
    enableMask: false,
    modifiable: true,
    modifierX: 0.3,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 1,
    modifierEndX: 1,
    modifierEndY: 1,
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
    adaptable: true,
    adapterX: 0.3,
    adapterY: 0.7,
    adapterDirection: 'X',
    adapterSize: 0.3,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0.95,
    adapterEndY: 1,
    adaptInLine: false,
    adaptInPercent: true,
  },
  {
    name: ShapeConstants.TYPE_ACTOR,
    description: ShapeConstants.DESC_ACTOR,
    freeze: ShapeConstants.FREEZE_NONE,
    text: '',
    left: 0,
    top: 0,
    width: 60,
    height: 120,
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
    adapterSize: 0,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 0,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
]

export interface ShapeOptions {
  shapeType: string
}

export class ShapeEntity extends Entity {
  private _shapeType: ShapeType
  private _shapeTypes: ShapeType[]

  public constructor(
    left: number,
    top: number,
    width: number,
    height: number,
    shapeOptions: ShapeOptions = { shapeType: ShapeConstants.TYPE_RECTANGLE },
    shapeTypes: ShapeType[] = ShapeTypes,
  ) {
    super(left, top, width, height)
    this._shapeTypes = shapeTypes
    this.type = shapeOptions.shapeType
    this._shapeType = this.getShapeType()
    let text = this.parseEntityShapeText(this.type)
    let typeInfo = this.parseTypeInfo(shapeOptions)
    this._shape = new EntityShape(text, left, top, width, height, typeInfo)
    this.initializeTheme()
  }

  public get types(): Type[] {
    return this._shapeTypes
  }

  public get category(): string {
    return Categories.SHAPE
  }

  public get shapeType(): ShapeType {
    return this._shapeType
  }

  // public clone(): EditorItem {
  //   let shapeEntity = new ShapeEntity(this.left, this.top, this.width, this.height)
  //   return shapeEntity
  // }

  protected save(): EditorItemInfo {
    let shapeInfo = new ShapeInfo(this.type, this.category, this.left, this.top, this.width, this.height, this.text)
    shapeInfo.rotation = this.rotation.radius
    shapeInfo.modifier = this.shape.modifier.x + ',' + this.shape.modifier.y
    shapeInfo.adapter = this.shape.adapter.x + ',' + this.shape.adapter.y
    shapeInfo.adapterSize = this.shape.adapterSize

    return shapeInfo
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected load(itemInfo: EditorItemInfo, editor: Editor): void {
    let shapeInfo = itemInfo as ShapeInfo
    this.boundary = Rectangle.makeLTWH(shapeInfo.left, shapeInfo.top, shapeInfo.width, shapeInfo.height)
    this.type = shapeInfo.type
    this.text = shapeInfo.text
    this.id = shapeInfo.id
    if (shapeInfo.rotation) {
      this.rotation = new Rotation(shapeInfo.rotation, this.width / 2, this.height / 2)
    }
    this.shape.modifier = CommonUtils.parsePointString(shapeInfo.modifier)
    this.shape.adapter = CommonUtils.parsePointString(shapeInfo.adapter)
  }

  protected getShapeType(): ShapeType {
    let theShapeType = this._shapeTypes[0]
    this._shapeTypes.forEach((shapeType) => {
      if (shapeType.name === this.type) {
        theShapeType = shapeType
      }
    })
    return theShapeType
  }

  private parseEntityShapeText(type: string): string {
    let text = ''
    this._shapeTypes.forEach((shapeType) => {
      if (shapeType.name === type) {
        text = shapeType.text
      }
    })
    return text
  }

  private parseEntityShapeFreezeType(freezeType: string): EntityShapeFreezeType {
    let entityFreezeType = EntityShapeFreezeType.None
    switch (freezeType) {
      case ShapeConstants.FREEZE_WIDTH:
        entityFreezeType = EntityShapeFreezeType.Width
        break
      case ShapeConstants.FREEZE_HEIGHT:
        entityFreezeType = EntityShapeFreezeType.Height
        break
      case ShapeConstants.FREEZE_WIDTH_HEIGHT:
        entityFreezeType = EntityShapeFreezeType.WidthHeight
        break
      case ShapeConstants.FREEZE_ASPECT_RATIO:
        entityFreezeType = EntityShapeFreezeType.AspectRatio
        break
      case ShapeConstants.FREEZE_NONE:
      default:
        entityFreezeType = EntityShapeFreezeType.None
        break
    }

    return entityFreezeType
  }

  private parseAdaptDirection(adapterDirection: string) {
    let theAdaptDirection = AdapterDirection.X
    switch (adapterDirection) {
      case ShapeConstants.ADAPTER_DIRECTION_X:
        theAdaptDirection = AdapterDirection.X
        break
      case ShapeConstants.ADAPTER_DIRECTION_Y:
        theAdaptDirection = AdapterDirection.Y
        break
    }
    return theAdaptDirection
  }

  protected parseTypeInfo(shapeOptions: ShapeOptions): ShapeTypeInfo {
    let theShapeType = this._shapeTypes[0]
    this._shapeTypes.forEach((shapeType) => {
      if (shapeType.name === shapeOptions.shapeType) {
        theShapeType = shapeType
      }
    })
    let freezeType = this.parseEntityShapeFreezeType(theShapeType.freeze)
    let shapeType = this.parseEntityShapeType(this.type)
    let adapterDirection = this.parseAdaptDirection(theShapeType.adapterDirection)
    return {
      name: theShapeType.name,
      type: shapeType,
      freeze: freezeType,
      text: theShapeType.text,
      left: theShapeType.left,
      top: theShapeType.top,
      width: theShapeType.width,
      height: theShapeType.height,
      enableMask: theShapeType.enableMask,
      modifier: new Point2(theShapeType.modifierX, theShapeType.modifierY),
      modifierStart: new Point2(theShapeType.modifierStartX, theShapeType.modifierStartY),
      modifierEnd: new Point2(theShapeType.modifierEndX, theShapeType.modifierEndY),
      modifyInLine: theShapeType.modifyInLine,
      modifyInPercent: theShapeType.modifyInPercent,
      controller: new Point2(theShapeType.controllerX, theShapeType.controllerY),
      controllerStart: new Point2(theShapeType.controllerStartX, theShapeType.controllerStartY),
      controllerEnd: new Point2(theShapeType.controllerEndX, theShapeType.controllerEndY),
      controlInLine: theShapeType.controlInLine,
      controlInPercent: theShapeType.controlInPercent,
      adapter: new Point2(theShapeType.adapterX, theShapeType.adapterY),
      adapterSize: theShapeType.adapterSize,
      adapterDirection: adapterDirection,
      adapterStart: new Point2(theShapeType.adapterStartX, theShapeType.adapterStartY),
      adapterEnd: new Point2(theShapeType.adapterEndX, theShapeType.adapterEndY),
      adaptInLine: theShapeType.adaptInLine,
      adaptInPercent: theShapeType.adaptInPercent,
    }
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.Rectangle
    switch (type) {
      case ShapeConstants.TYPE_RECTANGLE:
        shapeType = EntityShapeType.Rectangle
        break
      case ShapeConstants.TYPE_ROUND_RECTANGLE:
        shapeType = EntityShapeType.RoundRectangle
        break
      case ShapeConstants.TYPE_TEXT:
        shapeType = EntityShapeType.Text
        break
      case ShapeConstants.TYPE_ELLIPSE:
        shapeType = EntityShapeType.Ellipse
        break
      case ShapeConstants.TYPE_SQUARE:
        shapeType = EntityShapeType.Square
        break
      case ShapeConstants.TYPE_CIRCLE:
        shapeType = EntityShapeType.Circle
        break
      case ShapeConstants.TYPE_PROCESS:
        shapeType = EntityShapeType.Process
        break
      case ShapeConstants.TYPE_DIAMOND:
        shapeType = EntityShapeType.Diamond
        break
      case ShapeConstants.TYPE_PARALLELOGRAM:
        shapeType = EntityShapeType.Parallelogram
        break
      case ShapeConstants.TYPE_HEXAGON:
        shapeType = EntityShapeType.Hexagon
        break
      case ShapeConstants.TYPE_TRIANGLE:
        shapeType = EntityShapeType.Triangle
        break
      case ShapeConstants.TYPE_CYLINDER:
        shapeType = EntityShapeType.Cylinder
        break
      case ShapeConstants.TYPE_CLOUD:
        shapeType = EntityShapeType.Cloud
        break
      case ShapeConstants.TYPE_DOCUMENT:
        shapeType = EntityShapeType.Document
        break
      case ShapeConstants.TYPE_INTERNAL_STORAGE:
        shapeType = EntityShapeType.InternalStorage
        break
      case ShapeConstants.TYPE_CUBE:
        shapeType = EntityShapeType.Cube
        break
      case ShapeConstants.TYPE_STEP:
        shapeType = EntityShapeType.Step
        break
      case ShapeConstants.TYPE_TRAPEZOID:
        shapeType = EntityShapeType.Trapezoid
        break
      case ShapeConstants.TYPE_TAPE:
        shapeType = EntityShapeType.Tape
        break
      case ShapeConstants.TYPE_NOTE:
        shapeType = EntityShapeType.Note
        break
      case ShapeConstants.TYPE_CARD:
        shapeType = EntityShapeType.Card
        break
      case ShapeConstants.TYPE_CALLOUT:
        shapeType = EntityShapeType.Callout
        break
      case ShapeConstants.TYPE_ACTOR:
        shapeType = EntityShapeType.Actor
        break
    }
    return shapeType
  }
}
