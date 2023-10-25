import {  Colors, Color, FontWeight, FontWidth, FontSlant, TextAlignment, TextDirection, StrokeDashStyle, } from '@/components/Engine'
import { ClassicTheme } from './ClassicTheme'
import { DarkTheme } from './DarkTheme'
import { ThemeConstants } from './Theme'

export class ThemeUtils {
  public static get strokeColor(): Color {
    return Colors.Black
  }

  public static get fillColor(): Color {
    return Colors.White
  }

  public static get lineWidth(): number {
    return 2
  }

  public static get strokeDashStyle(): StrokeDashStyle {
    return StrokeDashStyle.SOLID
  }

  public static get fontName(): string {
    return ''
  }

  public static get fontColor(): Color {
    return Colors.Black
  }


  public static get fontSize(): number {
    return ThemeConstants.FONT_SIZE_DEFAULT
  }


  public static get fontWeight(): FontWeight {
    return FontWeight.NORMAL
  }

  public static get fontWidth(): FontWidth {
    return FontWidth.NORMAL
  }

  public static get fontSlant(): FontSlant {
    return FontSlant.UP_RIGHT
  }


  public static get textAlignment(): TextAlignment {
    return TextAlignment.LEFT
  }


  public static get textDirection(): TextDirection {
    return TextDirection.LTR
  }


  public static get textWrap(): boolean {
    return true
  }


  public static get multipleLines(): boolean {
    return false
  }

  public static get stroked(): boolean {
    return true
  }

  public static get filled(): boolean {
    return true
  }

}
