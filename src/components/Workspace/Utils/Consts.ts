import { Constants } from '@ratel-web/editor/Utils'
import { SystemFonts } from '@ratel-web/engine'

export class Consts {
  public static DOCUMENT_VERSION = '1.0'
}

export const FontNameOptions = SystemFonts.map((systemFont: any) => {
  return { value: systemFont.fontName, label: systemFont.fontName }
})

export const FontSizeOptions = [
  { value: 5, label: '5' },
  { value: 5.5, label: '5.5' },
  { value: 6, label: '6' },
  { value: 6.5, label: '6.5' },
  { value: 7, label: '7' },
  { value: 7.5, label: '7.5' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 10.5, label: '10.5' },
  { value: 11, label: '11' },
  { value: 12, label: '12' },
  { value: 14, label: '14' },
  { value: 16, label: '16' },
  { value: 18, label: '18' },
  { value: 20, label: '20' },
  { value: 22, label: '22' },
  { value: 24, label: '24' },
  { value: 26, label: '26' },
  { value: 28, label: '28' },
  { value: 32, label: '32' },
  { value: 36, label: '36' },
  { value: 40, label: '40' },
  { value: 48, label: '48' },
  { value: 56, label: '56' },
  { value: 64, label: '64' },
  { value: 72, label: '72' },
]

export const DoubleLineGapOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 12, label: '12' },
  { value: 14, label: '14' },
  { value: 16, label: '16' },
  { value: 20, label: '20' },
  { value: 24, label: '24' },
]

export const DoubleLineArrowLengthOptions = [
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 6, label: '6' },
  { value: 8, label: '8' },
  { value: 10, label: '10' },
  { value: 12, label: '12' },
  { value: 16, label: '16' },
  { value: 20, label: '20' },
  { value: 24, label: '24' },
  { value: 28, label: '28' },
  { value: 32, label: '32' },
  { value: 36, label: '36' },
  { value: 40, label: '40' },
  { value: 48, label: '48' },
  { value: 64, label: '64' },
]

export const DoubleLineArrowDistanceOptions = [
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 6, label: '6' },
  { value: 8, label: '8' },
  { value: 10, label: '10' },
  { value: 12, label: '12' },
  { value: 16, label: '16' },
  { value: 20, label: '20' },
  { value: 24, label: '24' },
  { value: 28, label: '28' },
  { value: 32, label: '32' },
  { value: 36, label: '36' },
  { value: 40, label: '40' },
  { value: 48, label: '48' },
  { value: 64, label: '64' },
]

export const LineWidthOptions = [
  { value: 0.25, label: '0.25' },
  { value: 0.5, label: '0.5' },
  { value: 0.75, label: '0.75' },
  { value: 1, label: '1' },
  { value: 1.25, label: '1.25' },
  { value: 1.5, label: '1.5' },
  { value: 1.75, label: '1.75' },
  { value: 2, label: '2' },
  { value: 2.5, label: '2.5' },
  { value: 3, label: '3' },
  { value: 3.5, label: '3.5' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 10, label: '10' },
  { value: 12, label: '12' },
  { value: 16, label: '16' },
  { value: 20, label: '20' },
  { value: 24, label: '24' },
]

export const StrokeDashStyles = [
  { name: Constants.STROKE_DASH_STYLE_SOLID, label: 'workspace.property-editor.item-setting.stroke-dash-style.solid' },
  { name: Constants.STROKE_DASH_STYLE_DASH, label: 'workspace.property-editor.item-setting.stroke-dash-style.dash' },
  { name: Constants.STROKE_DASH_STYLE_DOT, label: 'workspace.property-editor.item-setting.stroke-dash-style.dot' },
  {
    name: Constants.STROKE_DASH_STYLE_DASH_DOT,
    label: 'workspace.property-editor.item-setting.stroke-dash-style.dash-dot',
  },
  {
    name: Constants.STROKE_DASH_STYLE_DASH_DOT_DOT,
    label: 'workspace.property-editor.item-setting.stroke-dash-style.dash-dot-dot',
  },
]

export const ConnectorLineTypes = [
  { name: Constants.CONNECTOR_LINE_TYPE_STRAIGHT, label: 'workspace.header.text.connector-type-straight' },
  { name: Constants.CONNECTOR_LINE_TYPE_ORTHOGONAL, label: 'workspace.header.text.connector-type-orthogonal' },
  { name: Constants.CONNECTOR_LINE_TYPE_CURVED, label: 'workspace.header.text.connector-type-curved' },
]

