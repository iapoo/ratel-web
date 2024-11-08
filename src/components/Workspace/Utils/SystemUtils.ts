/**
 * 定义一些全局方法和状态信息
 */

import { Color, Colors, TextVerticalAlignment, Point2, StrokeDashStyle, TextAlignment } from "@/components/Engine"
import { Consts } from "./Consts"
import { ConnectorArrowDisplayType, ConnectorType } from "@/components/Rockie/Shapes"
import { ConnectorArrowDisplayMode, ConnectorArrowTypeInfo, ConnectorDirection, ConnectorMode } from "@/components/Rockie/Shapes/src/ConnectorShape"
import { ConnectorArrowType, ConnectorArrowTypes } from "@/components/Rockie/Items/src/Connector"
import { ConnectorArrowInfo } from "@/components/Rockie/Items"
import { EditorMode } from "@/components/Rockie/Editor"
import moment from 'moment'

export enum OSType {
    MACOS,
    WINDOWS,
    IOS,
    ANDROID,
    LINUX,
    UNKNOWN
}

export class SystemUtils {

    public static extractDateFromServerCalendar(dateTime: number) {
        return moment(dateTime).format('YYYY-MM-DD')
    }

    public static extractTimeFromServerCalendar(dateTime: number) {
        return moment(dateTime).format('HH:mm')
    }

    public static extractDateTimeFromServerCalendar(dateTime: number) {
        return moment(dateTime).format('YYYY-MM-DD HH:mm')
    }

    public static convertDocumentData(documentData: any) {
        let content = documentData.data.data.content.content
        let data = JSON.parse(content)
        return data
    }

    public static handleInternalError(message: string) {
        alert(message)
        console.log(message)
    }

