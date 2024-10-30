import { Colors, Color, FontWeight, FontWidth, FontSlant, TextAlignment, TextDirection, StrokeDashStyle, TextDecoration, PlaceholderAlignment, TextVerticalAlignment, } from '@/components/Engine'
import { ClassicTheme } from './ClassicTheme'
import { DarkTheme } from './DarkTheme'
import { ThemeConstants } from './Theme'
import { DocumentTheme, DocumentThemeType, DocumentThemeTypes } from './DocumentTheme'
import { SystemUtils } from '@/components/Workspace/Utils'

export class ThemeUtils {
  private static documentThemeMap = new Map<string, DocumentThemeType>()
  private static initialized = false

  private static initializeTheme() {
    DocumentThemeTypes.forEach(themeType => {
      ThemeUtils.documentThemeMap.set(themeType.name, themeType)
    })
  }

  public static isDefault(themeName: string): boolean {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      return documentThemeType.isDefault
    } else {
      return true
    }
  }

  public static getDocumentTheme(themeName: string): DocumentThemeType {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      return documentThemeType
    } else {
      return DocumentThemeTypes[0]
    }
  }

  public static getShapeStrokeColor(themeName: string): Color {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      const color = SystemUtils.parseColorString(documentThemeType.shapeStrokeColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    } else {
      const color = SystemUtils.parseColorString(DocumentThemeTypes[0].shapeStrokeColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    }
  }

  public static getShapeFillColor(themeName: string): Color {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      const color = SystemUtils.parseColorString(documentThemeType.shapeFillColor)
      if (color) {
        return color
      } else {
        return Colors.White
      }
    } else {
      const color = SystemUtils.parseColorString(DocumentThemeTypes[0].shapeFillColor)
      if (color) {
        return color
      } else {
        return Colors.White
      }
    }
  }

  public static getShapeFontColor(themeName: string): Color {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      const color = SystemUtils.parseColorString(documentThemeType.shapeFontColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    } else {
      const color = SystemUtils.parseColorString(DocumentThemeTypes[0].shapeFontColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    }
  }

  public static getConnectorStrokeColor(themeName: string): Color {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      const color = SystemUtils.parseColorString(documentThemeType.connectorStrokeColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    } else {
      const color = SystemUtils.parseColorString(DocumentThemeTypes[0].connectorStrokeColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    }
  }

  public static getConnectorFillColor(themeName: string): Color {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      const color = SystemUtils.parseColorString(documentThemeType.connectorFillColor)
      if (color) {
        return color
      } else {
        return Colors.White
      }
    } else {
      const color = SystemUtils.parseColorString(DocumentThemeTypes[0].connectorFillColor)
      if (color) {
        return color
      } else {
        return Colors.White
      }
    }
  }

  public static getConnectorFontColor(themeName: string): Color {
    if (!ThemeUtils.initialized) {
      ThemeUtils.initializeTheme()
    }
    const documentThemeType = ThemeUtils.documentThemeMap.get(themeName)
    if (documentThemeType) {
      const color = SystemUtils.parseColorString(documentThemeType.connectorFontColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    } else {
      const color = SystemUtils.parseColorString(DocumentThemeTypes[0].connectorFontColor)
      if (color) {
        return color
      } else {
        return Colors.Black
      }
    }
  }

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
    return TextAlignment.CENTER
  }

  public static get textDecoration(): TextDecoration {
    return TextDecoration.NONE
  }

  public static get textVerticalAlignment(): TextVerticalAlignment {
    return TextVerticalAlignment.MIDDLE
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
