import axios, { AxiosResponse, AxiosRequestConfig, } from 'axios'

export enum WebFontStatus {
  NOT_LOADED,
  LOADING,
  LOADING_ERROR,
  LOADED,
  NOT_FOOUND,
}

export class UnicodeRange {
  public begin: number = 0
  public end: number = 0
}

export class WebFont {
  public isSystemFont: boolean = false
  public fontFamily: string = ''
  public url: string = ''
  public src: string = ''
  public status: WebFontStatus = WebFontStatus.NOT_LOADED
  public fontData: Blob | undefined = undefined
  public fontWeight: string = '400'
  public fontStyle: string = ''
  public unicodeRanges: UnicodeRange[] = []
}

export interface LanguageFont {
  language: string
  defaultLatinFont: string
  defaultNonLatinFont: string
  fonts: string
}

export const LanguageFonts = [
  {language: 'en-US', defaultLatinFont: 'Roboto', defaultNonLatinFont: 'NotoSerifSC', fonts: ['Roboto', 'Lato', 'Open Sans', 'Source Sans Pro', 'Roboto Slab',]},
  {language: 'zh-CN', defaultLatinFont: 'Roboto', defaultNonLatinFont: 'NotoSerifSC', fonts: ['Roboto', 'Noto Serif SC', 'Noto Sans SC']},
]

export const SystemFonts = [
  {fontName: 'Roboto', fontUrl: '/fonts/Roboto-Regular.woff2'},
  {fontName: 'NotoSansSC', fontUrl: '/fonts/Roboto-Regular.woff2'},
  {fontName: 'NotoSerifSC', fontUrl: '/fonts/Roboto-Regular.woff2'},
]

export const MotoSerifSCStyleText = `
`

export class WebFonts {  
  private _webFonts: Map<string, WebFont[]> = new Map<string, WebFont[]>()
  
  public initialize() {

  }

  public registWebFont(key: string, webFont: WebFont) {    
    let fonts = this._webFonts.get(key)
    if(!fonts) {
      fonts = []
      this._webFonts.set(key, fonts)
    }
    let exists = false
    fonts.forEach(font => {
      if(webFont.url == font.url) {
        exists = true
      }
    })
    if(!exists) {
      fonts.push(webFont)
    }
  }

  public getWebFontKeys() {
    return this._webFonts.keys
  }

  public getWebFont(key: string) {
    return this._webFonts.get(key)
  }

  private async registSystemFont(fontName: string, fontUrl: string) {
    const webFont = new WebFont()
    const response = await fetch(fontUrl)
    const fontData = await response.arrayBuffer()
  }
}

export class EngineUtils {
  public static FONT_NAME_DEFAULT = 'NotoSerifSC'
  //public static FONT_NAME_SANS = 'Sans'
  //public static FONT_NAME_SERIF = 'Serif'
  public static FONT_NAME_ROBOTO = 'Roboto'
  public static FONT_NAME_NOTOSERIFSC = 'NotoSerifSC'
  public static FONT_SIZE_DEFAULT = 14
  public static webFonts: WebFonts = new WebFonts()
  
  public static getCanvasKitWasm = () => {
    return axios.get(`/resources/canvaskit.wasm`, {
      headers: {
        'Content-Type': 'application/wasm',
      },
      responseType: 'arraybuffer',
    })
  }

  public static getWebFontStyleSheet(familyName: string) {
    return axios.get(`https://fonts.googleapis.com/css?family=${familyName}`)
  }

  public static async getWebFontData(familyName: string) {
    const fontStyleSheet = await EngineUtils.getWebFontStyleSheet(familyName)
    //console.log(`${fontStyleSheet}`)
    if (fontStyleSheet.status == 200) {
      const style = document.createElement('style')
      const cssTextNode = document.createTextNode(fontStyleSheet.data)
      style.appendChild(cssTextNode)
      document.head.appendChild(style)
      const styleSheet = style.sheet
      if (styleSheet) {
        if (styleSheet.cssRules.length > 0) {
          for (let i = 0; i < styleSheet.cssRules.length; i++) {
            const cssRule = styleSheet.cssRules.item(i)
            if (cssRule) {
              //console.log(cssRule.cssText)
              if (cssRule instanceof CSSFontFaceRule) {
                //console.log(cssRule.style)
                if (cssRule.style) {
                  const webFont = new WebFont()
                  const fontFamily = cssRule.style['font-family']
                  const fontStyle = cssRule.style['font-style']
                  const fontWeight = cssRule.style['font-weight']
                  const src = cssRule.style['src']
                  const unicodeRange: string = cssRule.style['unicode-range']

                  webFont.fontFamily = fontFamily
                  webFont.src = src
                  webFont.fontStyle = fontStyle
                  webFont.fontWeight = fontWeight
                  EngineUtils.webFonts.registWebFont(fontFamily, webFont)

                  const urlRegexp = /url\((\"https\:\/\/fonts\.gstatic\.com\/.*)\) format/gm
                  const urlMatch = urlRegexp.exec(src)
                  if (urlMatch != null) {
                    const url = urlMatch[0].substring(5, urlMatch[0].length - 9)
                    webFont.url = url
                    console.log(`${url}`)
                  } else {
                    console.log(`Exception found, error url: ${src}`)
                  }
                  const ranges = unicodeRange.split(',')
                  const rangeRegexp1 = /U\+([0-9A-F]{1,6})-([0-9A-F]{1,6})/igm
                  const rangeRegexp2 = /U\+([0-9A-F]{1,6})/igm
                  for (let i = 0; i < ranges.length; i++) {
                    const range = ranges[i].trim()
                    const rangeMatch1 = rangeRegexp1.exec(range)
                    if (rangeMatch1 != null) {
                      const beginRange = rangeMatch1[1]
                      const endRange = rangeMatch1[2]
                      const fontUnicodeRange = new UnicodeRange()
                      fontUnicodeRange.begin = parseInt(beginRange, 16)
                      fontUnicodeRange.end = parseInt(endRange, 16)
                      webFont.unicodeRanges.push(fontUnicodeRange)
                      console.log(` ==== ${rangeMatch1}`)
                    } else {
                      const rangeMatch2 = rangeRegexp2.exec(unicodeRange)
                      if (rangeMatch2 != null) {
                        const beginRangee = rangeMatch2[1]
                        const fontUnicodeRange = new UnicodeRange()
                        fontUnicodeRange.begin = parseInt(beginRangee, 16)
                        fontUnicodeRange.end = fontUnicodeRange.begin
                        webFont.unicodeRanges.push(fontUnicodeRange)
                        console.log(` ==== ${rangeMatch2}`)
                      } else {
                        console.log(`Exception found, error unicode range : ${range}`)
                      }
                    }
                  }
                  console.log(`${fontFamily}`)
                  console.log(`${fontStyle}`)
                  console.log(`${fontWeight}`)
                  console.log(`${src}`)
                  console.log(`${unicodeRange}`)
                }
              }
            }
          }
        }
        document.head.removeChild(style)
      }
      return true
    } else {
      return false
    }
  }
}
