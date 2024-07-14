import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { CanvasKit, Typeface, TypefaceFontProvider } from "canvaskit-wasm";
import { FontStyle } from "./Graphics";

export class EngineUtils {
  public static FONT_NAME_DEFAULT = "Roboto";
  //public static FONT_NAME_SANS = 'Sans'
  //public static FONT_NAME_SERIF = 'Serif'
  public static FONT_NAME_LATO = "Lato";
  public static FONT_NAME_NOTO_SERIF_SC = "Noto Serif SC";
  public static FONT_NAME_OPEN_SANS = "Open Sans";
  public static FONT_NAME_ROBOTO_SLAB = "Roboto Slab";
  public static FONT_NAME_ROBOTO = "Roboto";
  public static FONT_NAME_SOURCE_CODE_PRO = "Source Code Pro";
  public static FONT_SIZE_DEFAULT = 14;

  public static LANG_EN_US = "en-US";
  public static LANG_ZH_CN = "zh-CN";

  //   public static getCanvasKitWasm = () => {
  //     return axios.get(`/resources/canvaskit.wasm`, {
  //       headers: {
  //         'Content-Type': 'application/wasm',
  //       },
  //       responseType: 'arraybuffer',
  //     })
  //   }
  //
}

export enum WebFontStatus {
  NOT_LOADED,
  LOADING,
  LOADING_ERROR,
  LOADED,
  NOT_FOOUND,
}

export class UnicodeRange {
  public begin: number = 0;
  public end: number = 0;
}

export class WebFont {
  public isSystemFont: boolean = false;
  public fontFamily: string = "";
  public url: string = "";
  public src: string = "";
  public status: WebFontStatus = WebFontStatus.NOT_LOADED;
  public fontData: Blob | undefined = undefined;
  public fontWeight: string = "400";
  public fontStyle: string = "";
  public unicodeRanges: UnicodeRange[] = [];
}

export interface LanguageFont {
  language: string;
  defaultLatinFont: string;
  defaultNonLatinFont: string;
  fonts: string[];
}

export const LanguageFonts: LanguageFont[] = [
  {
    language: EngineUtils.LANG_EN_US,
    defaultLatinFont: EngineUtils.FONT_NAME_ROBOTO,
    defaultNonLatinFont: EngineUtils.FONT_NAME_NOTO_SERIF_SC,
    fonts: ["Lato", "Open Sans", "Source Code Pro", "Roboto Slab"],
  },
  {
    language: EngineUtils.LANG_ZH_CN,
    defaultLatinFont: EngineUtils.FONT_NAME_ROBOTO,
    defaultNonLatinFont: EngineUtils.FONT_NAME_NOTO_SERIF_SC,
    fonts: ["Noto Sans SC"],
  },
];

export enum Languages {
  EN_US,
  ZH_CN,
}

export const SystemFonts = [
  {
    fontName: EngineUtils.FONT_NAME_LATO,
    fontUrl: process.env.PUBLIC_PATH + "/fonts/Lato-Regular.woff2",
  },
  {
    fontName: EngineUtils.FONT_NAME_OPEN_SANS,
    fontUrl: process.env.PUBLIC_PATH + "/fonts/Open-Sans-Regular.woff2",
  },
  {
    fontName: EngineUtils.FONT_NAME_ROBOTO,
    fontUrl: process.env.PUBLIC_PATH + "/fonts/Roboto-Regular.woff2",
  },
  {
    fontName: EngineUtils.FONT_NAME_ROBOTO_SLAB,
    fontUrl: process.env.PUBLIC_PATH + "/fonts/Roboto-Slab-Regular.woff2",
  },
  {
    fontName: EngineUtils.FONT_NAME_SOURCE_CODE_PRO,
    fontUrl: process.env.PUBLIC_PATH + "/fonts/Source-Code-Pro-Regular.woff2",
  },
  {
    fontName: EngineUtils.FONT_NAME_NOTO_SERIF_SC,
    fontUrl: process.env.PUBLIC_PATH + "/fonts/Noto-Serif-SC-Regular.woff2",
  },
];

export enum WebFontSource {
  GOOGLE,
}

export interface WebFontMeta {
  fontFamily: string;
  source: WebFontSource;
}

