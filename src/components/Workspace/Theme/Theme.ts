import {  Colors, Color, } from '@/components/Engine'
import { ClassicTheme } from './ClassicTheme'
import { DarkTheme } from './DarkTheme'

export enum ThemeKind {
  CLASSIC,
  DARK
}

export enum Theme {
  STROKE_COLOR = 'StrokeColor',
  FILL_COLOR = 'FillColor'  
}

export class ThemeConstants {
  public static FONT_SIZE_DEFAULT = 14
  public static TEXT_ALIGNMENT_LEFT = 'Left'
  public static TEXT_ALIGNMENT_RIGHT = 'Right'
  public static TEXT_ALIGNMENT_CENTER = 'Center'
  public static TEXT_ALIGNMENT_JUSTIFY = 'Justify'
  public static TEXT_ALIGNMENT_START = 'Start'
  public static TEXT_ALIGNMENT_END = 'End'
}

export abstract class Themes {
  public static DEFAULT_STROKE_COLOR = Colors.Red
  public static DEFAULT_FILL_COLOR = Colors.Blue

  private static _kind: ThemeKind = ThemeKind.CLASSIC
  private static _current: Themes = new ClassicTheme()

  public static get current() {
    return Themes._current
  }

  public static get kind() {
    return this._kind
  }

  public static set kind(value: ThemeKind) {
    this._kind = value  
    switch(value) {
      case ThemeKind.CLASSIC:
        Themes._current = new ClassicTheme()
        break
      case ThemeKind.DARK:
        Themes._current = new DarkTheme()
        break
    }
  }

  public static strokeColor = Themes.DEFAULT_STROKE_COLOR
  public static fillColor = Themes.DEFAULT_STROKE_COLOR
}
