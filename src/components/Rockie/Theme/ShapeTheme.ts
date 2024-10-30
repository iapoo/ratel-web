import { Colors, Color, } from '@/components/Engine'

export interface ShapeThemeType {
  name: string
  description: string
  shapeStrokeColor: Color
  shapeFillColor: Color
  shapeFontColor: Color
}

export class ShapeThemes {
  public static TYPE_DEFAULT = 'Default'
  public static DESC_DEFAULT = 'Default'
}

export const ShapeThemeTypes = [
  { name: ShapeThemes.TYPE_DEFAULT, description: ShapeThemes.DESC_DEFAULT, shapeStrokeColor: Colors.Black, shapeFillColor: Colors.White, shapeFontColor: Colors.Black },
]

export class ShapeTheme {
  public static DEFAULT_STROKE_COLOR = Colors.Red
  public static DEFAULT_FILL_COLOR = Colors.Blue

  public get rounded(): boolean {
    return false
  }

  public get glass(): boolean {
    return false
  }

  public get sketch(): boolean {
    return false
  }

  public get shadow(): boolean {
    return false
  }

  public get shapeStrokeColor(): Color {
    return Colors.Black
  }

  public get shapeFillColor(): Color {
    return Colors.White
  }

  public get shapeFontColor(): Color {
    return Colors.Black
  }

}
