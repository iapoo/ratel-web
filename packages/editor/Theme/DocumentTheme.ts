import { Color, Colors } from '@ratel-web/engine'

export interface DocumentThemeType {
  name: string
  description: string
  isDefault: boolean
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
  public static TYPE_DEFAULT_5 = 'Default5'
  public static DESC_DEFAULT_5 = 'Default5'
  public static TYPE_DEFAULT_6 = 'Default6'
  public static DESC_DEFAULT_6 = 'Default6'
  public static TYPE_DEFAULT_7 = 'Default7'
  public static DESC_DEFAULT_7 = 'Default7'
  public static TYPE_DEFAULT_8 = 'Default8'
  public static DESC_DEFAULT_8 = 'Default8'
  public static TYPE_DEFAULT_9 = 'Default9'
  public static DESC_DEFAULT_9 = 'Default9'
  public static TYPE_DEFAULT_10 = 'Default10'
  public static DESC_DEFAULT_10 = 'Default10'
  public static TYPE_DEFAULT_11 = 'Default11'
  public static DESC_DEFAULT_11 = 'Default11'
  public static TYPE_DEFAULT_12 = 'Default12'
  public static DESC_DEFAULT_12 = 'Default12'
  public static TYPE_DEFAULT_13 = 'Default13'
  public static DESC_DEFAULT_13 = 'Default13'
  public static TYPE_DEFAULT_14 = 'Default14'
  public static DESC_DEFAULT_14 = 'Default14'
  public static TYPE_DEFAULT_15 = 'Default15'
  public static DESC_DEFAULT_15 = 'Default15'
  public static TYPE_DEFAULT_16 = 'Default16'
  public static DESC_DEFAULT_16 = 'Default16'
  public static TYPE_DEFAULT_17 = 'Default17'
  public static DESC_DEFAULT_17 = 'Default17'
  public static TYPE_DEFAULT_18 = 'Default18'
  public static DESC_DEFAULT_18 = 'Default18'
  public static TYPE_DEFAULT_19 = 'Default19'
  public static DESC_DEFAULT_19 = 'Default19'
  public static TYPE_DEFAULT_20 = 'Default20'
  public static DESC_DEFAULT_20 = 'Default20'
}

