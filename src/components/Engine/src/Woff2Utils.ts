import { FontUtils, SystemFonts } from './EngineUtils'
import * as wawoff2 from 'wawoff2'

/**
 * Compress WOFF2 font file so we can parse and generate text path for SVG export 
 */
export class Woff2Utils {

    /**
     * 
     * @param fontName 
     * @returns 
     */
    public static async decompress(fontName: string) {
        const loadScript = (src) => new Promise((onload) => document.documentElement.append(Object.assign(document.createElement('script'), { src, onload })))
        if (!window.Module) {
            const path = '/resources/decompress_binding.js'
            const init = new Promise((done) => window.Module = { onRuntimeInitialized: done })
            await loadScript(path).then(() => init)
        }
        const woff2 = wawoff2.decompress
        //const fontData = FontUtils.webFontManager.fontDataMap.get(FontUtils.currentLanguageFont.defaultLatinFont)
        const fontData = await FontUtils.loadSystemFontFile(SystemFonts[0].fontUrl)
        console.log(`FONTDATA = ${fontData}`)
        //const ttfdata = await wawoff2.decompress(fontData)
        const ttfdata = await window.Module.decompress(fontData)
        console.log(`WAWOFF2 =  ${ttfdata}`)
        return ttfdata
    }
}