export const WebFonts: WebFontMeta[] = [
  { fontFamily: "Lato", source: WebFontSource.GOOGLE },
  { fontFamily: "Lora", source: WebFontSource.GOOGLE },
  { fontFamily: "Merriweather", source: WebFontSource.GOOGLE },
  { fontFamily: "Montserrat", source: WebFontSource.GOOGLE },
  { fontFamily: "Noto Sans", source: WebFontSource.GOOGLE },
  { fontFamily: "Noto Sans SC", source: WebFontSource.GOOGLE },
  { fontFamily: "Noto Serif", source: WebFontSource.GOOGLE },
  { fontFamily: "Noto Serif SC", source: WebFontSource.GOOGLE },
  { fontFamily: "Open Sans", source: WebFontSource.GOOGLE },
  { fontFamily: "Oswald", source: WebFontSource.GOOGLE },
  { fontFamily: "PT Sans", source: WebFontSource.GOOGLE },
  { fontFamily: "PT Serif", source: WebFontSource.GOOGLE },
  { fontFamily: "Raleway", source: WebFontSource.GOOGLE },
  { fontFamily: "Source Sans Pro", source: WebFontSource.GOOGLE },
  { fontFamily: "Roboto Mono", source: WebFontSource.GOOGLE },
  { fontFamily: "Roboto Slab", source: WebFontSource.GOOGLE },
];

export class WebFontManager {
  private _webFonts: Map<string, WebFont[]> = new Map<string, WebFont[]>();
  private _typeFaceFontProvider: TypefaceFontProvider | null = null;
  private _fontDataMap: Map<string, ArrayBuffer> = new Map<
    string,
    ArrayBuffer
  >();
  private _typeFaces: Map<string, Typeface | null> = new Map<
    string,
    Typeface | null
  >();
  private _canvasKit: CanvasKit | null = null;
  private _initialized: boolean = false;

  /**
   * Always initialized before be used
   * @returns
   */
  public get typeFaceFontProvider(): TypefaceFontProvider {
    return this._typeFaceFontProvider!;
  }

  /**
   * Always initialized before be used
   * @returns
   */
  public get canvasKit(): CanvasKit {
    return this._canvasKit!;
  }

  public get fontDataMap() {
    return this._fontDataMap;
  }

  public get typeFaces() {
    return this._typeFaces;
  }

  /**
   * Must be initialized while startup
   * @returns
   */
  public initialize(canvasKit: CanvasKit) {
    if (!this._initialized) {
      this._canvasKit = canvasKit;
      this._typeFaceFontProvider = canvasKit.TypefaceFontProvider.Make();
      this._initialized = true;
    }
  }

  public registWebFont(key: string, webFont: WebFont) {
    let fonts = this._webFonts.get(key);
    if (!fonts) {
      fonts = [];
      this._webFonts.set(key, fonts);
    }
    let exists = false;
    fonts.forEach((font) => {
      if (webFont.url == font.url) {
        exists = true;
      }
    });
    if (!exists) {
      fonts.push(webFont);
    }
  }

  public getWebFontKeys() {
    return this._webFonts.keys();
  }

  public getWebFonts(key: string) {
    return this._webFonts.get(key);
  }
}

export class TextFontGlyph {
  public constructor(
    public text: string,
    public fontName: string,
    public glyph: number[]
  ) {}
}

export class FontUtils {
  public static webFontManager = new WebFontManager();
  private static _currentLanguage: string = EngineUtils.LANG_EN_US;

  public static async intialize(canvasKit: CanvasKit) {
    FontUtils.webFontManager.initialize(canvasKit);
    for (let i = 0; i < SystemFonts.length; i++) {
      const systemFont = SystemFonts[i];
      await FontUtils.registerFont(systemFont.fontName, systemFont.fontUrl);
    }
    console.log(`Font initialized is done`);
  }

  public static get currentLanguage() {
    return FontUtils._currentLanguage;
  }

  public static set currentLanguage(language: string) {
    let valid = false;
    for (const languageFont of LanguageFonts) {
      if (language == languageFont.language) {
        valid = true;
      }
    }
    if (valid) {
      FontUtils._currentLanguage = language;
    }
  }

  public static get currentLanguageFont() {
    for (let languageFont of LanguageFonts) {
      if (FontUtils._currentLanguage == languageFont.language) {
        return languageFont;
      }
    }
    return LanguageFonts[0];
  }

