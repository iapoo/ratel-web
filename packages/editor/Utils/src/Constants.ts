import { EngineUtils } from '@ratel-web/engine'

export class Constants {
  public static ZOOM_DEFAULT = 1

  public static FONT_NAME_DEFAULT = EngineUtils.FONT_NAME_DEFAULT
  public static FONT_SIZE_DEFAULT = 14
  public static FONT_SIZE_MIN = 6
  public static FONT_SIZE_MAX = 72

  // public static LINE_WIDTH_DEFAULT = 1
  // public static LINE_WIDTH_MIN = 0.25
  // public static LINE_WIDTH_MAX = 64
  // public static DOUBLE_LINE_GAP_DEFAULT = 6
  // public static DOUBLE_LINE_ARROW_LENGTH_DEFAULT = 12
  // public static DOUBLE_LINE_ARROW_DISTANCE_DEFAULT = 6

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

  public static EDITOR_CURSOR_AUTO = 'auto'
  public static EDITOR_CURSOR_DEFAULT = 'default'
  public static EDITOR_CURSOR_ALL_SCROLL = 'all-scroll'
  public static EDITOR_CURSOR_HELP = 'help'
  public static EDITOR_CURSOR_MOVE = 'move'
  public static EDITOR_CURSOR_POINTER = 'pointer'
  public static EDITOR_CURSOR_PROGRESS = 'progress'
  public static EDITOR_CURSOR_TEXT = 'text'
  public static EDITOR_CURSOR_VERTICAL_TEXT = 'vertical-text'
  public static EDITOR_CURSOR_WAIT = 'wait'
  public static EDITOR_CURSOR_NO_DROP = 'no-drop'
  public static EDITOR_CURSOR_NOT_ALLOWED = 'not-allowed'
  public static EDITOR_CURSOR_E_RESIZE = 'e-resize'
  public static EDITOR_CURSOR_N_RESIZE = 'n-resize'
  public static EDITOR_CURSOR_S_RESIZE = 's-resize'
  public static EDITOR_CURSOR_W_RESIZE = 'w-resize'
  public static EDITOR_CURSOR_NE_RESIZE = 'ne-resize'
  public static EDITOR_CURSOR_NW_RESIZE = 'nw-resize'
  public static EDITOR_CURSOR_SE_RESIZE = 'se-resize'
  public static EDITOR_CURSOR_SW_RESIZE = 'sw-resize'
  public static EDITOR_CURSOR_ROW_RESIZE = 'row-resize'
  public static EDITOR_CURSOR_COL_RESIZE = 'col-resize'
  public static EDITOR_CURSOR_CROSSHAIR = 'crosshair'

  public static CONNECTOR_ARROW_DISPLAY_TYPE_NONE = 'none'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_TRIANGLE = 'triangle'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_DIAMOND = 'diamond'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_ELLIPSE = 'ellipse'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_PARENTHESIS = 'left-parenthesis'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_RIGHT_PARENTHESIS = 'right-parenthesis'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_ORTHOGONAL = 'orthogonal'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_FOREWARD_SLASH = 'foreward-slash'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_BACKSLASHE = 'backslashe'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_VERTICAL_LINE = 'vertical-line'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_ANGLE_BRACKET = 'left=angle-bracket'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_VERTICALE_LINE_LEFT_ANGLE_BACKET = 'verticale-line-and-left-angle-backet'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_VERTICAL_LINE = 'circle-and-vertical-line'
  public static CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_LEFT_BACKET = 'circle-and-left-backet'

  public static CONNECTOR_ARROW_DISPLAY_MODE_TOP = 'top'
  public static CONNECTOR_ARROW_DISPLAY_MODE_BOTTOM = 'bottom'
  public static CONNECTOR_ARROW_DISPLAY_MODE_FULL = 'full'

  public static CONNECTOR_DIRECTION_LEFT = 'left'
  public static CONNECTOR_DIRECTION_TOP = 'top'
  public static CONNECTOR_DIRECTION_RIGHT = 'right'
  public static CONNECTOR_DIRECTION_BOTTOM = 'bottom'

  public static CONNECTOR_LINE_MODE_SIGNLE = 'single'
  public static CONNECTOR_LINE_MODE_DOUBLE = 'double'
  public static CONNECTOR_LINE_MODE_DOUBLE_START = 'double-start'
  public static CONNECTOR_LINE_MODE_DOUBLE_END = 'double-end'
  public static CONNECTOR_LINE_MODE_DOUBLE_BOTH = 'double-both'

