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
  public static TEXT_HORIZONTAL_SCROLLBAR = ''
  public static TYPE_VERTICAL_SCROLLBAR = 'Vertical Scrollbar'
  public static DESC_VERTICAL_SCROLLBAR = 'Vertical Scrollbar'
  public static TEXT_VERTICAL_SCROLLBAR = ''
  public static TYPE_HORIZONTAL_LINE = 'Horizontal Line'
  public static DESC_HORIZONTAL_LINE = 'Horizontal Line'
  public static TEXT_HORIZONTAL_LINE = ''
  public static TYPE_VERTICAL_LINE = 'Vertical Line'
  public static DESC_VERTICAL_LINE = 'Vertical Line'
  public static TEXT_VERTICAL_LINE = ''
  public static TYPE_LINE_CHART = 'Line Chart'
  public static DESC_LINE_CHART = 'Line Chart'
  public static TEXT_LINE_CHART = ''
  public static TYPE_PIE_CHART = 'Pie Chart'
  public static DESC_PIE_CHART = 'Pie Chart'
  public static TEXT_PIE_CHART = ''
  public static TYPE_BAR_CHART = 'Bar Chart'
  public static DESC_BAR_CHART = 'Bar Chart'
  public static TEXT_BAR_CHART = ''
  public static TYPE_COLUMN_CHART = 'Column Chart'
  public static DESC_COLUMN_CHART = 'Column Chart'
  public static TEXT_COLUMN_CHART = ''
  public static TYPE_BUTTON = 'Button'
  public static DESC_BUTTON = 'Button'
  public static TEXT_BUTTON = 'Button'
  public static TYPE_INPUT = 'Input'
  public static DESC_INPUT = 'Input'
  public static TEXT_INPUT = ''
  public static TYPE_DROPDOWN = 'Dropdown'
  public static DESC_DROPDOWN = 'Dropdown'
  public static TEXT_DROPDOWN = ''
  public static TYPE_SEARCH_BAR = 'Search Bar'
  public static DESC_SEARCH_BAR = 'Search Bar'
  public static TEXT_SEARCH_BAR = ''
  public static TYPE_CHECKBOX = 'CheckBox'
  public static DESC_CHECKBOX = 'CheckBox'
  public static TEXT_CHECKBOX = 'CheckBox'
  public static TYPE_CHECKBOX_CHECKED = 'CheckBox Checked'
  public static DESC_CHECKBOX_CHECKED = 'CheckBox Checked'
  public static TEXT_CHECKBOX_CHECKED = 'CheckBox'
  public static TYPE_RADIO = 'Radio'
  public static DESC_RADIO = 'Radio'
  public static TEXT_RADIO = 'Radio'
  public static TYPE_RADIO_CHECKED = 'Radio Checked'
  public static DESC_RADIO_CHECKED = 'Radio Checked'
  public static TEXT_RADIO_CHECKED = 'Radio'
  public static TYPE_INPUT_NUMBER = 'Input Number'
  public static DESC_INPUT_NUMBER = 'Input Number'
  public static TEXT_INPUT_NUMBER = ''
  public static TYPE_TEXT_AREA = 'TextArea'
  public static DESC_TEXT_AREA = 'TextArea'
  public static TEXT_TEXT_AREA = ''
  public static TYPE_LISTBOX = 'ListBox'
  public static DESC_LISTBOX = 'ListBox'
  public static TEXT_LISTBOX = ''
  public static TYPE_DATE_PICKER = 'Date Picker'
  public static DESC_DATE_PICKER = 'Date Picker'
  public static TEXT_DATE_PICKER = ''
  public static TYPE_SLIDER = 'Slider'
  public static DESC_SLIDER = 'Slider'
  public static TEXT_SLIDER = ''
  public static TYPE_SLIDER_VERTICAL = 'Slider(Vertical)'
  public static DESC_SLIDER_VERTICAL = 'Slider(Vertical)'
  public static TEXT_SLIDER_VERTICAL = ''
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
  {
    name: MockupCustomShapes.TYPE_HORIZONTAL_SCROLLBAR, description: MockupCustomShapes.DESC_HORIZONTAL_SCROLLBAR, freeze: Shapes.FREEZE_HEIGHT, text: MockupCustomShapes.TEXT_HORIZONTAL_SCROLLBAR, left: 0, top: 0, width: 280, height: 24, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: true, adapterX: 0.25, adapterY: 0, adapterDirection: 'X', adapterSize: 0.3, adapterStartX: 0.15, adapterStartY: 0, adapterEndX: 0.85, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_VERTICAL_SCROLLBAR, description: MockupCustomShapes.DESC_VERTICAL_SCROLLBAR, freeze: Shapes.FREEZE_WIDTH, text: MockupCustomShapes.TEXT_VERTICAL_SCROLLBAR, left: 0, top: 0, width: 24, height: 280, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: true, adapterX: 0, adapterY: 0.25, adapterDirection: 'Y', adapterSize: 0.3, adapterStartX: 0, adapterStartY: 0.15, adapterEndX: 0, adapterEndY: 0.85, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_HORIZONTAL_LINE, description: MockupCustomShapes.DESC_HORIZONTAL_LINE, freeze: Shapes.FREEZE_HEIGHT, text: MockupCustomShapes.TEXT_HORIZONTAL_LINE, left: 0, top: 0, width: 280, height: 20, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_VERTICAL_LINE, description: MockupCustomShapes.DESC_VERTICAL_LINE, freeze: Shapes.FREEZE_WIDTH, text: MockupCustomShapes.TEXT_VERTICAL_LINE, left: 0, top: 0, width: 20, height: 280, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_LINE_CHART, description: MockupCustomShapes.DESC_LINE_CHART, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_LINE_CHART, left: 0, top: 0, width: 200, height: 160, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_PIE_CHART, description: MockupCustomShapes.DESC_PIE_CHART, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_PIE_CHART, left: 0, top: 0, width: 160, height: 160, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_BAR_CHART, description: MockupCustomShapes.DESC_BAR_CHART, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_BAR_CHART, left: 0, top: 0, width: 200, height: 160, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_COLUMN_CHART, description: MockupCustomShapes.DESC_COLUMN_CHART, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_COLUMN_CHART, left: 0, top: 0, width: 200, height: 160, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_BUTTON, description: MockupCustomShapes.DESC_BUTTON, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_BUTTON, left: 0, top: 0, width: 120, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_INPUT, description: MockupCustomShapes.DESC_INPUT, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_INPUT, left: 0, top: 0, width: 160, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_DROPDOWN, description: MockupCustomShapes.DESC_DROPDOWN, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_DROPDOWN, left: 0, top: 0, width: 160, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_SEARCH_BAR, description: MockupCustomShapes.DESC_SEARCH_BAR, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_SEARCH_BAR, left: 0, top: 0, width: 160, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_CHECKBOX, description: MockupCustomShapes.DESC_CHECKBOX, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_CHECKBOX, left: 0, top: 0, width: 160, height: 30, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_CHECKBOX_CHECKED, description: MockupCustomShapes.DESC_CHECKBOX_CHECKED, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_CHECKBOX_CHECKED, left: 0, top: 0, width: 160, height: 30, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_RADIO, description: MockupCustomShapes.DESC_RADIO, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_RADIO, left: 0, top: 0, width: 160, height: 30, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_RADIO_CHECKED, description: MockupCustomShapes.DESC_RADIO_CHECKED, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_RADIO_CHECKED, left: 0, top: 0, width: 160, height: 30, enableMask: true,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_INPUT_NUMBER, description: MockupCustomShapes.DESC_INPUT_NUMBER, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_INPUT_NUMBER, left: 0, top: 0, width: 80, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_TEXT_AREA, description: MockupCustomShapes.DESC_TEXT_AREA, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_TEXT_AREA, left: 0, top: 0, width: 180, height: 60, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_LISTBOX, description: MockupCustomShapes.DESC_LISTBOX, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_LISTBOX, left: 0, top: 0, width: 180, height: 160, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: true, adapterX: 0, adapterY: 0.25, adapterDirection: 'Y', adapterSize: 0.3, adapterStartX: 1, adapterStartY: 0.15, adapterEndX: 1, adapterEndY: 0.85, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_DATE_PICKER, description: MockupCustomShapes.DESC_DATE_PICKER, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_DATE_PICKER, left: 0, top: 0, width: 160, height: 30, enableMask: false,
    modifiable: false, modifierX: 0, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_SLIDER, description: MockupCustomShapes.DESC_SLIDER, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_SLIDER, left: 0, top: 0, width: 200, height: 30, enableMask: true,
    modifiable: true, modifierX: 0.3, modifierY: 0, modifierStartX: 0, modifierStartY: 0, modifierEndX: 1, modifierEndY: 0, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
  {
    name: MockupCustomShapes.TYPE_SLIDER_VERTICAL, description: MockupCustomShapes.DESC_SLIDER_VERTICAL, freeze: Shapes.FREEZE_NONE, text: MockupCustomShapes.TEXT_SLIDER_VERTICAL, left: 0, top: 0, width: 30, height: 200, enableMask: true,
    modifiable: true, modifierX: 0, modifierY: 0.3, modifierStartX: 0, modifierStartY: 0, modifierEndX: 0, modifierEndY: 1, modifyInLine: true, modifyInPercent: true,
    controllable: false, controllerX: 0, controllerY: 0, controllerStartX: 0, controllerStartY: 0, controllerEndX: 0, controllerEndY: 0, controlInLine: true, controlInPercent: true,
    adaptable: false, adapterX: 0, adapterY: 0, adapterDirection: 'X', adapterSize: 0, adapterStartX: 0, adapterStartY: 0, adapterEndX: 0, adapterEndY: 0, adaptInLine: true, adaptInPercent: true
  },
]

