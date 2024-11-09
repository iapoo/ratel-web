import { Color, Colors, StrokeDashStyle } from '@ratel-web/engine'

export class EditorUtils {
  private static _enableDarkTheme = false

  public static set enableDarkTheme(value: boolean) {
    EditorUtils._enableDarkTheme = value
  }

  public static get enableDarkTheme() {
    return EditorUtils._enableDarkTheme
  }

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

  public static get backgroundSpaceColor(): Color {
    if (EditorUtils.enableDarkTheme) {
      return new Color(60, 60, 60, 255)
    } else {
      return Colors.Gainsboro
    }
  }

  public static get backgroundWorkColor(): Color {
    if (EditorUtils.enableDarkTheme) {
      return Colors.White
    } else {
      return Colors.White
    }
  }

  public static get anchorAdapterFillColor(): Color {
    return Colors.LawnGreen
  }

  public static get anchorAdapterStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorAdapterStrokeLineWidth(): number {
    return 1
  }

  public static get anchorConnectorFillColor(): Color {
    return Colors.LawnGreen
  }

  public static get anchorConnectorStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorConnectorStrokeLineWidth(): number {
    return 1
  }

  public static get anchorControllerFillColor(): Color {
    return Colors.GreenYellow
  }

  public static get anchorControllerStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorControllerStrokeLineWidth(): number {
    return 1
  }

  public static get anchorCubiicControllerFillColor(): Color {
    return Colors.Orange
  }

  public static get anchorCubiicControllerStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorCubiicControllerStrokeLineWidth(): number {
    return 1
  }

  public static get anchorCubiicControllerLineStrokeColor(): Color {
    return Colors.Green
  }

  public static get anchorCubiicControllerLineStrokeLineWidth(): number {
    return 1
  }

  public static get holderStrokeColor(): Color {
    return Colors.Green
  }

  public static get holderStrokeLineWidth(): number {
    return 0.5
  }

  public static get holderStrokeDashStyle(): StrokeDashStyle {
    return StrokeDashStyle.DASH
  }

  public static get anchorModifyFillColor(): Color {
    return Colors.Orange
  }

  public static get anchorModifyStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorModifyStrokeLineWidth(): number {
    return 1
  }

  public static get anchorOrthogonalDivideFillColor(): Color {
    return Colors.White
  }

  public static get anchorOrthogonalDivideStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorOrthogonalDivideStrokeLineWidth(): number {
    return 1
  }

  public static get anchorOrthogonalMovementFillColor(): Color {
    return Colors.Orange
  }

  public static get anchorOrthogonalMovementStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorOrthogonalMovementStrokeLineWidth(): number {
    return 1
  }

  public static get anchorResizeFillDefaultColor(): Color {
    return Colors.White
  }

  public static get anchorResizeFillHighlightColor(): Color {
    return Colors.SkyBlue
  }

  public static get anchorResizeStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorResizeStrokeLineWidth(): number {
    return 1
  }

  public static get anchorRotationFillColor(): Color {
    return Colors.Orange
  }

  public static get anchorRotationStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorRotationStrokeLineWidth(): number {
    return 1
  }

  public static get anchorCreationFillColor(): Color {
    return Colors.SeaGreen
  }

  public static get anchorCreationStrokeColor(): Color {
    return Colors.Blue
  }

  public static get anchorCreationStrokeLineWidth(): number {
    return 0.5
  }
}
