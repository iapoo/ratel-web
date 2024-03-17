import {  Colors, Color, FontWeight, FontWidth, FontSlant, TextAlignment, TextDirection, StrokeDashStyle, TextDecoration, PlaceholderAlignment, TextVerticalAlignment, } from '@/components/Engine'
import { ThemeConstants } from './Theme'

export class EditorUtils {

  public static get rangeSelectionFillAlpha(): number {
      return 0.2
  }

  public static get rangeSelectionFillColor(): Color {
    return Colors.Green
  }

  public static get rangeSelectionStrokeColor(): Color {
    return Colors.Blue
  }

  public static get rangeSelectionStrokeLineWidth(): number {
    return 1
  }

  public static get rangeSelectionStrokeAntiAlias(): boolean {
    return false
  }

  public static get rangeSelectionStrokeAlpha(): number {
    return 0.7
  }

  public static get containerSelectionFillAlpha(): number {
    return 0.3
  }

  public static get containerSelectionFillColor(): Color {
    return Colors.Green
  }

  public static get containerSelectionStrokeLineWidth(): number {
    return 3
  }

  public static get containerSelectionStrokeColor(): Color {
    return Colors.Blue
  }
  
  public static get selectionOutlineStrokeDashStyle(): StrokeDashStyle {
    return StrokeDashStyle.DASH
  }

  public static get selectionOutlineStrokeColor(): Color {
    return Colors.Blue
  }

  public static get selectionOutlineStrokeLineWidth(): number {
    return 1
  }

  public static get selectionOutlineStrokeAntiAlias(): boolean {
    return false
  }

  public static get tableActiveCellStrokeDashStyle(): StrokeDashStyle {
    return StrokeDashStyle.SOLID
  }
  
  public static get tableActiveCellStrokeColor(): Color {
    return Colors.DarkGreen
  }

  public static get tableActiveCellStrokeLineWidth(): number {
    return 3
  }

  public static get tableActiveCellStrokeAntiAlias(): boolean {
    return true
  }

  public static get tableActiveCellMargin(): number {
    return 0
  }
}
