import { FontUtils, SystemFonts } from './EngineUtils'
import * as wawoff2 from 'wawoff2'

/**
 * Compress WOFF2 font file so we can parse and generate text path for SVG export 
 */
export class Woff2Utils {
    private static fontMap = new Map<string, any>()
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
        if (Woff2Utils.fontMap.has(fontName)) {
            return Woff2Utils.fontMap.get(fontName)
        } else {
            const fontData = await FontUtils.loadSystemFontFile(fontName)
            const ttfdata = await window.Module.decompress(fontData)
            const arrayBuffer = ttfdata.buffer.slice(ttfdata.byteOffset, ttfdata.byteLength + ttfdata.byteOffset)
            Woff2Utils.fontMap.set(fontName, arrayBuffer)
            // console.log(`WAWOFF2 =  ${ttfdata}`)
            return arrayBuffer
        }
    }
}