  public static get currentTypeface() {
    const defaultTypeface = FontUtils.webFontManager.typeFaces.get(
      FontUtils.currentLanguageFont.defaultLatinFont
    );
    return defaultTypeface!;
  }

  public static get currentNonLatinTypeface() {
    const defaultTypeface = FontUtils.webFontManager.typeFaces.get(
      FontUtils.currentLanguageFont.defaultNonLatinFont
    );
    return defaultTypeface!;
  }

  /**
   * Always initialized before be used
   * @returns
   */
  public static get typeFaceFontProvider(): TypefaceFontProvider {
    return FontUtils.webFontManager.typeFaceFontProvider;
  }

  public static getTypeFace(fontName: string): Typeface | null {
    let typeface = FontUtils.webFontManager.typeFaces.get(fontName);
    if (typeface == undefined) {
      typeface = null;
    }
    return typeface;
  }

  public static getGlyphIDs(fontName: string, text: string) {
    let typeface = FontUtils.webFontManager.typeFaces.get(fontName);
    if (typeface) {
      typeface.getGlyphIDs(text);
    } else {
      if (text && text.length > 0) {
      } else {
        return [0];
      }
    }
  }

  public static hasUnknowGlyphID(fontName: string, text: string) {
    const typeface = FontUtils.webFontManager.typeFaces.get(fontName);
    if (typeface) {
      const glyphIds = typeface.getGlyphIDs(text);
      let emptyGlyph = false;
      if (glyphIds && glyphIds.length > 0) {
        glyphIds.forEach((glyphId) => {
          if (glyphId <= 0) {
            emptyGlyph = true;
          }
        });
      }
      if (emptyGlyph) {
        return true;
      }
    } else {
      return true;
    }
    return false;
  }

  public static splitGlyphIds(fontName: string, text: string) {
    const result: Array<Uint16Array> = [];
    if (!text || text.length <= 0) {
      return result;
    }
    const typeface = FontUtils.webFontManager.typeFaces.get(fontName);
    if (typeface) {
      const glyphIDs = typeface.getGlyphIDs(text);
      let emptyGlyph = false;
      if (glyphIDs && glyphIDs.length > 0) {
        glyphIDs.forEach((glyphID) => {
          if (glyphID <= 0) {
            emptyGlyph = true;
          }
        });
      }
      if (!emptyGlyph) {
        result.push(glyphIDs);
      } else {
        let start = 0;
        let end = 0;
        let greatThan0 = glyphIDs[0] > 0;
        for (let i = 1; i < glyphIDs.length; i++) {
          if (greatThan0) {
            //Some special charactors are also 0
            if (FontUtils.isValidGlyphID(glyphIDs, i, text)) {
              end = i;
            } else {
              result.push(glyphIDs.slice(start, i));
              start = i;
              end = i;
              greatThan0 = false;
            }
          } else {
            //Some special charactors are also 0
            if (FontUtils.isValidGlyphID(glyphIDs, i, text)) {
              result.push(glyphIDs.slice(start, i));
              start = i;
              end = i;
              greatThan0 = true;
            } else {
              end = i;
            }
          }
        }
        result.push(glyphIDs.slice(start, end + 1));
      }
    } else {
      const glyphIDs = new Uint16Array(text.length);
      result.push(glyphIDs);
    }
    return result;
  }

  public static isValidGlyphID(
    glyphIDs: Uint16Array,
    index: number,
    sourceText: string
  ) {
    const valid =
      glyphIDs[index] > 0 ||
      sourceText.at(index) == "\n" ||
      sourceText.at(index) == "\r";
    return valid;
  }

  /**
   *
   * @param char Shoud be one char
   * @param fontName
   * @returns
   */
  public static getFirstGlyphID(char: string, fontName: string) {
    const typeface = FontUtils.webFontManager.typeFaces.get(fontName);
    if (typeface) {
      const glyphIds = typeface.getGlyphIDs(char);
      if (glyphIds && glyphIds.length > 0) {
        const glyphId = glyphIds[0];
        return glyphId;
      }
    }
    return 0;
  }

