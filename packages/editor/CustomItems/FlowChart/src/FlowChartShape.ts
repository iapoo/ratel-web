import { Rectangle, RoundRectangle } from '@ratel-web/engine'
import { CustomEntity, ShapeConstants, Type } from '../../../Items'
import { CustomShape, EntityShapeType } from '../../../Shapes'

const TYPE_FLOWCHART_PROCESS = 'FlowChart-Process'
const DESC_FLOWCHART_PROCESS = 'FlowChart-Process'
const TEXT_FLOWCHART_PROCESS = ''
const TYPE_FLOWCHART_DECISION = 'FlowChart-Decision'
const DESC_FLOWCHART_DECISION = 'FlowChart-Decision'
const TEXT_FLOWCHART_DECISION = ''
const TYPE_FLOWCHART_START_END = 'FlowChart-Start-Terminator'
const DESC_FLOWCHART_START_END = 'Start/Terminator'
const TEXT_FLOWCHART_START_END = ''
const TYPE_FLOWCHART_START_ELLIPSE = 'FlowChart-Start-Ellipse'
const DESC_FLOWCHART_START_ELLIPSE = 'Start'
const TEXT_FLOWCHART_START_ELLIPSE = ''
const TYPE_FLOWCHART_START_CIRCLE = 'FlowChart-Start-Circle'
const DESC_FLOWCHART_START_CIRCLE = 'Start'
const TEXT_FLOWCHART_START_CIRCLE = ''
const TYPE_FLOWCHART_DOCUMENT = 'FlowChart-Document'
const DESC_FLOWCHART_DOCUMENT = 'Document'
const TEXT_FLOWCHART_DOCUMENT = ''
const TYPE_FLOWCHART_DATA = 'FlowChart-Data'
const DESC_FLOWCHART_DATA = 'Data'
const TEXT_FLOWCHART_DATA = ''
const TYPE_FLOWCHART_PREDEFINED_PROCESS = 'FlowChart-Predefined-Process'
const DESC_FLOWCHART_PREDEFINED_PROCESS = 'Predefined Process'
const TEXT_FLOWCHART_PREDEFINED_PROCESS = ''
const TYPE_FLOWCHART_STORED_DATA = 'FlowChart-Stored-Data'
const DESC_FLOWCHART_STORED_DATA = 'Stored Data'
const TEXT_FLOWCHART_STORED_DATA = ''
const TYPE_FLOWCHART_INTERNAL_STORAGE = 'FlowChart-Internal-Storage'
const DESC_FLOWCHART_INTERNAL_STORAGE = 'Internal Storage'
const TEXT_FLOWCHART_INTERNAL_STORAGE = ''
const TYPE_FLOWCHART_SEQUENTIAL_DATA = 'FlowChart-Sequential-Data'
const DESC_FLOWCHART_SEQUENTIAL_DATA = 'Sequential Data'
const TEXT_FLOWCHART_SEQUENTIAL_DATA = ''
const TYPE_FLOWCHART_DATABASE = 'FlowChart-Database'
const DESC_FLOWCHART_DATABASE = 'Database'
const TEXT_FLOWCHART_DATABASE = ''
const TYPE_FLOWCHART_DIRECT_DATA = 'FlowChart-Direct-Data'
const DESC_FLOWCHART_DIRECT_DATA = 'Direct Data'
const TEXT_FLOWCHART_DIRECT_DATA = ''
const TYPE_FLOWCHART_MANUAL_INPUT = 'FlowChart-Manual-Input'
const DESC_FLOWCHART_MANUAL_INPUT = 'Manual Input'
const TEXT_FLOWCHART_MANUAL_INPUT = ''
const TYPE_FLOWCHART_CARD = 'FlowChart-Card'
const DESC_FLOWCHART_CARD = 'Card'
const TEXT_FLOWCHART_CARD = ''
const TYPE_FLOWCHART_TAPE = 'FlowChart-Tape'
const DESC_FLOWCHART_TAPE = 'Tape'
const TEXT_FLOWCHART_TAPE = ''
const TYPE_FLOWCHART_DISPLAY = 'FlowChart-Display'
const DESC_FLOWCHART_DISPLAY = 'Display'
const TEXT_FLOWCHART_DISPLAY = ''
const TYPE_FLOWCHART_MANUAL_OPERATION = 'FlowChart-Manual-Operation'
const DESC_FLOWCHART_MANUAL_OPERATION = 'Manual Operation'
const TEXT_FLOWCHART_MANUAL_OPERATION = ''
const TYPE_FLOWCHART_PREPARATION = 'FlowChart-Preparation'
const DESC_FLOWCHART_PREPARATION = 'Preparation'
const TEXT_FLOWCHART_PREPARATION = ''
const TYPE_FLOWCHART_PARALLEL_MODE = 'FlowChart-Parallel-Mode'
const DESC_FLOWCHART_PARALLEL_MODE = 'Parallel Mode'
const TEXT_FLOWCHART_PARALLEL_MODE = ''
const TYPE_FLOWCHART_LOOP_LIMIT = 'FlowChart-Loop-Limit'
const DESC_FLOWCHART_LOOP_LIMIT = 'Loop Limit'
const TEXT_FLOWCHART_LOOP_LIMIT = ''
const TYPE_FLOWCHART_ON_PAGE_REFERENCE = 'FlowChart-On-Page-Reference'
const DESC_FLOWCHART_ON_PAGE_REFERENCE = 'On-Page Reference'
const TEXT_FLOWCHART_ON_PAGE_REFERENCE = ''
const TYPE_FLOWCHART_OR = 'FlowChart-Or'
const DESC_FLOWCHART_OR = 'Or'
const TEXT_FLOWCHART_OR = ''
const TYPE_FLOWCHART_SUMMING_JUNCTION = 'FlowChart-Summing-Junction'
const DESC_FLOWCHART_SUMMING_JUNCTION = 'Summing Junction'
const TEXT_FLOWCHART_SUMMING_JUNCTION = ''
const TYPE_FLOWCHART_OFF_PAGE_REFERENCE = 'FlowChart-Off-Page-Reference'
const DESC_FLOWCHART_OFF_PAGE_REFERENCE = 'Off-Page Reference'
const TEXT_FLOWCHART_OFF_PAGE_REFERENCE = ''
const TYPE_FLOWCHART_SORT = 'FlowChart-Sort'
const DESC_FLOWCHART_SORT = 'Sort'
const TEXT_FLOWCHART_SORT = ''
const TYPE_FLOWCHART_ANNOTATION_LEFT_BRACKET = 'FlowChart-Annotation-Left-Bracket'
const DESC_FLOWCHART_ANNOTATION_LEFT_BRACKET = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_LEFT_BRACKET = ''
const TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACKET = 'FlowChart-Annotation-Right-Bracket'
const DESC_FLOWCHART_ANNOTATION_RIGHT_BRACKET = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_RIGHT_BRACKET = ''
const TYPE_FLOWCHART_ANNOTATION_LEFT_BRACKET_EX = 'FlowChart-Annotation-Left-Bracket-Ex'
const DESC_FLOWCHART_ANNOTATION_LEFT_BRACKET_EX = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_LEFT_BRACKET_EX = ''
const TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACKET_EX = 'FlowChart-Annotation-Right-Bracket-EX'
const DESC_FLOWCHART_ANNOTATION_RIGHT_BRACKET_EX = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_RIGHT_BRACKET_EX = ''
const TYPE_FLOWCHART_ANNOTATION_LEFT_BRACE = 'FlowChart-Annotation-Left-Brace'
const DESC_FLOWCHART_ANNOTATION_LEFT_BRACE = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_LEFT_BRACE = ''
const TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACE = 'FlowChart-Annotation-Right-Brace'
const DESC_FLOWCHART_ANNOTATION_RIGHT_BRACE = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_RIGHT_BRACE = ''