export const ConnectorLineModes = [
  { name: Constants.CONNECTOR_LINE_MODE_SIGNLE, label: 'workspace.header.text.connector-mode-single' },
  { name: Constants.CONNECTOR_LINE_MODE_DOUBLE, label: 'workspace.header.text.connector-mode-double' },
  { name: Constants.CONNECTOR_LINE_MODE_DOUBLE_START, label: 'workspace.header.text.connector-mode-double-start' },
  { name: Constants.CONNECTOR_LINE_MODE_DOUBLE_END, label: 'workspace.header.text.connector-mode-double-end' },
  { name: Constants.CONNECTOR_LINE_MODE_DOUBLE_BOTH, label: 'workspace.header.text.connector-mode-double-both' },
]

export const ConnectorLineModesForCurve = [
  { name: Constants.CONNECTOR_LINE_MODE_SIGNLE, label: 'workspace.header.text.connector-mode-single' },
  { name: Constants.CONNECTOR_LINE_MODE_DOUBLE, label: 'workspace.header.text.connector-mode-double' },
]

export const PageTypes = [
  {
    name: Constants.PAGE_SIZE_A0,
    label: 'workspace.property-editor.page-setting.page-size.a0',
    width: 4493.9,
    height: 3178.6,
  },
  {
    name: Constants.PAGE_SIZE_A1,
    label: 'workspace.property-editor.page-setting.page-size.a1',
    width: 3178.6,
    height: 2245,
  },
  {
    name: Constants.PAGE_SIZE_A2,
    label: 'workspace.property-editor.page-setting.page-size.a2',
    width: 2245,
    height: 1587.4,
  },
  {
    name: Constants.PAGE_SIZE_A3,
    label: 'workspace.property-editor.page-setting.page-size.a3',
    width: 1587.4,
    height: 1122.5,
  },
  {
    name: Constants.PAGE_SIZE_A4,
    label: 'workspace.property-editor.page-setting.page-size.a4',
    width: 1122.5,
    height: 793.7,
  },
  {
    name: Constants.PAGE_SIZE_A5,
    label: 'workspace.property-editor.page-setting.page-size.a5',
    width: 793.7,
    height: 559.4,
  },
  {
    name: Constants.PAGE_SIZE_A6,
    label: 'workspace.property-editor.page-setting.page-size.a6',
    width: 559.4,
    height: 396.9,
  },
  {
    name: Constants.PAGE_SIZE_A7,
    label: 'workspace.property-editor.page-setting.page-size.a7',
    width: 396.9,
    height: 279.7,
  },
  {
    name: Constants.PAGE_SIZE_B4,
    label: 'workspace.property-editor.page-setting.page-size.b4',
    width: 1334.2,
    height: 944.9,
  },
  {
    name: Constants.PAGE_SIZE_B5,
    label: 'workspace.property-editor.page-setting.page-size.b5',
    width: 944.9,
    height: 665.2,
  },
  {
    name: Constants.PAGE_SIZE_1600X900,
    label: 'workspace.property-editor.page-setting.page-size.1600x900',
    width: 1600,
    height: 900,
  },
  {
    name: Constants.PAGE_SIZE_1920X1200,
    label: 'workspace.property-editor.page-setting.page-size.1920x1200',
    width: 1920,
    height: 1200,
  },
  {
    name: Constants.PAGE_SIZE_1600X1200,
    label: 'workspace.property-editor.page-setting.page-size.1600x1200',
    width: 1600,
    height: 1200,
  },
  {
    name: Constants.PAGE_SIZE_1920X1080,
    label: 'workspace.property-editor.page-setting.page-size.1920x1080',
    width: 1920,
    height: 1080,
  },
  {
    name: Constants.PAGE_SIZE_800X600,
    label: 'workspace.property-editor.page-setting.page-size.800x600',
    width: 800,
    height: 600,
  },
  {
    name: Constants.PAGE_SIZE_640X480,
    label: 'workspace.property-editor.page-setting.page-size.640x480',
    width: 640,
    height: 480,
  },
  {
    name: Constants.PAGE_SIZE_512X512,
    label: 'workspace.property-editor.page-setting.page-size.512x512',
    width: 512,
    height: 512,
  },
  {
    name: Constants.PAGE_SIZE_256X256,
    label: 'workspace.property-editor.page-setting.page-size.256x256',
    width: 256,
    height: 256,
  },
  {
    name: Constants.PAGE_SIZE_CUSTOM,
    label: 'workspace.property-editor.page-setting.page-size.custom',
    width: 192,
    height: 192,
  },
]
