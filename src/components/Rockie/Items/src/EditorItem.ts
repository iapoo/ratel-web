import { Color, FontSlant, FontWeight, FontWidth, Rectangle, Rotation, StrokeDashStyle, TextAlignment, TextDecoration, TextDirection, } from '@/components/Engine'
import { EntityShape, } from '../../Shapes'
import { EditorItemInfo } from '../../Items';
import { Editor } from '../../Editor';

export interface EditorItem {
  readonly shape: EntityShape;
  boundary: Rectangle;
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
  readonly right: number;
  readonly bottom: number;
  readonly minWidth: number;
  readonly minHeight: number;
  readonly text: string;
  readonly items: EditorItem[]
  readonly category: string;
  readonly type: string;
  readonly rotation: Rotation;
  readonly useTheme: boolean
  strokeColor: Color 
  fillColor: Color 
  lineWidth: number
  fontName: string
  fontColor: Color
  fontSize: number
  fontWidth: FontWidth
  fontWeight: FontWeight
  fontSlant: FontSlant
  textAlignment: TextAlignment
  textDirection: TextDirection
  textDecoration: TextDecoration
  textWrap: boolean
  multipleLines: boolean
  filled: boolean
  stroked: boolean
  strokeDashStyle: StrokeDashStyle
  id: string;
  saveData: () => EditorItemInfo;
  loadData: (data: EditorItemInfo, editor: Editor) => void;
  //clone: () => EditorItem
}