    public static parseUrl(url: string) {
        const urlObj = {
            protocol: /^(.+)\:\/\//,
            host: /\:\/\/(.+?)[\?\#\s\/]/,
            path: /\w(\/.*?)[\?\#\s]/,
            query: /\?(.+?)[\#\/\s]/,
            hash: /\#(\w+)\s$/,
        }
        url += ' '
        for (const key in urlObj) {
            const pattern = urlObj[key]
            urlObj[key] = key === 'query' ? (pattern.exec(url) && SystemUtils.formatQuery(pattern.exec(url)[1])) : (pattern.exec(url) && pattern.exec(url)[1])
        }
        return urlObj
    }

    private static formatQuery(str: string) {
        return str.split('&').reduce((a, b) => {
            const arr = b.split('=')
            a[arr[0]] = arr[1]
            return a
        }, {})
    }

    public static generateID(): string {
        let d = new Date().getTime()
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now()
        }
        let id = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return id
    }

    public static isNumeric(str: string): boolean {
        return !isNaN(parseFloat(str)) && isFinite(str)
    }

    /**
     * REF: https://blog.csdn.net/qq_23365135/article/details/123833406
     * @param point 
     * @returns 
     */
    public static isPointString(point: string): boolean {
        if (point && point.length >= 3) {
            let index = point.indexOf(',')
            if (index >= 1 && index < point.length - 1) {
                let x = point.substring(0, index)
                let y = point.substring(index + 1)
                return this.isNumeric(x) && this.isNumeric(y)
            }
        }
        return false
    }

    public static generatePointString(point: Point2): string {
        return point.x + ',' + point.y
    }

    public static parsePointString(point: string): Point2 {
        if (point && point.length >= 3) {
            let index = point.indexOf(',')
            if (index >= 1 && index < point.length - 1) {
                let x = point.substring(0, index)
                let y = point.substring(index + 1)
                return new Point2(parseFloat(x), parseFloat(y))
            }
        }
        return new Point2()
    }


    public static generatePointsString(points: Point2[]): string {
        let result = ''
        const count = points.length
        for (let i = 0; i < count; i++) {
            const point = points[i]
            result += point.x + ',' + point.y + ';'
        }
        return result
    }

    public static parsePointsString(points: string): Point2[] {
        let result: Point2[] = []
        if (points && points.length > 3) {
            const pointStrs = points.split(';')
            if (pointStrs.length > 0) {
                pointStrs.forEach(pointStr => {
                    if (pointStr && pointStr.length > 0) {// It may be emptyt string here and need to ignore
                        const point = SystemUtils.parsePointString(pointStr)
                        if (point) {
                            result.push(point)
                        }
                    }
                })
            }
        }
        return result
    }

    public static generateColorString(color: Color): string {
        let rstr = '0' + Math.round((color.r * 255)).toString(16)
        let gstr = '0' + Math.round((color.g * 255)).toString(16)
        let bstr = '0' + Math.round((color.b * 255)).toString(16)
        let astr = '0' + Math.round((color.a * 255)).toString(16)
        let rgba = '#' + rstr.slice(-2) + gstr.slice(-2) + bstr.slice(-2) + astr.slice(-2)
        return rgba.toUpperCase()
    }

    /**
     * 
     * @param rgba #F0F0F0FF or #FFFFFF
     * @returns 
     */
    public static parseColorString(rgba: string | null): Color | null {
        if (rgba == null) {
            return null
        }
        if (rgba && rgba.length == 9 && rgba[0] == '#') {
            let r = parseInt(rgba.slice(1, 3), 16)
            let g = parseInt(rgba.slice(3, 5), 16)
            let b = parseInt(rgba.slice(5, 7), 16)
            let a = parseInt(rgba.slice(7, 9), 16)
            return new Color(r, g, b, a)
        } else if (rgba && rgba.length == 7 && rgba[0] == '#') {
            let r = parseInt(rgba.slice(1, 3), 16)
            let g = parseInt(rgba.slice(3, 5), 16)
            let b = parseInt(rgba.slice(5, 7), 16)
            let a = 255
            return new Color(r, g, b, a)
        }

        return Colors.White
    }

    /**
     * REF: https://www.jb51.net/javascript/2915111pf.htm
     * REF: https://www.php.cn/faq/526256.html
     * @param content 
     * @param fileName 
     * @param fileFormat 
     * @param fileType 
     */
    public static generateDownloadFile(content: any, fileName: string) {
        let alink = document.createElement('a')
        alink.download = fileName
        alink.style.display = 'none'
        let blob = new Blob([content])
        alink.href = URL.createObjectURL(blob)
        document.body.appendChild(alink)
        alink.click()
        document.body.removeChild(alink)
    }

    public static parseStrokeDashStyle(strokeDashStyle: string): StrokeDashStyle {
        switch (strokeDashStyle) {
            case Consts.STROKE_DASH_STYLE_DASH:
                return StrokeDashStyle.DASH
                break
            case Consts.STROKE_DASH_STYLE_DOT:
                return StrokeDashStyle.DOT
                break
            case Consts.STROKE_DASH_STYLE_DASH_DOT:
                return StrokeDashStyle.DASH_DOT
                break
            case Consts.STROKE_DASH_STYLE_DASH_DOT_DOT:
                return StrokeDashStyle.DASH_DOT_DOT
                break
            case Consts.STROKE_DASH_STYLE_SOLID:
            default:
                return StrokeDashStyle.SOLID
                break
        }
    }

    public static generateStrokeDashStyle(strokeDashStyle: StrokeDashStyle): string {
        switch (strokeDashStyle) {
            case StrokeDashStyle.DASH: {
                return Consts.STROKE_DASH_STYLE_DASH
                break
            }
            case StrokeDashStyle.DOT: {
                return Consts.STROKE_DASH_STYLE_DOT
            }
            case StrokeDashStyle.DASH_DOT: {
                return Consts.STROKE_DASH_STYLE_DASH_DOT
                break
            }
            case StrokeDashStyle.DASH_DOT_DOT: {
                return Consts.STROKE_DASH_STYLE_DASH_DOT_DOT
                break
            }
            case StrokeDashStyle.SOLID:
            default:
                return Consts.STROKE_DASH_STYLE_SOLID
                break
        }
    }

    public static parseTextAlignment(textAlignment: string): TextAlignment {
        switch (textAlignment) {
            case Consts.TEXT_ALIGNMENT_CENTER:
                return TextAlignment.CENTER
                break
            case Consts.TEXT_ALIGNMENT_END:
                return TextAlignment.END
                break
            case Consts.TEXT_ALIGNMENT_JUSTIFY:
                return TextAlignment.JUSTIFY
                break
            case Consts.TEXT_ALIGNMENT_RIGHT:
                return TextAlignment.RIGHT
                break
            case Consts.TEXT_ALIGNMENT_START:
                return TextAlignment.START
                break
            case Consts.TEXT_ALIGNMENT_LEFT:
            default:
                return TextAlignment.LEFT
                break
        }
    }

    public static generateTextAlignment(textAlignment: TextAlignment): string {
        switch (textAlignment) {
            case TextAlignment.CENTER:
                return Consts.TEXT_ALIGNMENT_CENTER
                break
            case TextAlignment.END:
                return Consts.TEXT_ALIGNMENT_END
                break
            case TextAlignment.JUSTIFY:
                return Consts.TEXT_ALIGNMENT_JUSTIFY
                break
            case TextAlignment.RIGHT:
                return Consts.TEXT_ALIGNMENT_RIGHT
                break
            case TextAlignment.START:
                return Consts.TEXT_ALIGNMENT_START
                break
            case TextAlignment.LEFT:
            default:
                return Consts.TEXT_ALIGNMENT_LEFT
                break
        }
    }

    public static parseTextVerticalAligment(textVerticalAlignment: string): TextVerticalAlignment {
        switch (textVerticalAlignment) {
            case Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM:
                return TextVerticalAlignment.BOTTOM
                break
            case Consts.PLACE_HOLDER_ALIGNMENT_TOP:
                return TextVerticalAlignment.TOP
                break
            case Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE:
            default:
                return TextVerticalAlignment.MIDDLE
                break
        }
    }

    public static generateTextVerticalAligment(textVerticalAlignment: TextVerticalAlignment): string {
        switch (textVerticalAlignment) {
            case TextVerticalAlignment.BOTTOM:
                return Consts.PLACE_HOLDER_ALIGNMENT_BOTTOM
                break
            case TextVerticalAlignment.TOP:
                return Consts.PLACE_HOLDER_ALIGNMENT_TOP
                break
            case TextVerticalAlignment.MIDDLE:
            default:
                return Consts.PLACE_HOLDER_ALIGNMENT_MIDDLE
                break
        }
    }

    public static parseConnectorType(connectorType: string): ConnectorType {
        switch (connectorType) {
            case Consts.CONNECTOR_LINE_TYPE_CURVED:
                return ConnectorType.Curve
                break
            case Consts.CONNECTOR_LINE_TYPE_STRAIGHT:
                return ConnectorType.StraightLine
                break
            case Consts.CONNECTOR_LINE_TYPE_ORTHOGONAL:
            default:
                return ConnectorType.Orthogonal
                break
        }
    }

    public static generateConnectorType(connectorType: ConnectorType): string {
        switch (connectorType) {
            case ConnectorType.Curve:
                return Consts.CONNECTOR_LINE_TYPE_CURVED
                break
            case ConnectorType.StraightLine:
                return Consts.CONNECTOR_LINE_TYPE_STRAIGHT
                break
            case ConnectorType.Orthogonal:
            default:
                return Consts.CONNECTOR_LINE_TYPE_ORTHOGONAL
                break
        }
    }

    public static parseConnectorMode(connectorMode: string): ConnectorMode {
        switch (connectorMode) {
            case Consts.CONNECTOR_LINE_MODE_DOUBLE:
                return ConnectorMode.Double
                break
            case Consts.CONNECTOR_LINE_MODE_DOUBLE_START:
                return ConnectorMode.DoubleAndStartArrow
                break
            case Consts.CONNECTOR_LINE_MODE_DOUBLE_END:
                return ConnectorMode.DoubleAndEndArrow
                break
            case Consts.CONNECTOR_LINE_MODE_DOUBLE_BOTH:
                return ConnectorMode.DoubleAndBothArrows
                break
            case Consts.CONNECTOR_LINE_MODE_SIGNLE:
            default:
                return ConnectorMode.Single
                break
        }
    }

    public static generateConnectorMode(connectorMode: ConnectorMode): string {
        switch (connectorMode) {
            case ConnectorMode.Double:
                return Consts.CONNECTOR_LINE_MODE_DOUBLE
                break
            case ConnectorMode.DoubleAndStartArrow:
                return Consts.CONNECTOR_LINE_MODE_DOUBLE_START
                break
            case ConnectorMode.DoubleAndEndArrow:
                return Consts.CONNECTOR_LINE_MODE_DOUBLE_END
                break
            case ConnectorMode.DoubleAndBothArrows:
                return Consts.CONNECTOR_LINE_MODE_DOUBLE_BOTH
                break
            case ConnectorMode.Single:
            default:
                return Consts.CONNECTOR_LINE_MODE_SIGNLE
                break
        }
    }

    public static findConnectorArrowType(connectorArrowTypeName: string): string {
        let connectorArrowTypeNameValue = ConnectorArrowTypes[0].name
        ConnectorArrowTypes.forEach(connectorArrowType => {
            if (connectorArrowType.name == connectorArrowTypeName) {
                connectorArrowTypeNameValue = connectorArrowType.name
            }
        })
        return connectorArrowTypeName
    }

    public static cloneConnectorLineArrowType(connectorArrowType: ConnectorArrowType): ConnectorArrowType {
        return {
            name: connectorArrowType.name,
            description: connectorArrowType.description,
            type: connectorArrowType.type,
            height: connectorArrowType.height,
            width: connectorArrowType.width,
            modifier: connectorArrowType.modifier,
            count: connectorArrowType.count,
            outline: connectorArrowType.outline,
            close: connectorArrowType.close,
            displayMode: connectorArrowType.displayMode
        }
    }

    public static debugPoints(points: Point2[]) {
        let count = points.length
        let output = `Array data: length = ${count}, data = `
        for (let i = 0; i < count; i++) {
            const point = points[i]
            output = output + `${i}:[${point.x}, ${point.y}],`
        }
        console.log(output)
    }

    public static generateConnectorArrow(arrow: ConnectorArrowType): ConnectorArrowInfo {
        return new ConnectorArrowInfo(
            arrow.name,
            arrow.description,
            SystemUtils.generateConnectorArrowDisplayType(arrow.type),
            arrow.height,
            arrow.width,
            arrow.modifier,
            arrow.count,
            arrow.outline,
            arrow.close,
            SystemUtils.generateConnectorArrowDisplayMode(arrow.displayMode)
        )
    }


    public static parseConnectorArrow(arrowInfo: ConnectorArrowInfo): ConnectorArrowType {
        return {
            name: arrowInfo.name,
            description: arrowInfo.description,
            type: SystemUtils.parseConnectorArrowDisplayType(arrowInfo.type),
            height: arrowInfo.height,
            width: arrowInfo.width,
            modifier: arrowInfo.modifier,
            count: arrowInfo.count,
            outline: arrowInfo.outline,
            close: arrowInfo.close,
            displayMode: SystemUtils.parseConnectorArrowDisplayMode(arrowInfo.displayMode)
        }
    }

    public static generateConnectorArrowDisplayType(displayType: ConnectorArrowDisplayType): string {
        switch (displayType) {
            case ConnectorArrowDisplayType.Triangle:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_TRIANGLE
            case ConnectorArrowDisplayType.Diamond:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_DIAMOND
            case ConnectorArrowDisplayType.Ellipse:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_ELLIPSE
            case ConnectorArrowDisplayType.LeftParenthesis:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_PARENTHESIS
            case ConnectorArrowDisplayType.RightParenthesis:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_RIGHT_PARENTHESIS
            case ConnectorArrowDisplayType.Orthogonal:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_ORTHOGONAL
            case ConnectorArrowDisplayType.ForewardSlash:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_FOREWARD_SLASH
            case ConnectorArrowDisplayType.Backslashe:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_BACKSLASHE
            case ConnectorArrowDisplayType.VerticalLine:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICAL_LINE
            case ConnectorArrowDisplayType.LeftAngleBracket:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_ANGLE_BRACKET
            case ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICALE_LINE_LEFT_ANGLE_BACKET
            case ConnectorArrowDisplayType.CircleAndLeftBacket:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_LEFT_BACKET
            case ConnectorArrowDisplayType.CircleAndVerticalLine:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_VERTICAL_LINE
            case ConnectorArrowDisplayType.None:
            default:
                return Consts.CONNECTOR_ARROW_DISPLAY_TYPE_NONE
        }
    }

    public static parseConnectorArrowDisplayType(displayType: string): ConnectorArrowDisplayType {
        switch (displayType) {
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_TRIANGLE:
                return ConnectorArrowDisplayType.Triangle
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_DIAMOND:
                return ConnectorArrowDisplayType.Diamond
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_ELLIPSE:
                return ConnectorArrowDisplayType.Ellipse
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_PARENTHESIS:
                return ConnectorArrowDisplayType.LeftParenthesis
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_RIGHT_PARENTHESIS:
                return ConnectorArrowDisplayType.RightParenthesis
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_ORTHOGONAL:
                return ConnectorArrowDisplayType.Orthogonal
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_FOREWARD_SLASH:
                return ConnectorArrowDisplayType.ForewardSlash
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_BACKSLASHE:
                return ConnectorArrowDisplayType.Backslashe
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICAL_LINE:
                return ConnectorArrowDisplayType.VerticalLine
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_LEFT_ANGLE_BRACKET:
                return ConnectorArrowDisplayType.LeftAngleBracket
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_VERTICALE_LINE_LEFT_ANGLE_BACKET:
                return ConnectorArrowDisplayType.VerticaleLineAndLeftAngleBacket
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_LEFT_BACKET:
                return ConnectorArrowDisplayType.CircleAndLeftBacket
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_CIRCLE_AND_VERTICAL_LINE:
                return ConnectorArrowDisplayType.CircleAndVerticalLine
            case Consts.CONNECTOR_ARROW_DISPLAY_TYPE_NONE:
            default:
                return ConnectorArrowDisplayType.None
        }
    }

    public static generateConnectorArrowDisplayMode(displayMode: ConnectorArrowDisplayMode): string {
        switch (displayMode) {
            case ConnectorArrowDisplayMode.Top:
                return Consts.CONNECTOR_ARROW_DISPLAY_MODE_TOP
            case ConnectorArrowDisplayMode.Bottom:
                return Consts.CONNECTOR_ARROW_DISPLAY_MODE_BOTTOM
            case ConnectorArrowDisplayMode.Full:
            default:
                return Consts.CONNECTOR_ARROW_DISPLAY_MODE_FULL
        }
    }

    public static parseConnectorArrowDisplayMode(displayMode: string): ConnectorArrowDisplayMode {
        switch (displayMode) {
            case Consts.CONNECTOR_ARROW_DISPLAY_MODE_TOP:
                return ConnectorArrowDisplayMode.Top
            case Consts.CONNECTOR_ARROW_DISPLAY_MODE_BOTTOM:
                return ConnectorArrowDisplayMode.Bottom
            case Consts.CONNECTOR_ARROW_DISPLAY_MODE_FULL:
            default:
                return ConnectorArrowDisplayMode.Full
        }
    }

    public static generateConnectorDirection(direction: ConnectorDirection): string {
        switch (direction) {
            case ConnectorDirection.Top:
                return Consts.CONNECTOR_DIRECTION_TOP
            case ConnectorDirection.Right:
                return Consts.CONNECTOR_DIRECTION_RIGHT
            case ConnectorDirection.Bottom:
                return Consts.CONNECTOR_DIRECTION_BOTTOM
            case ConnectorDirection.Left:
            default:
                return Consts.CONNECTOR_DIRECTION_LEFT
        }
    }

    public static parseConnectorDirection(direction: string): ConnectorDirection {
        switch (direction) {
            case Consts.CONNECTOR_DIRECTION_TOP:
                return ConnectorDirection.Top
            case Consts.CONNECTOR_DIRECTION_RIGHT:
                return ConnectorDirection.Right
            case Consts.CONNECTOR_DIRECTION_BOTTOM:
                return ConnectorDirection.Bottom
            case Consts.CONNECTOR_DIRECTION_LEFT:
            default:
                return ConnectorDirection.Left
        }
    }

    public static generateEditorMode(editorMode: EditorMode) {
        switch (editorMode) {
            case EditorMode.AUTO:
                return Consts.EDITOR_CURSOR_AUTO
            case EditorMode.DEFAULT:
                return Consts.EDITOR_CURSOR_DEFAULT
            case EditorMode.ALL_SCROLL:
                return Consts.EDITOR_CURSOR_ALL_SCROLL
            case EditorMode.HELP:
                return Consts.EDITOR_CURSOR_HELP
            case EditorMode.MOVE:
                return Consts.EDITOR_CURSOR_MOVE
            case EditorMode.POINTER:
                return Consts.EDITOR_CURSOR_POINTER
            case EditorMode.PROGRESS:
                return Consts.EDITOR_CURSOR_PROGRESS
            case EditorMode.TEXT:
                return Consts.EDITOR_CURSOR_TEXT
            case EditorMode.VERTICAL_TEXT:
                return Consts.EDITOR_CURSOR_VERTICAL_TEXT
            case EditorMode.WAIT:
                return Consts.EDITOR_CURSOR_WAIT
            case EditorMode.NO_DROP:
                return Consts.EDITOR_CURSOR_NO_DROP
            case EditorMode.NOT_ALLOWED:
                return Consts.EDITOR_CURSOR_NOT_ALLOWED
            case EditorMode.E_RESIZE:
                return Consts.EDITOR_CURSOR_E_RESIZE
            case EditorMode.N_RESIZE:
                return Consts.EDITOR_CURSOR_N_RESIZE
            case EditorMode.S_RESIZE:
                return Consts.EDITOR_CURSOR_S_RESIZE
            case EditorMode.W_RESIZE:
                return Consts.EDITOR_CURSOR_W_RESIZE
            case EditorMode.NE_RESIZE:
                return Consts.EDITOR_CURSOR_NE_RESIZE
            case EditorMode.NW_RESIZE:
                return Consts.EDITOR_CURSOR_NW_RESIZE
            case EditorMode.SE_RESIZE:
                return Consts.EDITOR_CURSOR_SE_RESIZE
            case EditorMode.SW_RESIZE:
                return Consts.EDITOR_CURSOR_SW_RESIZE
            case EditorMode.ROW_RESIZE:
                return Consts.EDITOR_CURSOR_ROW_RESIZE
            case EditorMode.COL_RESIZE:
                return Consts.EDITOR_CURSOR_COL_RESIZE
            case EditorMode.CROSSHAIR:
                return Consts.EDITOR_CURSOR_CROSSHAIR
            case EditorMode.AUTO:
            default:
                return Consts.EDITOR_CURSOR_AUTO
        }
    }

    public static getOS() {
        const userAgent = navigator.userAgent
        const platform = navigator.platform
        const macOS = /Mac OS/.test(userAgent)
        const windows = /win16|win8|win32|win64|x64|x32/.test(userAgent) || /wow64/.test(userAgent)
        const ios = /iPhone|iPad|iPod/.test(userAgent) && /OS [1-9]_/.test(userAgent)
        const android = /Android/.test(userAgent)
        const linux = /Linux/.test(platform)

        if (macOS) return OSType.MACOS
        if (windows) return OSType.WINDOWS
        if (ios) return OSType.IOS
        if (android) return OSType.ANDROID
        if (linux) return OSType.LINUX

        return 'Unknown OS'
    }

    /**
     * Generate random string with specified length
     * @param length 
     * @returns 
     */
    public static generateRandomString(length: number) {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < length; i++) {
            const randomChar = characters.charAt(Math.floor(Math.random() * characters.length))
            result += randomChar
        }
        return result
    }
}


