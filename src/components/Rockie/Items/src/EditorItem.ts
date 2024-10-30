import { Color, FontSlant, FontWeight, FontWidth, Matrix, Rectangle, Rotation, StrokeDashStyle, TextAlignment, TextDecoration, TextDirection, TextVerticalAlignment, } from '@/components/Engine'
import { EntityShape, } from '../../Shapes'
import { EditorItemInfo } from '../../Items'
import { Editor } from '../../Editor'

export interface EditorItem {
  readonly shape: EntityShape
  boundary: Rectangle
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
  readonly right: number
  readonly bottom: number
  readonly minWidth: number
  readonly minHeight: number
  readonly text: string
  readonly items: EditorItem[]
  readonly category: string
  readonly type: string
  readonly rotation: Rotation
  readonly worldTransform: Matrix
  readonly worldInverseTransform: Matrix | null
  readonly internalTransform: Matrix
  locked: boolean
  useTheme: boolean
  themeName: string
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
  textVerticalAlignment: TextVerticalAlignment
  textWrap: boolean
  multipleLines: boolean
  filled: boolean
  stroked: boolean
  strokeDashStyle: StrokeDashStyle
  id: string
  secondStrokeColor: Color
  secondFillColor: Color
  thirdStrokeColor: Color
  thirdFillColor: Color
  fourthStrokeColor: Color
  fourthFillColor: Color
  saveData: () => EditorItemInfo
  loadData: (data: EditorItemInfo, editor: Editor) => void
  //clone: () => EditorItem
}
