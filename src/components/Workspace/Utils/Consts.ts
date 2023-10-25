export class Consts {
    public static ZOOM_DEFAULT = 1

    public static FONT_SIZE_DEFAULT = 14
    public static FONT_SIZE_MIN = 6
    public static FONT_SIZE_MAX = 72
    
    public static LINE_WIDTH_DEFAULT = 1
    public static LINE_WIDTH_MIN = 0.25
    public static LINE_WIDTH_MAX = 64

    public static GRID_SIZE_DEFAULT = 16
    public static GRID_SIZE_MIN = 8
    public static GRID_SIZE_MAX = 32


    public static COLOR_STROKE_DEFAULT = '#000000'
    public static COLOR_FILL_DEFAULT = '#FFFFFF'
    public static COLOR_FONT_DEFAULT = '#FFFFFF'
    public static COLOR_GRID_DEFAULT = '#888888'
    public static COLOR_BACKGROUND_DEFAULT = '#FFFFFF'

    public static PAGE_SIZE_DEFAULT = '800X600'
    public static PAGE_SIZE_A0 = 'A0'
    public static PAGE_SIZE_A1 = 'A1'
    public static PAGE_SIZE_A2 = 'A2'
    public static PAGE_SIZE_A3 = 'A3'
    public static PAGE_SIZE_A4 = 'A4'
    public static PAGE_SIZE_A5 = 'A5'
    public static PAGE_SIZE_A6 = 'A6'
    public static PAGE_SIZE_A7 = 'A7'
    public static PAGE_SIZE_B4 = 'B4'
    public static PAGE_SIZE_B5 = 'B5'
    public static PAGE_SIZE_1600X900 = '1600X900'
    public static PAGE_SIZE_1920X1200 = '1920X1200'
    public static PAGE_SIZE_1600X1200 = '1600X1200'
    public static PAGE_SIZE_1920X1080 = '1920X1080'
    public static PAGE_SIZE_800X600 = '800X600'
    public static PAGE_SIZE_640X480 = '640X480'
    public static PAGE_SIZE_512X512 = '512X512'
    public static PAGE_SIZE_256X256 = '256X256'
    public static PAGE_SIZE_CUSTOM = 'CUSTOM'
    public static PAGE_SIZE_MIN = 8
    public static PAGE_SIZE_MAX = 256 * 256
    public static PAGE_WIDTH_DEFAULT = 499
    public static PAGE_HEIGHT_DEFAULT = 499
    public static PAGE_ORIENTATION_PORTRAIT = 'portrait'
    public static PAGE_ORIENTATION_LANDSCAPE = 'landscape'

    public static STROKE_DASH_STYLE_SOLID = 'solid'
    public static STROKE_DASH_STYLE_DASH = 'dash'
    public static STROKE_DASH_STYLE_DOT = 'dot'
    public static STROKE_DASH_STYLE_DASH_DOT = 'dash-dot'
    public static STROKE_DASH_STYLE_DASH_DOT_DOT = 'dash-dot-dot'
    public static STROKE_DASH_STYLE_CUSTOM = 'custom'

}

export const StrokeDashStyles =  [
    {name: Consts.STROKE_DASH_STYLE_SOLID, label: 'workspace.property-editor.item-setting.stroke-dash-style.solid'},
    {name: Consts.STROKE_DASH_STYLE_DASH, label: 'workspace.property-editor.item-setting.stroke-dash-style.dash'},
    {name: Consts.STROKE_DASH_STYLE_DOT, label: 'workspace.property-editor.item-setting.stroke-dash-style.dot'},
    {name: Consts.STROKE_DASH_STYLE_DASH_DOT, label: 'workspace.property-editor.item-setting.stroke-dash-style.dash-dot'},
    {name: Consts.STROKE_DASH_STYLE_DASH_DOT_DOT, label: 'workspace.property-editor.item-setting.stroke-dash-style.dash-dot-dot'},
]

export const PageTypes = [
    {name: Consts.PAGE_SIZE_A0, label: 'workspace.property-editor.page-setting.page-size.a0', width: 4493.9, height: 3178.6},
    {name: Consts.PAGE_SIZE_A1, label: 'workspace.property-editor.page-setting.page-size.a1', width: 3178.6, height: 2245},
    {name: Consts.PAGE_SIZE_A2, label: 'workspace.property-editor.page-setting.page-size.a2', width: 2245, height: 1587.4},
    {name: Consts.PAGE_SIZE_A3, label: 'workspace.property-editor.page-setting.page-size.a3', width: 1587.4, height: 1122.5},
    {name: Consts.PAGE_SIZE_A4, label: 'workspace.property-editor.page-setting.page-size.a4', width: 1122.5, height: 793.7},
    {name: Consts.PAGE_SIZE_A5, label: 'workspace.property-editor.page-setting.page-size.a5', width: 793.7, height: 559.4},
    {name: Consts.PAGE_SIZE_A6, label: 'workspace.property-editor.page-setting.page-size.a6', width: 559.4, height: 396.9},
    {name: Consts.PAGE_SIZE_A7, label: 'workspace.property-editor.page-setting.page-size.a7', width: 396.9, height: 279.7},
    {name: Consts.PAGE_SIZE_B4, label: 'workspace.property-editor.page-setting.page-size.b4', width: 1334.2, height: 944.9},
    {name: Consts.PAGE_SIZE_B5, label: 'workspace.property-editor.page-setting.page-size.b5', width: 944.9, height: 665.2},
    {name: Consts.PAGE_SIZE_1600X900, label: 'workspace.property-editor.page-setting.page-size.1600x900', width: 1600, height: 900},
    {name: Consts.PAGE_SIZE_1920X1200, label: 'workspace.property-editor.page-setting.page-size.1920x1200', width: 1920, height: 1200},
    {name: Consts.PAGE_SIZE_1600X1200, label: 'workspace.property-editor.page-setting.page-size.1600x1200', width: 1600, height: 1200},
    {name: Consts.PAGE_SIZE_1920X1080, label: 'workspace.property-editor.page-setting.page-size.1920x1080', width: 1920, height: 1080},
    {name: Consts.PAGE_SIZE_800X600, label: 'workspace.property-editor.page-setting.page-size.800x600', width: 800, height: 600},
    {name: Consts.PAGE_SIZE_640X480, label: 'workspace.property-editor.page-setting.page-size.640x480', width: 640, height: 480},
    {name: Consts.PAGE_SIZE_512X512, label: 'workspace.property-editor.page-setting.page-size.512x512', width: 512, height: 512},
    {name: Consts.PAGE_SIZE_256X256, label: 'workspace.property-editor.page-setting.page-size.256x256', width: 256, height: 256},
    {name: Consts.PAGE_SIZE_CUSTOM, label: 'workspace.property-editor.page-setting.page-size.custom', width: 192, height: 192},
]