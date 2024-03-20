import {  Colors, Color, } from '@/components/Engine'

export interface DocumentThemeType {  
  name: string
  description: string
  shapeStrokeColor: string
  shapeFillColor: string
  shapeFontColor: string
  connectorStrokeColor: string
  connectorFillColor: string
  connectorFontColor: string
  pageBackgroundColor: string
}

export class DocumentThemes {
  public static TYPE_DEFAULT = 'Default'
  public static DESC_DEFAULT = 'Default'
  public static TYPE_DEFAULT_2 = 'Default2'
  public static DESC_DEFAULT_2 = 'Default2'
  public static TYPE_DEFAULT_3 = 'Default3'
  public static DESC_DEFAULT_3 = 'Default3'
  public static TYPE_DEFAULT_4 = 'Default4'
  public static DESC_DEFAULT_4 = 'Default4'
}


export const DocumentThemeTypes = [
  {name: DocumentThemes.TYPE_DEFAULT, description: DocumentThemes.DESC_DEFAULT, shapeStrokeColor: '#000000', shapeFillColor: '#FFFFFF', shapeFontColor: '#000000',
    connectorStrokeColor: '#000000', connectorFillColor: '#FFFFFF', connectorFontColor: '#000000', pageBackgroundColor: '#FFFFFF', },
  {name: DocumentThemes.TYPE_DEFAULT_2, description: DocumentThemes.DESC_DEFAULT_2, shapeStrokeColor: '#E07A5F', shapeFillColor: '#F2CC8F', shapeFontColor: '#000000',
    connectorStrokeColor: '#000000', connectorFillColor: '#FFFFFF', connectorFontColor: '#000000', pageBackgroundColor: '#FFFFFF', },
  {name: DocumentThemes.TYPE_DEFAULT_3, description: DocumentThemes.DESC_DEFAULT_3, shapeStrokeColor: '#000000', shapeFillColor: '#FFFFFF', shapeFontColor: '#000000',
    connectorStrokeColor: '#000000', connectorFillColor: '#FFFFFF', connectorFontColor: '#000000', pageBackgroundColor: '#FFFFFF', },
  {name: DocumentThemes.TYPE_DEFAULT_4, description: DocumentThemes.DESC_DEFAULT_4, shapeStrokeColor: '#000000', shapeFillColor: '#FFFFFF', shapeFontColor: '#000000',
    connectorStrokeColor: '#000000', connectorFillColor: '#FFFFFF', connectorFontColor: '#000000', pageBackgroundColor: '#FFFFFF', },
]

export class DocumentTheme {

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

  public get connectorStrokeColor(): Color {
    return Colors.Black
  }

  public get connectorFillColor(): Color {
    return Colors.White
  }

  public get connectorFontColor(): Color {
    return Colors.Black
  }

  public get pageBackgroundColor(): Color {
    return Colors.White
  }
}