export class MockupCustomShape extends CustomEntity {
  public static BORDER_COLOR = Colors.Gray
  public static DARK_COLOR = Colors.DimGray
  public static LIGHT_COLOR = Colors.Gainsboro
  public static HIGHTLIGHT_COLOR = Colors.Blue
  public static HEADER_COLOR = Colors.WhiteSmoke
  public static BACKGROUND_COLOR = Colors.White

  public constructor(left: number, top: number, width: number, height: number, typeName: string) {
    super(left, top, width, height, '', { shapeType: typeName }, MockupCustomShapeTypes)
    const customTypeInfo = this.parseTypeInfo({ shapeType: typeName })
    this._shape = new CustomShape(left, top, width, height, this.buildShape, customTypeInfo)
    this.initializeTheme()
    this.initializeShape()
    this.strokeColor = MockupCustomShape.BORDER_COLOR
    this.secondFillColor = MockupCustomShape.DARK_COLOR
    this.secondStrokeColor = MockupCustomShape.DARK_COLOR
    this.thirdStrokeColor = MockupCustomShape.LIGHT_COLOR
    this.thirdFillColor = MockupCustomShape.LIGHT_COLOR
    this.fourthStrokeColor = MockupCustomShape.HIGHTLIGHT_COLOR
    this.fourthFillColor = MockupCustomShape.HIGHTLIGHT_COLOR
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
      case MockupCustomShapes.TYPE_HORIZONTAL_SCROLLBAR: {
        break;
      }
      case MockupCustomShapes.TYPE_VERTICAL_SCROLLBAR: {
        break;
      }
      case MockupCustomShapes.TYPE_HORIZONTAL_LINE: {
        this.lineWidth = 1
        break;
      }
      case MockupCustomShapes.TYPE_VERTICAL_LINE: {
        this.lineWidth = 1
        break;
      }
      case MockupCustomShapes.TYPE_LINE_CHART: {
        break;
      }
      case MockupCustomShapes.TYPE_PIE_CHART: {
        break;
      }
      case MockupCustomShapes.TYPE_BAR_CHART: {
        break;
      }
      case MockupCustomShapes.TYPE_COLUMN_CHART: {
        break;
      }
      case MockupCustomShapes.TYPE_BUTTON: {
        this.fillColor = MockupCustomShape.LIGHT_COLOR
        this.text = this._shape.typeInfo.text
        break;
      }
      case MockupCustomShapes.TYPE_INPUT: {
        break;
      }
      case MockupCustomShapes.TYPE_DROPDOWN: {
        break;
      }
      case MockupCustomShapes.TYPE_SEARCH_BAR: {
        break;
      }
      case MockupCustomShapes.TYPE_CHECKBOX: {
        this.text = this._shape.typeInfo.text
        this.textAlignment = TextAlignment.LEFT
        break;
      }
      case MockupCustomShapes.TYPE_CHECKBOX_CHECKED: {
        this.text = this._shape.typeInfo.text
        this.textAlignment = TextAlignment.LEFT
        break;
      }
      case MockupCustomShapes.TYPE_RADIO: {
        this.text = this._shape.typeInfo.text
        this.textAlignment = TextAlignment.LEFT
        break;
      }
      case MockupCustomShapes.TYPE_RADIO_CHECKED: {
        this.text = this._shape.typeInfo.text
        this.textAlignment = TextAlignment.LEFT
        break;
      }
      case MockupCustomShapes.TYPE_INPUT_NUMBER: {
        break;
      }
      case MockupCustomShapes.TYPE_TEXT_AREA: {
        break;
      }
      case MockupCustomShapes.TYPE_LISTBOX: {
        break;
      }
      case MockupCustomShapes.TYPE_DATE_PICKER: {
        break;
      }
      case MockupCustomShapes.TYPE_SLIDER: {
        break;
      }
      case MockupCustomShapes.TYPE_SLIDER_VERTICAL: {
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
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdStroke.setStrokeWidth(2)
        theThis.thirdFill.setColor(theThis.fill.getColor())
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
      case MockupCustomShapes.TYPE_HORIZONTAL_SCROLLBAR: {
        const scrollbarButtonWidth = 30
        const scrollbarButtonIconWidth = 14
        const scrollbarButtonIconHeight = 12
        const scrollbarButtonIconLeft = (scrollbarButtonWidth - scrollbarButtonIconWidth) * 0.5
        const scrollbarButtonIconTop = (theThis.height - scrollbarButtonIconHeight) * 0.5
        const scrollbarButtonIcon2Left = theThis.width - scrollbarButtonWidth + (scrollbarButtonWidth - scrollbarButtonIconWidth) * 0.5
        const scrollbarThumbWidth = adapterSizeX
        const scrollbarThumbPosition = adapterWidth
        const scrollbarThumbBorder = 5
        theThis.stroke.setStrokeWidth(0.5)
        theThis.stroke.setColor(MockupCustomShape.BORDER_COLOR)
        theThis.secondStroke.setColor(MockupCustomShape.BORDER_COLOR)
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondFill.setColor(MockupCustomShape.LIGHT_COLOR)
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.fourthStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.fourthFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(0, 0, scrollbarButtonWidth, theThis.height))
        // theThis.fill.setColor(Colors.Red)
        theThis.thirdPath.moveTo(scrollbarButtonIconLeft, theThis.height * 0.5)
        theThis.thirdPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth, scrollbarButtonIconTop + scrollbarButtonIconHeight)
        theThis.thirdPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth, scrollbarButtonIconTop)
        theThis.thirdPath.lineTo(scrollbarButtonIconLeft, theThis.height * 0.5)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(theThis.width - scrollbarButtonWidth, 0, scrollbarButtonWidth, theThis.height))
        theThis.thirdPath.moveTo(scrollbarButtonIcon2Left + scrollbarButtonIconWidth, theThis.height * 0.5)
        theThis.thirdPath.lineTo(scrollbarButtonIcon2Left, scrollbarButtonIconTop + scrollbarButtonIconHeight)
        theThis.thirdPath.lineTo(scrollbarButtonIcon2Left, scrollbarButtonIconTop)
        theThis.thirdPath.lineTo(scrollbarButtonIcon2Left + scrollbarButtonIconWidth, theThis.height * 0.5)
        //theThis.path.addRectangle(Rectangle.makeLTWH(scrollbarButtonWidth, 0, theThis.width - scrollbarButtonWidth * 2, theThis.height))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(scrollbarThumbPosition, scrollbarThumbBorder, scrollbarThumbWidth, theThis.height - scrollbarThumbBorder * 2))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_VERTICAL_SCROLLBAR: {
        const scrollbarButtonHeight = 30
        const scrollbarButtonIconWidth = 12
        const scrollbarButtonIconHeight = 14
        const scrollbarButtonIconTop = (scrollbarButtonHeight - scrollbarButtonIconHeight) * 0.5
        const scrollbarButtonIconLeft = (theThis.width - scrollbarButtonIconWidth) * 0.5
        const scrollbarButtonIcon2Top = theThis.height - scrollbarButtonHeight + (scrollbarButtonHeight - scrollbarButtonIconHeight) * 0.5
        const scrollbarThumbHeight = adapterSizeY
        const scrollbarThumbPosition = adapterHeight
        const scrollbarThumbBorder = 5
        theThis.stroke.setStrokeWidth(0.5)
        theThis.stroke.setColor(MockupCustomShape.BORDER_COLOR)
        theThis.secondStroke.setColor(MockupCustomShape.BORDER_COLOR)
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondFill.setColor(MockupCustomShape.LIGHT_COLOR)
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.fourthStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.fourthFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, scrollbarButtonHeight))
        theThis.thirdPath.moveTo(theThis.width * 0.5, scrollbarButtonIconTop)
        theThis.thirdPath.lineTo(scrollbarButtonIconLeft, scrollbarButtonIconTop + scrollbarButtonIconHeight)
        theThis.thirdPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth, scrollbarButtonIconTop + scrollbarButtonIconHeight)
        theThis.thirdPath.lineTo(theThis.width * 0.5, scrollbarButtonIconTop)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(0, theThis.height - scrollbarButtonHeight, theThis.width, scrollbarButtonHeight))
        theThis.thirdPath.moveTo(theThis.width * 0.5, scrollbarButtonIcon2Top + scrollbarButtonIconHeight)
        theThis.thirdPath.lineTo(scrollbarButtonIconLeft, scrollbarButtonIcon2Top)
        theThis.thirdPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth, scrollbarButtonIcon2Top)
        theThis.thirdPath.lineTo(theThis.width * 0.5, scrollbarButtonIcon2Top + scrollbarButtonIconHeight)
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(scrollbarThumbBorder, scrollbarThumbPosition, theThis.width - scrollbarThumbBorder * 2, scrollbarThumbHeight))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_HORIZONTAL_LINE: {
        const lineSize = 1
        theThis.stroked = false
        theThis.filled = false
        theThis.secondStroke.setColor(MockupCustomShape.BORDER_COLOR)
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(0, theThis.height * 0.5, theThis.width, lineSize))
        break;
      }
      case MockupCustomShapes.TYPE_VERTICAL_LINE: {
        const lineSize = 1
        theThis.stroked = false
        theThis.filled = false
        theThis.secondStroke.setColor(MockupCustomShape.BORDER_COLOR)
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(theThis.width * 0.5, 0, lineSize, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_LINE_CHART: {
        theThis.stroked = false
        theThis.filled = false
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondPath.moveTo(0, 0)
        theThis.secondPath.lineTo(0, theThis.height)
        theThis.secondPath.lineTo(theThis.width, theThis.height)
        theThis.secondPath.lineTo(0, theThis.height)
        theThis.secondPath.lineTo(0, 0)
        theThis.secondPath.moveTo(0, theThis.height * 0.5)
        theThis.secondPath.lineTo(theThis.width * 0.2, theThis.height * 0.7)
        theThis.secondPath.lineTo(theThis.width * 0.4, theThis.height * 0.6)
        theThis.secondPath.lineTo(theThis.width * 0.6, theThis.height * 0.7)
        theThis.secondPath.lineTo(theThis.width * 0.8, theThis.height * 0.5)
        theThis.secondPath.lineTo(theThis.width * 1, theThis.height * 0.6)
        theThis.secondPath.lineTo(theThis.width * 0.8, theThis.height * 0.5)
        theThis.secondPath.lineTo(theThis.width * 0.6, theThis.height * 0.7)
        theThis.secondPath.lineTo(theThis.width * 0.4, theThis.height * 0.6)
        theThis.secondPath.lineTo(theThis.width * 0.2, theThis.height * 0.7)
        theThis.secondPath.lineTo(0, theThis.height * 0.5)
        theThis.secondPath.moveTo(0, theThis.height * 0.6)
        theThis.secondPath.lineTo(theThis.width * 0.2, theThis.height * 0.3)
        theThis.secondPath.lineTo(theThis.width * 0.4, theThis.height * 0.4)
        theThis.secondPath.lineTo(theThis.width * 0.6, theThis.height * 0.3)
        theThis.secondPath.lineTo(theThis.width * 0.8, theThis.height * 0.2)
        theThis.secondPath.lineTo(theThis.width * 1, theThis.height * 0.3)
        theThis.secondPath.lineTo(theThis.width * 0.8, theThis.height * 0.2)
        theThis.secondPath.lineTo(theThis.width * 0.6, theThis.height * 0.3)
        theThis.secondPath.lineTo(theThis.width * 0.4, theThis.height * 0.4)
        theThis.secondPath.lineTo(theThis.width * 0.2, theThis.height * 0.3)
        theThis.secondPath.lineTo(0, theThis.height * 0.6)
        break;
      }
      case MockupCustomShapes.TYPE_PIE_CHART: {
        theThis.path.addOval(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        //Reference: https://blog.csdn.net/xiamentingtao/article/details/85804823
        // p1: 60  p2: 160  p3: 290
        const rx = theThis.width * 0.5
        const ry = theThis.height * 0.5
        const cx = theThis.width * 0.5
        const cy = theThis.height * 0.5
        const origP1x = rx * ry / Math.sqrt(ry * ry + rx * rx * Math.tan(Math.PI * 60 / 180) * Math.tan(Math.PI * 60 / 180))
        const origP1y = rx * ry * Math.tan(Math.PI * 60 / 180) / Math.sqrt(ry * ry + rx * rx * Math.tan(Math.PI * 60 / 180) * Math.tan(Math.PI * 60 / 180))
        const p1x = origP1x + cx
        const p1y = cy - origP1y
        const origP2x = - rx * ry / Math.sqrt(ry * ry + rx * rx * Math.tan(Math.PI * 160 / 180) * Math.tan(Math.PI * 160 / 180))
        const origP2y = - rx * ry * Math.tan(Math.PI * 160 / 180) / Math.sqrt(ry * ry + rx * rx * Math.tan(Math.PI * 160 / 180) * Math.tan(Math.PI * 160 / 180))
        const p2x = origP2x + cx
        const p2y = cy - origP2y
        const origP3x = rx * ry / Math.sqrt(ry * ry + rx * rx * Math.tan(Math.PI * 290 / 180) * Math.tan(Math.PI * 290 / 180))
        const origP3y = rx * ry * Math.tan(Math.PI * 290 / 180) / Math.sqrt(ry * ry + rx * rx * Math.tan(Math.PI * 290 / 180) * Math.tan(Math.PI * 290 / 180))
        const p3x = origP3x + cx
        const p3y = cy - origP3y
        theThis.path.moveTo(cx, cy)
        theThis.path.lineTo(p1x, p1y)
        theThis.path.moveTo(cx, cy)
        theThis.path.lineTo(p2x, p2y)
        theThis.path.moveTo(cx, cy)
        theThis.path.lineTo(p3x, p3y)
        break;
      }
      case MockupCustomShapes.TYPE_BAR_CHART: {
        theThis.stroked = false
        theThis.filled = false
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondStroke.setAntiAlias(true)
        theThis.secondFill.setColor(theThis.fill.getColor())
        theThis.thirdStroke.setColor(theThis.stroke.getColor())
        theThis.thirdStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.thirdStroke.setAntiAlias(true)
        theThis.thirdFill.setColor(MockupCustomShape.LIGHT_COLOR)
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondPath.moveTo(0, 0)
        theThis.secondPath.lineTo(0, theThis.height)
        theThis.secondPath.lineTo(theThis.width, theThis.height)
        theThis.secondPath.lineTo(0, theThis.height)
        theThis.secondPath.lineTo(0, 0)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(theThis.width * 0.1, theThis.height * 0.4, theThis.width * 0.1, theThis.height * 0.6))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(theThis.width * 0.4, theThis.height * 0.3, theThis.width * 0.1, theThis.height * 0.7))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(theThis.width * 0.7, theThis.height * 0.5, theThis.width * 0.1, theThis.height * 0.5))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(theThis.width * 0.2, theThis.height * 0.3, theThis.width * 0.1, theThis.height * 0.7))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(theThis.width * 0.5, theThis.height * 0.4, theThis.width * 0.1, theThis.height * 0.6))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(theThis.width * 0.8, theThis.height * 0.6, theThis.width * 0.1, theThis.height * 0.4))
        break;
      }
      case MockupCustomShapes.TYPE_COLUMN_CHART: {
        theThis.stroked = false
        theThis.filled = false
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondStroke.setAntiAlias(true)
        theThis.secondFill.setColor(theThis.fill.getColor())
        theThis.thirdStroke.setColor(theThis.stroke.getColor())
        theThis.thirdStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.thirdStroke.setAntiAlias(true)
        theThis.thirdFill.setColor(MockupCustomShape.LIGHT_COLOR)
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondPath.moveTo(0, 0)
        theThis.secondPath.lineTo(0, theThis.height)
        theThis.secondPath.lineTo(theThis.width, theThis.height)
        theThis.secondPath.lineTo(0, theThis.height)
        theThis.secondPath.lineTo(0, 0)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(0, theThis.height * 0.1, theThis.width * 0.6, theThis.height * 0.1))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(0, theThis.height * 0.4, theThis.width * 0.7, theThis.height * 0.1))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(0, theThis.height * 0.7, theThis.width * 0.5, theThis.height * 0.1))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(0, theThis.height * 0.2, theThis.width * 0.7, theThis.height * 0.1))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(0, theThis.height * 0.5, theThis.width * 0.6, theThis.height * 0.1))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(0, theThis.height * 0.8, theThis.width * 0.4, theThis.height * 0.1))
        break;
      }
      case MockupCustomShapes.TYPE_BUTTON: {
        theThis.path.addRRect(new RoundRectangle(0, 0, theThis.width, theThis.height, 3, 3))
        break;
      }
      case MockupCustomShapes.TYPE_INPUT: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_DROPDOWN: {
        const buttonWidth = 30
        const buttonLeft = theThis.width - buttonWidth
        const iconLeft = buttonLeft + buttonWidth * 0.3
        const iconTop = theThis.height * 0.3
        const iconWidth = buttonWidth * 0.4
        const iconHeight = theThis.height - iconTop * 2
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondFill.setColor(MockupCustomShape.LIGHT_COLOR)
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(buttonLeft, 0, buttonWidth, theThis.height))
        theThis.thirdPath.moveTo(iconLeft, iconTop)
        theThis.thirdPath.lineTo(iconLeft + iconWidth * 0.5, iconTop + iconHeight)
        theThis.thirdPath.lineTo(iconLeft + iconWidth, iconTop)
        theThis.thirdPath.lineTo(iconLeft, iconTop)
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_SEARCH_BAR: {
        const iconLeft = 8
        const iconTop = theThis.height * 0.2
        const circleRadius = theThis.height * 0.2
        const iconWidth = (theThis.height - iconTop * 2) * 0.8
        const circleCenterX = iconLeft + circleRadius
        const circleCenterY = iconTop + circleRadius
        const lineEndX = iconLeft + iconWidth
        const lineEndY = theThis.height - iconTop
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(2.5)
        theThis.secondFill.setColor(theThis.fill.getColor())
        theThis.thirdStroke.setColor(theThis.stroke.getColor())
        theThis.thirdStroke.setStrokeWidth(2.5)
        theThis.thirdFill.setColor(theThis.fill.getColor())
        theThis.secondPath.moveTo(circleCenterX, circleCenterY)
        theThis.secondPath.lineTo(lineEndX, lineEndY)
        theThis.secondPath.lineTo(circleCenterX, circleCenterY)
        theThis.thirdPath.addOval(Rectangle.makeLTWH(iconLeft, iconTop, circleRadius * 2, circleRadius * 2))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_CHECKBOX: {
        theThis.stroked = false
        theThis.filled = false
        const iconLeft = 8
        const iconTop = theThis.height * 0.2
        const iconWidth = theThis.height * 0.6
        const iconHeight = theThis.height * 0.6
        const textLeft = iconLeft + iconWidth
        theThis.textLeft = textLeft
        theThis.textWidth = theThis.width - textLeft
        theThis.secondStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondStroke.setStrokeWidth(2)
        theThis.secondFill.setColor(MockupCustomShape.BACKGROUND_COLOR)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(iconLeft, iconTop, iconWidth, iconHeight))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_CHECKBOX_CHECKED: {
        theThis.stroked = false
        theThis.filled = false
        const iconLeft = 8
        const iconTop = theThis.height * 0.2
        const iconWidth = theThis.height * 0.6
        const iconHeight = theThis.height * 0.6
        const textLeft = iconLeft + iconWidth
        theThis.textLeft = textLeft
        theThis.textWidth = theThis.width - textLeft
        theThis.secondStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondStroke.setStrokeWidth(2)
        theThis.secondFill.setColor(MockupCustomShape.BACKGROUND_COLOR)
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdStroke.setStrokeWidth(2.5)
        theThis.thirdFill.setColor(MockupCustomShape.BACKGROUND_COLOR)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(iconLeft, iconTop, iconWidth, iconHeight))
        theThis.thirdPath.moveTo(iconLeft + iconWidth * 0.2, iconTop + iconHeight * 0.5)
        theThis.thirdPath.lineTo(iconLeft + iconWidth * 0.5, iconTop + iconHeight * 0.8)
        theThis.thirdPath.lineTo(iconLeft + iconWidth * 0.8, iconTop + iconHeight * 0.2)
        theThis.thirdPath.lineTo(iconLeft + iconWidth * 0.5, iconTop + iconHeight * 0.8)
        theThis.thirdPath.lineTo(iconLeft + iconWidth * 0.2, iconTop + iconHeight * 0.5)
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_RADIO: {
        theThis.stroked = false
        theThis.filled = false
        const iconLeft = 8
        const iconTop = theThis.height * 0.2
        const iconWidth = theThis.height * 0.6
        const iconHeight = theThis.height * 0.6
        const textLeft = iconLeft + iconWidth
        theThis.textLeft = textLeft
        theThis.textWidth = theThis.width - textLeft
        theThis.secondStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondStroke.setStrokeWidth(2)
        theThis.secondFill.setColor(MockupCustomShape.BACKGROUND_COLOR)
        theThis.secondPath.addOval(Rectangle.makeLTWH(iconLeft, iconTop, iconWidth, iconHeight))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_RADIO_CHECKED: {
        theThis.stroked = false
        theThis.filled = false
        const iconLeft = 8
        const iconTop = theThis.height * 0.2
        const iconWidth = theThis.height * 0.6
        const iconHeight = theThis.height * 0.6
        const icon2Left = iconLeft + theThis.height * 0.13
        const icon2Top = theThis.height * 0.33
        const icon2Width = theThis.height * 0.34
        const icon2Height = theThis.height * 0.34
        const textLeft = iconLeft + iconWidth
        theThis.textLeft = textLeft
        theThis.textWidth = theThis.width - textLeft
        theThis.secondStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondStroke.setStrokeWidth(2)
        theThis.secondFill.setColor(MockupCustomShape.BACKGROUND_COLOR)
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdStroke.setStrokeWidth(2.5)
        theThis.thirdFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondPath.addOval(Rectangle.makeLTWH(iconLeft, iconTop, iconWidth, iconHeight))
        theThis.thirdPath.addOval(Rectangle.makeLTWH(icon2Left, icon2Top, icon2Width, icon2Height))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_INPUT_NUMBER: {
        const buttonWidth = 20
        const buttonLeft = theThis.width - buttonWidth
        const icon1Left = buttonLeft + buttonWidth * 0.2
        const icon1Top = theThis.height * 0.15
        const icon1Width = buttonWidth * 0.6
        const icon1Height = theThis.height * 0.5 - icon1Top * 2
        const icon2Left = buttonLeft + buttonWidth * 0.2
        const icon2Top = theThis.height * 0.65
        const icon2Width = buttonWidth * 0.6
        const icon2Height = theThis.height * 0.5 - icon1Top * 2
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondFill.setColor(MockupCustomShape.LIGHT_COLOR)
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(buttonLeft, 0, buttonWidth, theThis.height))
        theThis.secondPath.moveTo(buttonLeft, theThis.height * 0.5)
        theThis.secondPath.lineTo(buttonLeft + buttonWidth, theThis.height * 0.5)
        theThis.secondPath.lineTo(buttonLeft, theThis.height * 0.5)
        theThis.thirdPath.moveTo(icon1Left + icon1Width * 0.5, icon1Top)
        theThis.thirdPath.lineTo(icon1Left, icon1Top + icon1Height)
        theThis.thirdPath.lineTo(icon1Left + icon1Width, icon1Top + icon1Height)
        theThis.thirdPath.lineTo(icon1Left + icon1Width * 0.5, icon1Top)
        theThis.thirdPath.moveTo(icon2Left, icon2Top)
        theThis.thirdPath.lineTo(icon2Left + icon2Width * 0.5, icon2Top + icon2Height)
        theThis.thirdPath.lineTo(icon2Left + icon2Width, icon2Top)
        theThis.thirdPath.lineTo(icon2Left, icon2Top)
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_TEXT_AREA: {
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_LISTBOX: {
        const scrollbarButtonHeight = 20
        const scrollbarButtonWidth = 20
        const scrollbarButtonIconWidth = 12
        const scrollbarButtonIconHeight = 10
        const scrollbarButtonLeft = theThis.width - scrollbarButtonWidth
        const scrollbarButtonIconTop = (scrollbarButtonHeight - scrollbarButtonIconHeight) * 0.5
        const scrollbarButtonIconLeft = theThis.width - scrollbarButtonWidth + (scrollbarButtonWidth - scrollbarButtonIconWidth) * 0.5
        const scrollbarButtonIcon2Top = theThis.height - scrollbarButtonHeight + (scrollbarButtonHeight - scrollbarButtonIconHeight) * 0.5
        const scrollbarThumbBorder = 5
        const scrollbarThumbHeight = adapterSizeY
        const scrollbarThumbWidth = scrollbarButtonWidth - scrollbarThumbBorder * 2
        const scrollbarThumbLeft = theThis.width - scrollbarButtonWidth + scrollbarThumbBorder
        const scrollbarThumbPosition = adapterHeight
        // theThis.stroke.setStrokeWidth(0.5)
        // theThis.stroke.setColor(MockupCustomShape.BORDER_COLOR)
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondFill.setColor(MockupCustomShape.LIGHT_COLOR)
        theThis.thirdStroke.setColor(theThis.stroke.getColor())
        theThis.thirdStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.thirdFill.setColor(theThis.fill.getColor())
        theThis.fourthStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.fourthFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(scrollbarButtonLeft, 0, scrollbarButtonWidth, scrollbarButtonHeight))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(scrollbarButtonLeft, theThis.height - scrollbarButtonHeight, scrollbarButtonWidth, scrollbarButtonHeight))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(0, 0, scrollbarButtonLeft, theThis.height))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(scrollbarButtonLeft, scrollbarButtonHeight, scrollbarButtonWidth, theThis.height - scrollbarButtonHeight * 2))
        theThis.fourthPath.moveTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth * 0.5, scrollbarButtonIconTop)
        theThis.fourthPath.lineTo(scrollbarButtonIconLeft, scrollbarButtonIconTop + scrollbarButtonIconHeight)
        theThis.fourthPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth, scrollbarButtonIconTop + scrollbarButtonIconHeight)
        theThis.fourthPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth * 0.5, scrollbarButtonIconTop)
        theThis.fourthPath.moveTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth * 0.5, scrollbarButtonIcon2Top + scrollbarButtonIconHeight)
        theThis.fourthPath.lineTo(scrollbarButtonIconLeft, scrollbarButtonIcon2Top)
        theThis.fourthPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth, scrollbarButtonIcon2Top)
        theThis.fourthPath.lineTo(scrollbarButtonIconLeft + scrollbarButtonIconWidth * 0.5, scrollbarButtonIcon2Top + scrollbarButtonIconHeight)
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(scrollbarThumbLeft, scrollbarThumbPosition, scrollbarThumbWidth, scrollbarThumbHeight))
        break;
      }
      case MockupCustomShapes.TYPE_DATE_PICKER: {
        const buttonWidth = 30
        const buttonLeft = theThis.width - buttonWidth
        const iconLeft = buttonLeft + buttonWidth * 0.2
        const iconTop = theThis.height * 0.2
        const iconWidth = buttonWidth * 0.6
        const iconHeight = theThis.height - iconTop * 2
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondStroke.setStrokeWidth(theThis.stroke.getStroketWidth())
        theThis.secondFill.setColor(Colors.Transparent)
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdStroke.setStrokeWidth(1.5)
        theThis.thirdFill.setColor(Colors.Transparent)
        theThis.fourthStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.fourthStroke.setStrokeWidth(1)
        theThis.fourthFill.setColor(MockupCustomShape.DARK_COLOR)
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(buttonLeft, 0, buttonWidth, theThis.height))
        theThis.thirdPath.addRectangle(Rectangle.makeLTWH(iconLeft, iconTop, iconWidth, iconHeight))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.15, iconTop - iconHeight * 0.075, iconWidth * 0.15, iconHeight * 0.15))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.45, iconTop - iconHeight * 0.075, iconWidth * 0.15, iconHeight * 0.15))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.75, iconTop - iconHeight * 0.075, iconWidth * 0.15, iconHeight * 0.15))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.15, iconTop + iconHeight * 0.15, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.45, iconTop + iconHeight * 0.15, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.75, iconTop + iconHeight * 0.15, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.15, iconTop + iconHeight * 0.45, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.45, iconTop + iconHeight * 0.45, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.75, iconTop + iconHeight * 0.45, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.15, iconTop + iconHeight * 0.75, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.45, iconTop + iconHeight * 0.75, iconWidth * 0.1, iconHeight * 0.1))
        theThis.fourthPath.addRectangle(Rectangle.makeLTWH(iconLeft + iconWidth * 0.75, iconTop + iconHeight * 0.75, iconWidth * 0.1, iconHeight * 0.1))
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        break;
      }
      case MockupCustomShapes.TYPE_SLIDER: {
        const sliderLeft = 0
        const sliderHeight = 4
        const sliderTop = (theThis.height - sliderHeight) * 0.5
        const sliderWidth = theThis.width
        const iconWidth = 14
        const iconHeight = 14
        const iconLeft = modifierWidth - iconWidth * 0.5
        const iconTop = (theThis.height - iconHeight) * 0.5
        theThis.stroked = false
        theThis.filled = false
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondFill.setColor(theThis.stroke.getColor())
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdStroke.setStrokeWidth(2)
        theThis.thirdFill.setColor(theThis.fill.getColor())
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(sliderLeft, sliderTop, sliderWidth, sliderHeight))
        theThis.thirdPath.addOval(Rectangle.makeLTWH(iconLeft, iconTop, iconWidth, iconHeight))
        break;
      }
      case MockupCustomShapes.TYPE_SLIDER_VERTICAL: {
        const sliderTop = 0
        const sliderWidth = 4
        const sliderLeft = (theThis.width - sliderWidth) * 0.5
        const sliderHeight = theThis.height
        const iconWidth = 14
        const iconHeight = 14
        const iconLeft = (theThis.width - iconWidth) * 0.5
        const iconTop = modifierHeight - iconHeight * 0.5
        theThis.stroked = false
        theThis.filled = false
        theThis.secondStroke.setColor(theThis.stroke.getColor())
        theThis.secondFill.setColor(theThis.stroke.getColor())
        theThis.thirdStroke.setColor(MockupCustomShape.DARK_COLOR)
        theThis.thirdStroke.setStrokeWidth(2)
        theThis.thirdFill.setColor(theThis.fill.getColor())
        theThis.path.addRectangle(Rectangle.makeLTWH(0, 0, theThis.width, theThis.height))
        theThis.secondPath.addRectangle(Rectangle.makeLTWH(sliderLeft, sliderTop, sliderWidth, sliderHeight))
        theThis.thirdPath.addOval(Rectangle.makeLTWH(iconLeft, iconTop, iconWidth, iconHeight))
        break;
      }
    }
  }

  protected parseHeaderShapeType(type: string): EntityShapeType {
    let shapeType = EntityShapeType.CustomShape
    return shapeType
  }

}