export const DocumentThemeTypes = [
  {
    name: DocumentThemes.TYPE_DEFAULT,
    description: DocumentThemes.DESC_DEFAULT,
    isDefault: true,
    shapeStrokeColor: '#323232',
    shapeFillColor: '#FFFFFF',
    shapeFontColor: '#323232',
    connectorStrokeColor: '#323232',
    connectorFillColor: '#FFFFFF',
    connectorFontColor: '#323232',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_2,
    description: DocumentThemes.DESC_DEFAULT_2,
    isDefault: false,
    shapeStrokeColor: '#E07A5F',
    shapeFillColor: '#F2CC8F',
    shapeFontColor: '#000000',
    connectorStrokeColor: '#E07A5F',
    connectorFillColor: '#F2CC8F',
    connectorFontColor: '#000000',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_3,
    description: DocumentThemes.DESC_DEFAULT_3,
    isDefault: false,
    shapeStrokeColor: '#A6611A',
    shapeFillColor: '#DFC27D',
    shapeFontColor: '#A6611A',
    connectorStrokeColor: '#A6611A',
    connectorFillColor: '#DFC27D',
    connectorFontColor: '#A6611A',
    pageBackgroundColor: '#DFC27D',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_4,
    description: DocumentThemes.DESC_DEFAULT_4,
    isDefault: false,
    shapeStrokeColor: '#018571',
    shapeFillColor: '#80CDC1',
    shapeFontColor: '#018571',
    connectorStrokeColor: '#018571',
    connectorFillColor: '#80CDC1',
    connectorFontColor: '#018571',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_5,
    description: DocumentThemes.DESC_DEFAULT_5,
    isDefault: false,
    shapeStrokeColor: '#D01C8B',
    shapeFillColor: '#F1B6DA',
    shapeFontColor: '#D01C8B',
    connectorStrokeColor: '#D01C8B',
    connectorFillColor: '#F1B6DA',
    connectorFontColor: '#D01C8B',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_6,
    description: DocumentThemes.DESC_DEFAULT_6,
    isDefault: false,
    shapeStrokeColor: '#4DAC26',
    shapeFillColor: '#B8E186',
    shapeFontColor: '#4DAC26',
    connectorStrokeColor: '#4DAC26',
    connectorFillColor: '#B8E186',
    connectorFontColor: '#4DAC26',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_7,
    description: DocumentThemes.DESC_DEFAULT_7,
    isDefault: false,
    shapeStrokeColor: '#7B3294',
    shapeFillColor: '#C2A5CF',
    shapeFontColor: '#7B3294',
    connectorStrokeColor: '#7B3294',
    connectorFillColor: '#C2A5CF',
    connectorFontColor: '#7B3294',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_8,
    description: DocumentThemes.DESC_DEFAULT_8,
    isDefault: false,
    shapeStrokeColor: '#008837',
    shapeFillColor: '#A6DBA0',
    shapeFontColor: '#008837',
    connectorStrokeColor: '#008837',
    connectorFillColor: '#A6DBA0',
    connectorFontColor: '#008837',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_9,
    description: DocumentThemes.DESC_DEFAULT_9,
    isDefault: false,
    shapeStrokeColor: '#E66101',
    shapeFillColor: '#FDB863',
    shapeFontColor: '#E66101',
    connectorStrokeColor: '#E66101',
    connectorFillColor: '#FDB863',
    connectorFontColor: '#E66101',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_10,
    description: DocumentThemes.DESC_DEFAULT_10,
    isDefault: false,
    shapeStrokeColor: '#5E3C99',
    shapeFillColor: '#B2ABD2',
    shapeFontColor: '#5E3C99',
    connectorStrokeColor: '#5E3C99',
    connectorFillColor: '#B2ABD2',
    connectorFontColor: '#5E3C99',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_11,
    description: DocumentThemes.DESC_DEFAULT_11,
    isDefault: false,
    shapeStrokeColor: '#CA0020',
    shapeFillColor: '#F4A582',
    shapeFontColor: '#CA0020',
    connectorStrokeColor: '#CA0020',
    connectorFillColor: '#F4A582',
    connectorFontColor: '#CA0020',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_12,
    description: DocumentThemes.DESC_DEFAULT_12,
    isDefault: false,
    shapeStrokeColor: '#0571B0',
    shapeFillColor: '#92C5DE',
    shapeFontColor: '#0571B0',
    connectorStrokeColor: '#0571B0',
    connectorFillColor: '#92C5DE',
    connectorFontColor: '#0571B0',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_13,
    description: DocumentThemes.DESC_DEFAULT_13,
    isDefault: false,
    shapeStrokeColor: '#404040',
    shapeFillColor: '#BABABA',
    shapeFontColor: '#404040',
    connectorStrokeColor: '#404040',
    connectorFillColor: '#BABABA',
    connectorFontColor: '#404040',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_14,
    description: DocumentThemes.DESC_DEFAULT_14,
    isDefault: false,
    shapeStrokeColor: '#2C7BB6',
    shapeFillColor: '#ABD9E9',
    shapeFontColor: '#2C7BB6',
    connectorStrokeColor: '#2C7BB6',
    connectorFillColor: '#ABD9E9',
    connectorFontColor: '#2C7BB6',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_15,
    description: DocumentThemes.DESC_DEFAULT_15,
    isDefault: false,
    shapeStrokeColor: '#1A9641',
    shapeFillColor: '#A6D96A',
    shapeFontColor: '#1A9641',
    connectorStrokeColor: '#1A9641',
    connectorFillColor: '#A6D96A',
    connectorFontColor: '#1A9641',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_16,
    description: DocumentThemes.DESC_DEFAULT_16,
    isDefault: false,
    shapeStrokeColor: '#2B83BA',
    shapeFillColor: '#ABDDA4',
    shapeFontColor: '#2B83BA',
    connectorStrokeColor: '#2B83BA',
    connectorFillColor: '#ABDDA4',
    connectorFontColor: '#2B83BA',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_17,
    description: DocumentThemes.DESC_DEFAULT_17,
    isDefault: false,
    shapeStrokeColor: '#D7192C',
    shapeFillColor: '#FFFF6F',
    shapeFontColor: '#D7192C',
    connectorStrokeColor: '#D7192C',
    connectorFillColor: '#FFFF6F',
    connectorFontColor: '#D7192C',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_18,
    description: DocumentThemes.DESC_DEFAULT_18,
    isDefault: false,
    shapeStrokeColor: '#2C7BB6',
    shapeFillColor: '#FFFF6F',
    shapeFontColor: '#2C7BB6',
    connectorStrokeColor: '#2C7BB6',
    connectorFillColor: '#FFFF6F',
    connectorFontColor: '#2C7BB6',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_19,
    description: DocumentThemes.DESC_DEFAULT_19,
    isDefault: false,
    shapeStrokeColor: '#1A9641',
    shapeFillColor: '#A6D96A',
    shapeFontColor: '#1A9641',
    connectorStrokeColor: '#1A9641',
    connectorFillColor: '#A6D96A',
    connectorFontColor: '#1A9641',
    pageBackgroundColor: '#FFFFFF',
  },
  {
    name: DocumentThemes.TYPE_DEFAULT_20,
    description: DocumentThemes.DESC_DEFAULT_20,
    isDefault: false,
    shapeStrokeColor: '#2B83BA',
    shapeFillColor: '#4DAC26',
    shapeFontColor: '#2B83BA',
    connectorStrokeColor: '#2B83BA',
    connectorFillColor: '#4DAC26',
    connectorFontColor: '#2B83BA',
    pageBackgroundColor: '#FFFFFF',
  },
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
