import {  Colors, Color, } from '@/components/Engine'
import { ClassicTheme } from './ClassicTheme'
import { DarkTheme } from './DarkTheme'

export class ThemeUtils {
  public static get strokeColor(): Color {
    return Colors.Red
  }

  public static get fillColor(): Color {
    return Colors.Green
  }
}