  public static CONNECTOR_LINE_TYPE_STRAIGHT = 'straight'
  public static CONNECTOR_LINE_TYPE_CURVED = 'curved'
  public static CONNECTOR_LINE_TYPE_ORTHOGONAL = 'orthogonal'

  public static DOUBLE_LINE_GAP_DEFAULT = 6
  public static DOUBLE_LINE_ARROW_LENGTH_DEFAULT = 12
  public static DOUBLE_LINE_ARROW_DISTANCE_DEFAULT = 6

  public static FONT_WEIGHT_INVISIBLE = 'invisible'
  public static FONT_WEIGHT_THIN = 'thin'
  public static FONT_WEIGHT_EXTRA_LIGNT = 'extra-thin'
  public static FONT_WEIGHT_LIGHT = 'light'
  public static FONT_WEIGHT_NORMAL = 'normal'
  public static FONT_WEIGHT_MEDIUM = 'medium'
  public static FONT_WEIGHT_SEMI_BOLD = 'semi-bold'
  public static FONT_WEIGHT_BOLD = 'bold'
  public static FONT_WEIGHT_EXTRA_BOLD = 'extra-bold'
  public static FONT_WEIGHT_BLACK = 'black'
  public static FONT_WEIGHT_EXTRA_BLACK = 'extra-black'

  public static FONT_WIDTH_ULTRA_CONDENSED = 'ultra-condensed'
  public static FONT_WIDTH_EXTRA_CONDENSED = 'extra-condested'
  public static FONT_WIDTH_CONDENSED = 'condensed'
  public static FONT_WIDTH_SEMI_CONDENSED = 'semi-condensed'
  public static FONT_WIDTH_NORMAL = 'normal'
  public static FONT_WIDTH_SEMI_EXPANDED = 'semi-expanded'
  public static FONT_WIDTH_EXPANDED = 'expanded'
  public static FONT_WIDTH_EXTRA_EXPANDED = 'extra-expanded'
  public static FONT_WIDTH_ULTRA_EXPANDED = 'ultra-expanded'

  public static FONT_SLANT_UP_RIGHT = 'up-right'
  public static FONT_SLANT_ITALIC = 'italic'
  public static FONT_SLANT_OBLIQUE = 'oblique'

  public static LINE_WIDTH_DEFAULT = 1
  public static LINE_WIDTH_MIN = 0.25
  public static LINE_WIDTH_MAX = 64

  public static PLACE_HOLDER_ALIGNMENT_BASELINE = 'baseline'
  public static PLACE_HOLDER_ALIGNMENT_ABOVE_BASELINE = 'above-baseline'
  public static PLACE_HOLDER_ALIGNMENT_BELOW_BASELINE = 'below-baseline'
  public static PLACE_HOLDER_ALIGNMENT_TOP = 'top'
  public static PLACE_HOLDER_ALIGNMENT_BOTTOM = 'bottom'
  public static PLACE_HOLDER_ALIGNMENT_MIDDLE = 'middle'

  public static STROKE_DASH_STYLE_SOLID = 'solid'
  public static STROKE_DASH_STYLE_DASH = 'dash'
  public static STROKE_DASH_STYLE_DOT = 'dot'
  public static STROKE_DASH_STYLE_DASH_DOT = 'dash-dot'
  public static STROKE_DASH_STYLE_DASH_DOT_DOT = 'dash-dot-dot'
  public static STROKE_DASH_STYLE_CUSTOM = 'custom'

  public static TEXT_ALIGNMENT_LEFT = 'left'
  public static TEXT_ALIGNMENT_RIGHT = 'right'
  public static TEXT_ALIGNMENT_CENTER = 'center'
  public static TEXT_ALIGNMENT_JUSTIFY = 'justify'
  public static TEXT_ALIGNMENT_START = 'start'
  public static TEXT_ALIGNMENT_END = 'end'

  public static TEXT_DECORATION_NONE = 'none'
  public static TEXT_DECORATION_UNDERLINE = 'underline'
  public static TEXT_DECORATION_OVERLINE = 'overline'
  public static TEXT_DECORATION_LINETHROUGH = 'linethrough'
}