  public static findGlyphIDs(fontName: string, text: string) {
    if (!text || text.length <= 0) {
      return new Uint16Array(0);
    }
    const typeface = FontUtils.webFontManager.typeFaces.get(fontName);
    if (typeface) {
      const glyphIds = typeface.getGlyphIDs(text);
      let emptyGlyph = false;
      if (glyphIds && glyphIds.length > 0) {
        glyphIds.forEach((glyphId) => {
          if (glyphId <= 0) {
            emptyGlyph = true;
          }
        });
      }
      if (!emptyGlyph) {
        return glyphIds;
      } else {
        const fixGlyphIds = new Uint16Array(1);
        for (let i = 0; i < glyphIds.length; i++) {
          if (glyphIds[i] == 0) {
            const fixString = text[i];
            const defaultTypeface = FontUtils.currentTypeface;
            defaultTypeface.getGlyphIDs(fixString, 1, fixGlyphIds);
            glyphIds[i] = fixGlyphIds[0];
          }
        }
        return glyphIds;
      }
    } else {
      const defaultTypeface = FontUtils.currentTypeface;
      const glyphIds = defaultTypeface.getGlyphIDs(text);
      return glyphIds;
    }
  }

  public static getDefaultNonLatinFontFamily(language: string) {
    for (let languageFont of LanguageFonts) {
      if (language == languageFont.language) {
        return languageFont.defaultNonLatinFont;
      }
    }
    return LanguageFonts[0].defaultNonLatinFont;
  }

  public static async registerFont(fontName: string, fontUrl: string) {
    const fontData = await FontUtils.loadSystemFontFile(fontUrl);
    FontUtils.webFontManager.fontDataMap.set(fontName, fontData);
    FontUtils.webFontManager.typeFaceFontProvider.registerFont(
      fontData,
      fontName
    );
    const typeface = FontUtils.webFontManager.canvasKit.Typeface.MakeFreeTypeFaceFromData(
      fontData
    );
    // if(typeface) {
    //   const test  = typeface.getGlyphIDs('测试')
    //   console.log(`${test}`)
    // }
    FontUtils.webFontManager.typeFaces.set(fontName, typeface);
  }

  public static async loadWebFontFilesEx() {
    const webFontKeys = FontUtils.webFontManager.getWebFontKeys();
    for (let key of webFontKeys) {
      const webFonts = FontUtils.webFontManager.getWebFonts(key);
      if (webFonts && webFonts.length > 0) {
        for (let webFont of webFonts) {
          const webFontFile = await FontUtils.getWebFontFile(webFont.url);
          if (webFontFile.data) {
            console.log(
              `Register Font: family = ${webFont.fontFamily}, data length = ${webFontFile.data.byteLength}`
            );
            FontUtils.webFontManager.typeFaceFontProvider.registerFont(
              webFontFile.data,
              webFont.fontFamily
            );
            //const typeface = FontUtils.webFontManager.canvasKit.Typeface.MakeFreeTypeFaceFromData(webFontFile.data)
            //FontUtils.webFontManager.typeFaces.set(fontName, typeface)

            //console.log(webFontFile.data.byteLength)
            //break;
          }
        }
      }
    }
    const count = FontUtils.webFontManager.typeFaceFontProvider.countFamilies();
    console.log(` Total count = ${count}`);
    const fontStyle = new FontStyle();
    const typeFace = FontUtils.webFontManager.typeFaceFontProvider.matchFamilyStyle(
      "Noto Serif SC",
      {
        weight: FontUtils.webFontManager.canvasKit.FontWeight.Normal,
        width: FontUtils.webFontManager.canvasKit.FontWidth.Normal,
        slant: FontUtils.webFontManager.canvasKit.FontSlant.Upright,
      }
    );
    //const array = typeFace.getGlyphIDs('测试')
    //console.log(array)
  }

  public static async loadWebFontFiles() {
    const webFontKeys = FontUtils.webFontManager.getWebFontKeys();
    for (let key of webFontKeys) {
      const webFonts = FontUtils.webFontManager.getWebFonts(key);
      if (webFonts && webFonts.length > 0) {
        for (let webFont of webFonts) {
          const webFontFile = await FontUtils.getWebFontFile(webFont.url);
          if (webFontFile.data) {
            console.log(webFontFile.data.byteLength);
            break;
          }
        }
      }
    }
  }

  private static async loadSystemFontFile(fontUrl: string) {
    const webFontFile = await FontUtils.getWebFontFile(fontUrl);
    return webFontFile.data;
  }