export const FlowChartShapeTypes = [
  {
    name: TYPE_FLOWCHART_PROCESS,
    description: DESC_FLOWCHART_PROCESS,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_PROCESS,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_DECISION,
    description: DESC_FLOWCHART_DECISION,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_DECISION,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_START_END,
    description: DESC_FLOWCHART_START_END,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_START_END,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.5,
    modifierY: 1,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_START_ELLIPSE,
    description: DESC_FLOWCHART_START_ELLIPSE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_START_ELLIPSE,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_START_CIRCLE,
    description: DESC_FLOWCHART_START_CIRCLE,
    freeze: ShapeConstants.FREEZE_ASPECT_RATIO,
    text: TEXT_FLOWCHART_START_CIRCLE,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: false,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_DOCUMENT,
    description: DESC_FLOWCHART_DOCUMENT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_DOCUMENT,
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
    name: TYPE_FLOWCHART_DATA,
    description: DESC_FLOWCHART_DATA,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_DATA,
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
    name: TYPE_FLOWCHART_PREDEFINED_PROCESS,
    description: DESC_FLOWCHART_PREDEFINED_PROCESS,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_PREDEFINED_PROCESS,
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
    controllable: true,
    controllerX: 0.7,
    controllerY: 0.3,
    controllerStartX: 0.5,
    controllerStartY: 0,
    controllerEndX: 1,
    controllerEndY: 0.5,
    controlInLine: false,
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
    name: TYPE_FLOWCHART_STORED_DATA,
    description: DESC_FLOWCHART_STORED_DATA,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_STORED_DATA,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.25,
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
    name: TYPE_FLOWCHART_INTERNAL_STORAGE,
    description: DESC_FLOWCHART_INTERNAL_STORAGE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_INTERNAL_STORAGE,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
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
    controllable: true,
    controllerX: 0.7,
    controllerY: 0.3,
    controllerStartX: 0.5,
    controllerStartY: 0,
    controllerEndX: 1,
    controllerEndY: 0.5,
    controlInLine: false,
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
    name: TYPE_FLOWCHART_SEQUENTIAL_DATA,
    description: DESC_FLOWCHART_SEQUENTIAL_DATA,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_SEQUENTIAL_DATA,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: false,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_DATABASE,
    description: DESC_FLOWCHART_DATABASE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_DATABASE,
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
    name: TYPE_FLOWCHART_DIRECT_DATA,
    description: DESC_FLOWCHART_DIRECT_DATA,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_DIRECT_DATA,
    left: 0,
    top: 0,
    width: 100,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.25,
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
    name: TYPE_FLOWCHART_MANUAL_INPUT,
    description: DESC_FLOWCHART_MANUAL_INPUT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_MANUAL_INPUT,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 0.5,
    modifierStartX: 0,
    modifierStartY: 0,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_CARD,
    description: DESC_FLOWCHART_CARD,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_CARD,
    left: 0,
    top: 0,
    width: 100,
    height: 60,
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
    name: TYPE_FLOWCHART_TAPE,
    description: DESC_FLOWCHART_TAPE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_TAPE,
    left: 0,
    top: 0,
    width: 100,
    height: 70,
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
    name: TYPE_FLOWCHART_DISPLAY,
    description: DESC_FLOWCHART_DISPLAY,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_DISPLAY,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.6,
    modifierY: 0,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 1,
    modifierEndY: 0,
    modifyInLine: true,
    modifyInPercent: true,
    controllable: true,
    controllerX: 0.9,
    controllerY: 0,
    controllerStartX: 0,
    controllerStartY: 0,
    controllerEndX: 0.5,
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
    name: TYPE_FLOWCHART_MANUAL_OPERATION,
    description: DESC_FLOWCHART_MANUAL_OPERATION,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_MANUAL_OPERATION,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.3,
    modifierY: 0,
    modifierStartX: 0,
    modifierStartY: 1,
    modifierEndX: 0.5,
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
    name: TYPE_FLOWCHART_PREPARATION,
    description: DESC_FLOWCHART_PREPARATION,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_PREPARATION,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
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
    name: TYPE_FLOWCHART_PARALLEL_MODE,
    description: DESC_FLOWCHART_PARALLEL_MODE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_PARALLEL_MODE,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: true,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_LOOP_LIMIT,
    description: DESC_FLOWCHART_LOOP_LIMIT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_LOOP_LIMIT,
    left: 0,
    top: 0,
    width: 120,
    height: 60,
    enableMask: false,
    modifiable: true,
    modifierX: 0.4,
    modifierY: 0.5,
    modifierStartX: 0,
    modifierStartY: 0,
    modifierEndX: 0.5,
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
    name: TYPE_FLOWCHART_ON_PAGE_REFERENCE,
    description: DESC_FLOWCHART_ON_PAGE_REFERENCE,
    freeze: ShapeConstants.FREEZE_ASPECT_RATIO,
    text: TEXT_FLOWCHART_ON_PAGE_REFERENCE,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: false,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_OR,
    description: DESC_FLOWCHART_OR,
    freeze: ShapeConstants.FREEZE_ASPECT_RATIO,
    text: TEXT_FLOWCHART_OR,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: false,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_SUMMING_JUNCTION,
    description: DESC_FLOWCHART_SUMMING_JUNCTION,
    freeze: ShapeConstants.FREEZE_ASPECT_RATIO,
    text: TEXT_FLOWCHART_SUMMING_JUNCTION,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: false,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_OFF_PAGE_REFERENCE,
    description: DESC_FLOWCHART_OFF_PAGE_REFERENCE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_OFF_PAGE_REFERENCE,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: false,
    modifiable: true,
    modifierX: 0,
    modifierY: 0.5,
    modifierStartX: 0.5,
    modifierStartY: 0,
    modifierEndX: 0.5,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_SORT,
    description: DESC_FLOWCHART_SORT,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_SORT,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: false,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_ANNOTATION_LEFT_BRACKET,
    description: DESC_FLOWCHART_ANNOTATION_LEFT_BRACKET,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_ANNOTATION_LEFT_BRACKET,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
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
    adaptable: true,
    adapterX: 0,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0.2,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 1,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACKET,
    description: DESC_FLOWCHART_ANNOTATION_RIGHT_BRACKET,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_ANNOTATION_RIGHT_BRACKET,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
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
    adaptable: true,
    adapterX: 0.8,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0.2,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 1,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_ANNOTATION_LEFT_BRACKET_EX,
    description: DESC_FLOWCHART_ANNOTATION_LEFT_BRACKET_EX,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_ANNOTATION_LEFT_BRACKET_EX,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
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
    adaptable: true,
    adapterX: 0.15,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0.15,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 1,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACKET_EX,
    description: DESC_FLOWCHART_ANNOTATION_RIGHT_BRACKET_EX,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_ANNOTATION_RIGHT_BRACKET_EX,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
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
    adaptable: true,
    adapterX: 0.7,
    adapterY: 0,
    adapterDirection: 'X',
    adapterSize: 0.15,
    adapterStartX: 0,
    adapterStartY: 0,
    adapterEndX: 1,
    adapterEndY: 0,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_ANNOTATION_LEFT_BRACE,
    description: DESC_FLOWCHART_ANNOTATION_LEFT_BRACE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_ANNOTATION_LEFT_BRACE,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: true,
    modifiable: true,
    modifierX: 0.4,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
  {
    name: TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACE,
    description: DESC_FLOWCHART_ANNOTATION_RIGHT_BRACE,
    freeze: ShapeConstants.FREEZE_NONE,
    text: TEXT_FLOWCHART_ANNOTATION_RIGHT_BRACE,
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    enableMask: true,
    modifiable: true,
    modifierX: 0.6,
    modifierY: 0,
    modifierStartX: 0.5,
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
    adapterSize: 1,
    adapterStartX: 0,
    adapterStartY: 1,
    adapterEndX: 1,
    adapterEndY: 1,
    adaptInLine: true,
    adaptInPercent: true,
  },
]

export class FlowChartShape extends CustomEntity {
  public constructor(left: number, top: number, width: number, height: number, flowChartType: string) {
    super(left, top, width, height, '', { shapeType: flowChartType }, FlowChartShapeTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: flowChartType })
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
  }

  public get types(): Type[] {
    return FlowChartShapeTypes
  }

  public buildShape(theThis: CustomShape) {
    theThis.path.reset()
    let modifierWidth = theThis.modifier.x + theThis.typeInfo.modifierStart.x * theThis.width
    let modifierHeight = theThis.modifier.y + theThis.typeInfo.modifierStart.y * theThis.height
    let controllerWidth = theThis.controller.x + theThis.typeInfo.controllerStart.x * theThis.width
    let controllerHeight = theThis.controller.y + theThis.typeInfo.controllerStart.y * theThis.height
    let adapterWidth = theThis.adapter.x + theThis.typeInfo.adapterStart.x * theThis.width
    let adapterHeight = theThis.adapter.y + theThis.typeInfo.adapterStart.y * theThis.height
    let adapterSizeX = theThis.adapterSize
    let adapterSizeY = theThis.adapterSize
    if (theThis.typeInfo.modifyInPercent) {
      modifierWidth =
        theThis.width * theThis.modifier.x * (theThis.typeInfo.modifierEnd.x - theThis.typeInfo.modifierStart.x) +
        theThis.typeInfo.modifierStart.x * theThis.width
      modifierHeight =
        theThis.height * theThis.modifier.y * (theThis.typeInfo.modifierEnd.y - theThis.typeInfo.modifierStart.y) +
        theThis.typeInfo.modifierStart.y * theThis.height
    }
    if (theThis.typeInfo.controlInPercent) {
      controllerWidth =
        theThis.width * theThis.controller.x * (theThis.typeInfo.controllerEnd.x - theThis.typeInfo.controllerStart.x) +
        theThis.typeInfo.controllerStart.x * theThis.width
      controllerHeight =
        theThis.height * theThis.controller.y * (theThis.typeInfo.controllerEnd.y - theThis.typeInfo.controllerStart.y) +
        theThis.typeInfo.controllerStart.y * theThis.height
    }
    if (theThis.typeInfo.adaptInPercent) {
      adapterWidth =
        theThis.width * theThis.adapter.x * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) + theThis.typeInfo.adapterStart.x * theThis.width
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      adapterHeight =
        theThis.height * theThis.adapter.y * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) +
        theThis.typeInfo.adapterStart.y * theThis.height
      adapterSizeX = theThis.adapterSize * (theThis.typeInfo.adapterEnd.x - theThis.typeInfo.adapterStart.x) * this.width
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      adapterSizeY = theThis.adapterSize * (theThis.typeInfo.adapterEnd.y - theThis.typeInfo.adapterStart.y) * this.height
    }
    switch (theThis.typeInfo.name) {
      case TYPE_FLOWCHART_DECISION:
        theThis.path.moveTo(this.width / 2, 0)
        theThis.path.lineTo(this.width, this.height / 2)
        theThis.path.lineTo(this.width / 2, this.height)
        theThis.path.lineTo(0, this.height / 2)
        theThis.path.lineTo(this.width / 2, 0)
        break
      case TYPE_FLOWCHART_START_END:
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, modifierWidth, modifierHeight))
        break
      case TYPE_FLOWCHART_START_ELLIPSE:
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
        break
      case TYPE_FLOWCHART_START_CIRCLE:
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
        break
      case TYPE_FLOWCHART_DOCUMENT: {
        modifierHeight = this.height - modifierHeight
        const k = modifierHeight / 0.35
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, this.height - modifierHeight)
        theThis.path.cubicTo(
          this.width * 0.5,
          this.height - modifierHeight + k,
          this.width * 0.5,
          this.height - modifierHeight - k,
          this.width,
          this.height - modifierHeight,
        )
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(0, 0)
        break
      }
      case TYPE_FLOWCHART_DATA:
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(this.width - modifierWidth, this.height)
        theThis.path.lineTo(0, this.height)
        theThis.path.lineTo(modifierWidth, 0)
        break
      case TYPE_FLOWCHART_PREDEFINED_PROCESS:
        //Avoid the line out of the boundary
        if (modifierWidth < this.width - controllerWidth) {
          modifierWidth = this.width - controllerWidth
        }
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, this.width - controllerWidth, controllerHeight))
        theThis.path.moveTo(modifierWidth + 1, 0)
        theThis.path.lineTo(modifierWidth + 1, this.height)
        theThis.path.moveTo(this.width - modifierWidth - 1, 0)
        theThis.path.lineTo(this.width - modifierWidth - 1, this.height)
        break
      case TYPE_FLOWCHART_STORED_DATA: {
        //Ref to: https://www.ibashu.cn/news/show_261576.html
        //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
        let k = modifierWidth / 0.75
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(this.width, 0)
        theThis.path.cubicTo(this.width - k, 0, this.width - k, this.height, this.width, this.height)
        theThis.path.lineTo(modifierWidth, this.height)
        theThis.path.cubicTo(modifierWidth - k, this.height, modifierWidth - k, 0, modifierWidth, 0)
        break
      }
      case TYPE_FLOWCHART_INTERNAL_STORAGE: {
        //Avoid the line out of the boundary
        if (modifierWidth < this.width - controllerWidth) {
          modifierWidth = this.width - controllerWidth
        }
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, this.width - controllerWidth, controllerHeight))
        // TODO: FIX 1 Offset
        //theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        theThis.path.moveTo(modifierWidth + 1, 0)
        theThis.path.lineTo(modifierWidth + 1, this.height)
        theThis.path.moveTo(0, modifierHeight + 1)
        theThis.path.lineTo(this.width, modifierHeight + 1)
        break
      }
      case TYPE_FLOWCHART_SEQUENTIAL_DATA: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
        theThis.path.moveTo(this.width * 0.5, this.height)
        theThis.path.lineTo(this.width, this.height)
        break
      }
      case TYPE_FLOWCHART_DATABASE: {
        //Ref to: https://www.ibashu.cn/news/show_261576.html
        //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
        let k = modifierHeight / 0.75
        theThis.path.addArc(Rectangle.makeLTWH(0, 0, this.width, modifierHeight * 2), 0, 360)
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(0, this.height - modifierHeight)
        theThis.path.cubicTo(0, this.height - modifierHeight + k, this.width, this.height - modifierHeight + k, this.width, this.height - modifierHeight)
        theThis.path.moveTo(this.width, this.height - modifierHeight)
        theThis.path.lineTo(this.width, modifierHeight)
        theThis.path.cubicTo(this.width, modifierHeight + k, 0, modifierHeight + k, 0, modifierHeight)
        break
      }
      case TYPE_FLOWCHART_DIRECT_DATA: {
        //Ref to: https://www.ibashu.cn/news/show_261576.html
        //Ref to: https://blog.csdn.net/jeremyjone/article/details/102069294
        let k = modifierWidth / 0.75
        theThis.path.addArc(Rectangle.makeLTWH(this.width - modifierWidth * 2, 0, modifierWidth * 2, this.height), 0, 360)
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(this.width - modifierWidth, 0)
        theThis.path.cubicTo(this.width - modifierWidth - k, 0, this.width - modifierWidth - k, this.height, this.width - modifierWidth, this.height)
        theThis.path.lineTo(modifierWidth, this.height)
        theThis.path.cubicTo(modifierWidth - k, this.height, modifierWidth - k, 0, modifierWidth, 0)
        break
      }
      case TYPE_FLOWCHART_MANUAL_INPUT: {
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(0, this.height)
        theThis.path.lineTo(this.width, this.height)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(0, modifierHeight)
        break
      }
      case TYPE_FLOWCHART_CARD: {
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(0, this.height)
        theThis.path.lineTo(this.width, this.height)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(modifierWidth, 0)
        theThis.path.lineTo(0, modifierHeight)
        break
      }
      case TYPE_FLOWCHART_TAPE: {
        let k = modifierHeight / 0.35
        theThis.path.moveTo(0, modifierHeight)
        theThis.path.lineTo(0, this.height - modifierHeight)
        theThis.path.cubicTo(
          this.width * 0.5,
          this.height - modifierHeight + k,
          this.width * 0.5,
          this.height - modifierHeight - k,
          this.width,
          this.height - modifierHeight,
        )
        theThis.path.lineTo(this.width, modifierHeight)
        theThis.path.cubicTo(this.width * 0.5, modifierHeight - k, this.width * 0.5, modifierHeight + k, 0, modifierHeight)
        break
      }
      case TYPE_FLOWCHART_DISPLAY: {
        let k = (this.width - modifierWidth) / 0.75
        let k2 = controllerWidth / 0.75
        theThis.path.moveTo(controllerWidth, 0)
        theThis.path.lineTo(modifierWidth, 0)
        theThis.path.cubicTo(modifierWidth + k, 0, modifierWidth + k, this.height, modifierWidth, this.height)
        theThis.path.lineTo(controllerWidth, this.height)
        theThis.path.cubicTo(controllerWidth - k2, this.height, controllerWidth - k2, 0, controllerWidth, 0)
        //theThis.path.quadTo(0, this.height, 0, this.height * 0.5)
        //theThis.path.quadTo(0, 0, this.width * 0.4, 0)
        break
      }
      case TYPE_FLOWCHART_MANUAL_OPERATION: {
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(modifierWidth, this.height)
        theThis.path.lineTo(this.width - modifierWidth, this.height)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(0, 0)
        break
      }
      case TYPE_FLOWCHART_PREPARATION: {
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(this.width - modifierWidth, 0)
        theThis.path.lineTo(this.width, this.height / 2)
        theThis.path.lineTo(this.width - modifierWidth, this.height)
        theThis.path.lineTo(modifierWidth, this.height)
        theThis.path.lineTo(0, this.height / 2)
        theThis.path.lineTo(modifierWidth, 0)
        break
      }
      case TYPE_FLOWCHART_PARALLEL_MODE: {
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(0, 0)
        theThis.path.moveTo(0, this.height)
        theThis.path.lineTo(this.width, this.height)
        theThis.path.lineTo(0, this.height)
        break
      }
      case TYPE_FLOWCHART_LOOP_LIMIT: {
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(this.width - modifierWidth, 0)
        theThis.path.lineTo(this.width, modifierHeight)
        theThis.path.lineTo(this.width, this.height)
        theThis.path.lineTo(0, this.height)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(modifierWidth, 0)
        break
      }
      case TYPE_FLOWCHART_ON_PAGE_REFERENCE: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
        break
      }
      case TYPE_FLOWCHART_OR: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
        theThis.path.moveTo(this.width * 0.5, 0)
        theThis.path.lineTo(this.width * 0.5, this.height)
        theThis.path.moveTo(0, this.height * 0.5)
        theThis.path.lineTo(this.width, this.height * 0.5)
        break
      }
      case TYPE_FLOWCHART_SUMMING_JUNCTION: {
        //const matrix = new Matrix()
        //matrix.rotate(0.01, this.width / 2, this.height /2)
        const value = this.width * 0.5 * Math.sin(Math.PI / 4)
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
        theThis.path.moveTo(this.width * 0.5 - value, this.width * 0.5 - value)
        theThis.path.lineTo(this.width * 0.5 + value, this.height * 0.5 + value)
        theThis.path.moveTo(this.width * 0.5 - value, this.width * 0.5 + value)
        theThis.path.lineTo(this.width * 0.5 + value, this.height * 0.5 - value)
        break
      }
      case TYPE_FLOWCHART_OFF_PAGE_REFERENCE: {
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, modifierHeight)
        theThis.path.lineTo(this.width * 0.5, this.height)
        theThis.path.lineTo(this.width, modifierHeight)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(0, 0)
        break
      }
      case TYPE_FLOWCHART_SORT: {
        theThis.path.moveTo(this.width * 0.5, 0)
        theThis.path.lineTo(0, this.height * 0.5)
        theThis.path.lineTo(this.width * 0.5, this.height)
        theThis.path.lineTo(this.width, this.height * 0.5)
        theThis.path.lineTo(this.width * 0.5, 0)
        theThis.path.moveTo(0, this.height * 0.5)
        theThis.path.lineTo(this.width, this.height * 0.5)
        break
      }
      case TYPE_FLOWCHART_ANNOTATION_LEFT_BRACKET: {
        theThis.path.moveTo(adapterWidth + adapterSizeX, 0)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.lineTo(adapterWidth, this.height)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height)
        theThis.path.lineTo(adapterWidth, this.height)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.lineTo(adapterWidth + adapterSizeX, 0)
        theThis.path.moveTo(0, this.height * 0.5)
        theThis.path.lineTo(adapterWidth, this.height * 0.5)
        theThis.path.lineTo(0, this.height * 0.5)
        break
      }
      case TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACKET: {
        theThis.path.moveTo(adapterWidth, 0)
        theThis.path.lineTo(adapterWidth + adapterSizeX, 0)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height)
        theThis.path.lineTo(adapterWidth, this.height)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height)
        theThis.path.lineTo(adapterWidth + adapterSizeX, 0)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.moveTo(this.width, this.height * 0.5)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height * 0.5)
        theThis.path.lineTo(this.width, this.height * 0.5)
        break
      }
      case TYPE_FLOWCHART_ANNOTATION_LEFT_BRACKET_EX: {
        theThis.path.moveTo(adapterWidth + adapterSizeX, 0)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.lineTo(adapterWidth, this.height)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height)
        theThis.path.lineTo(adapterWidth, this.height)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.lineTo(adapterWidth + adapterSizeX, 0)
        theThis.path.moveTo(0, this.height * 0.5)
        theThis.path.lineTo(adapterWidth, this.height * 0.5)
        theThis.path.lineTo(0, this.height * 0.5)
        break
      }
      case TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACKET_EX: {
        theThis.path.moveTo(adapterWidth, 0)
        theThis.path.lineTo(adapterWidth + adapterSizeX, 0)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height)
        theThis.path.lineTo(adapterWidth, this.height)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height)
        theThis.path.lineTo(adapterWidth + adapterSizeX, 0)
        theThis.path.lineTo(adapterWidth, 0)
        theThis.path.moveTo(this.width, this.height * 0.5)
        theThis.path.lineTo(adapterWidth + adapterSizeX, this.height * 0.5)
        theThis.path.lineTo(this.width, this.height * 0.5)
        break
      }
      case TYPE_FLOWCHART_ANNOTATION_LEFT_BRACE: {
        const radius = modifierWidth * 0.5
        const diameter = radius * 2
        theThis.path.moveTo(0, 0)
        theThis.path.addArc(Rectangle.makeLTWH(-radius, 0, diameter, diameter), 270, 90)
        theThis.path.lineTo(radius, this.height * 0.5 - radius)
        theThis.path.moveTo(diameter, this.height * 0.5)
        theThis.path.addArc(Rectangle.makeLTWH(radius, this.height * 0.5 - diameter, diameter, diameter), 90, 90)
        theThis.path.moveTo(radius, this.height * 0.5 + radius)
        theThis.path.addArc(Rectangle.makeLTWH(radius, this.height * 0.5, diameter, diameter), 180, 90)
        theThis.path.moveTo(radius, this.height * 0.5 + radius)
        theThis.path.lineTo(radius, this.height - radius)
        theThis.path.addArc(Rectangle.makeLTWH(-radius, this.height - diameter, diameter, diameter), 0, 90)
        break
      }
      case TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACE: {
        const radius = (this.width - modifierWidth) * 0.5
        const diameter = radius * 2
        theThis.path.moveTo(this.width - radius, radius)
        theThis.path.addArc(Rectangle.makeLTWH(this.width - radius, 0, diameter, diameter), 180, 90)
        theThis.path.moveTo(this.width - radius, radius)
        theThis.path.lineTo(this.width - radius, this.height * 0.5 - radius)
        theThis.path.addArc(Rectangle.makeLTWH(this.width - diameter - radius, this.height * 0.5 - diameter, diameter, diameter), 0, 90)
        theThis.path.addArc(Rectangle.makeLTWH(this.width - diameter - radius, this.height * 0.5, diameter, diameter), 270, 90)
        theThis.path.lineTo(this.width - radius, this.height - radius)
        theThis.path.addArc(Rectangle.makeLTWH(this.width - radius, this.height - diameter, diameter, diameter), 90, 90)
        break
      }
      case TYPE_FLOWCHART_PROCESS:
      default:
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, modifierWidth, modifierHeight))
        break
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }
}
