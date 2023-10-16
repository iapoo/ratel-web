import {  Colors, Color, FontWeight, FontWidth, FontSlant, TextAlignment, TextDirection, } from '@/components/Engine'
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
    return 1
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


}