  public static async getWebFontFile(url: string) {
    const webFontFile = await axios.get<
      ArrayBuffer,
      AxiosResponse<ArrayBuffer>
    >(url, { responseType: "arraybuffer" });
    return webFontFile;
  }

  public static getWebFontStyleSheet(familyName: string) {
    return axios.get(`https://fonts.googleapis.com/css?family=${familyName}`);
  }

  public static async getWebFontData(familyName: string) {
    const fontStyleSheet = await FontUtils.getWebFontStyleSheet(familyName);
    //console.log(`${fontStyleSheet}`)
    if (fontStyleSheet.status == 200) {
      const style = document.createElement("style");
      const cssTextNode = document.createTextNode(fontStyleSheet.data);
      style.appendChild(cssTextNode);
      document.head.appendChild(style);
      const styleSheet = style.sheet;
      if (styleSheet) {
        if (styleSheet.cssRules.length > 0) {
          for (let i = 0; i < styleSheet.cssRules.length; i++) {
            const cssRule = styleSheet.cssRules.item(i);
            if (cssRule) {
              //console.log(cssRule.cssText)
              if (cssRule instanceof CSSFontFaceRule) {
                //console.log(cssRule.style)
                if (cssRule.style) {
                  const webFont = new WebFont();
                  const fontFamily: string = cssRule.style["font-family"];
                  const fontStyle = cssRule.style["font-style"];
                  const fontWeight = cssRule.style["font-weight"];
                  const src = cssRule.style["src"];
                  const unicodeRange: string = cssRule.style["unicode-range"];

                  webFont.fontFamily = fontFamily.substring(
                    1,
                    fontFamily.length - 1
                  );
                  webFont.src = src;
                  webFont.fontStyle = fontStyle;
                  webFont.fontWeight = fontWeight;
                  FontUtils.webFontManager.registWebFont(
                    webFont.fontFamily,
                    webFont
                  );

                  const urlRegexp = /url\((\"https\:\/\/fonts\.gstatic\.com\/.*)\) format/gm;
                  const urlMatch = urlRegexp.exec(src);
                  if (urlMatch != null) {
                    const url = urlMatch[0].substring(
                      5,
                      urlMatch[0].length - 9
                    );
                    webFont.url = url;
                    console.log(`${url}`);
                  } else {
                    console.log(`Exception found, error url: ${src}`);
                  }
                  const ranges = unicodeRange.split(",");
                  const rangeRegexp1 = /U\+([0-9A-F]{1,6})-([0-9A-F]{1,6})/gim;
                  const rangeRegexp2 = /U\+([0-9A-F]{1,6})/gim;
                  for (let i = 0; i < ranges.length; i++) {
                    const range = ranges[i].trim();
                    const rangeMatch1 = rangeRegexp1.exec(range);
                    if (rangeMatch1 != null) {
                      const beginRange = rangeMatch1[1];
                      const endRange = rangeMatch1[2];
                      const fontUnicodeRange = new UnicodeRange();
                      fontUnicodeRange.begin = parseInt(beginRange, 16);
                      fontUnicodeRange.end = parseInt(endRange, 16);
                      webFont.unicodeRanges.push(fontUnicodeRange);
                      console.log(` ==== ${rangeMatch1}`);
                    } else {
                      const rangeMatch2 = rangeRegexp2.exec(unicodeRange);
                      if (rangeMatch2 != null) {
                        const beginRangee = rangeMatch2[1];
                        const fontUnicodeRange = new UnicodeRange();
                        fontUnicodeRange.begin = parseInt(beginRangee, 16);
                        fontUnicodeRange.end = fontUnicodeRange.begin;
                        webFont.unicodeRanges.push(fontUnicodeRange);
                        console.log(` ==== ${rangeMatch2}`);
                      } else {
                        console.log(
                          `Exception found, error unicode range : ${range}`
                        );
                      }
                    }
                  }
                  console.log(`${fontFamily}`);
                  console.log(`${fontStyle}`);
                  console.log(`${fontWeight}`);
                  console.log(`${src}`);
                  console.log(`${unicodeRange}`);
                }
              }
            }
          }
        }
        document.head.removeChild(style);
      }
      return true;
    } else {
      return false;
    }
  }
}
