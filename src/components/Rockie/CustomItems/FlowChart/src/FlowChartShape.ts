import { Graphics, ParagraphDirection, Rectangle, RoundRectangle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { CustomShape } from '../../../Shapes'
import { CustomEntity, Shapes } from '../../../Items'
import { Type } from '../../../Items/src/Item'

const TYPE_FLOWCHART = 'FlowChart'
const DESC_FLOWCHART = 'FlowChart'
const TEXT_FLOWCHART = ''
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
const TYPE_FLOWCHART_START_SQUARE = 'FlowChart-Start-Square'
const DESC_FLOWCHART_START_SQUARE = 'Start'
const TEXT_FLOWCHART_START_SQUARE = ''
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
const TYPE_FLOWCHART_ANNOTATION_LEFT_BRACE = 'FlowChart-Annotation-Left-Brace'
const DESC_FLOWCHART_ANNOTATION_LEFT_BRACE = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_LEFT_BRACE = ''
const TYPE_FLOWCHART_ANNOTATION_RIGHT_BRACE = 'FlowChart-Annotation-Right-Brace'
const DESC_FLOWCHART_ANNOTATION_RIGHT_BRACE = 'Annotation'
const TEXT_FLOWCHART_ANNOTATION_RIGHT_BRACE = ''

export const FlowChartShapeTypes = [
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_DECISION, description: DESC_FLOWCHART_DECISION, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_DECISION, left: 0, top: 0, width: 120, height: 60, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_START_END, description: DESC_FLOWCHART_START_END, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_START_END, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0.5, modifierY: 1, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_START_ELLIPSE, description: DESC_FLOWCHART_START_ELLIPSE, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_START_ELLIPSE, left: 0, top: 0, width: 120, height: 60, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_START_SQUARE, description: DESC_FLOWCHART_START_SQUARE, freeze: Shapes.FREEZE_ASPECT_RATIO, text: TEXT_FLOWCHART_START_SQUARE, left: 0, top: 0, width: 100, height: 100, 
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_DOCUMENT, description: DESC_FLOWCHART_DOCUMENT, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_DOCUMENT, left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 0, modifierY: 0.7, modifierStartX: 0, modifierStartY: 0.5, modifierEndX: 0, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true,
  },
  { name: TYPE_FLOWCHART_DATA, description: DESC_FLOWCHART_DATA, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_DATA, left: 0, top: 0, width: 120, height: 80, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.8, modifierEndY: 0, modifyInLine: true, modifyInPercent: false,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true,
  },
  { name: TYPE_FLOWCHART_PREDEFINED_PROCESS, description: DESC_FLOWCHART_PREDEFINED_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PREDEFINED_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 12, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0, modifyInLine: true, modifyInPercent: false,
    controllable: true, controllerX: 0.7, controllerY: 0.3, controllerStartX: 0.5, controllerStartY: 0, controllerEndX: 1, controllerEndY: 0.5, controlInLine: false, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true,
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
  { name: TYPE_FLOWCHART_PROCESS, description: DESC_FLOWCHART_PROCESS, freeze: Shapes.FREEZE_NONE, text: TEXT_FLOWCHART_PROCESS, left: 0, top: 0, width: 120, height: 60, 
    modifiable: true, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0.5, modifierEndY: 0.5, modifyInLine: false, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0,adapterDirection: 'X', adapterSize: 1, adapterStartX: 0, adapterStartY: 1, adapterEndX: 1, adapterEndY: 1, adaptInLine: true, adaptInPercent: true
  },
]

export class FlowChartShape extends CustomEntity {
  
  public constructor(left: number, top: number, width: number, height: number, flowChartType: string) {
    super(left, top, width, height, '', {shapeType: flowChartType}, FlowChartShapeTypes)
    const customTypeInfo = this.parseTypeInfo({shapeType: flowChartType})
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
    switch(theThis.typeInfo.name) {
      case TYPE_FLOWCHART_DECISION:
        theThis.path.moveTo(this.width / 2, 0)
        theThis.path.lineTo(this.width, this.height / 2)
        theThis.path.lineTo(this.width / 2, this.height)
        theThis.path.lineTo(0, this.height / 2)
        theThis.path.lineTo(this.width / 2, 0)
        break;
      case TYPE_FLOWCHART_START_END:
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, modifierWidth, modifierHeight))
        break;
      case TYPE_FLOWCHART_START_ELLIPSE:
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, this.width, this.height))
        break;
      case TYPE_FLOWCHART_START_SQUARE:
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
        break;
      case TYPE_FLOWCHART_DOCUMENT:
        modifierHeight = this.height - modifierHeight
        let k = modifierHeight / 0.35
        theThis.path.moveTo(0, 0)
        theThis.path.lineTo(0, this.height - modifierHeight)
        theThis.path.cubicTo(this.width * 0.5, this.height  - modifierHeight + k, this.width * 0.5, this.height  - modifierHeight - k, this.width, this.height  - modifierHeight)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(0, 0)
        break;
      case TYPE_FLOWCHART_DATA:
        theThis.path.moveTo(modifierWidth, 0)
        theThis.path.lineTo(this.width, 0)
        theThis.path.lineTo(this.width - modifierWidth, this.height)
        theThis.path.lineTo(0, this.height)
        theThis.path.lineTo(modifierWidth, 0)
        break;
      case TYPE_FLOWCHART_PREDEFINED_PROCESS:
        //Avoid the line out of the boundary
        if(modifierWidth < this.width - controllerWidth) {
          modifierWidth = this.width - controllerWidth
        }
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, this.width - controllerWidth, controllerHeight))
        theThis.path.moveTo(modifierWidth + 1, 0)
        theThis.path.lineTo(modifierWidth + 1, this.height)
        theThis.path.moveTo(this.width - modifierWidth - 1, 0)
        theThis.path.lineTo(this.width - modifierWidth - 1, this.height)
        break;
      case TYPE_FLOWCHART_PROCESS:
        default:
        theThis.path.addRRect(new RoundRectangle(0, 0, this.width, this.height, modifierWidth, modifierHeight))
        break;
      }
  }

  protected parseEntityShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  } 

}
