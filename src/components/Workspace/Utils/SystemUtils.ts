/**
 * 定义一些全局方法和状态信息
 */

import { Color, Colors, TextVerticalAlignment, Point2, StrokeDashStyle, TextAlignment } from "@/components/Engine";
import { Consts } from "./Consts";
import { ConnectorArrowDisplayType, ConnectorType } from "@/components/Rockie/Shapes";
import { ConnectorArrowTypeInfo } from "@/components/Rockie/Shapes/src/ConnectorShape";
import { ConnectorArrowType, ConnectorArrowTypes } from "@/components/Rockie/Items/src/Connector";

export class SystemUtils {

    public static convertDocumentData(documentData: any) {
        let content = documentData.data.data.content.content
        let data = JSON.parse(content)
        return data;
    }

    public static handleInternalError(message: string) {
        alert(message)
        console.log(message)
    }

    public static generateID(): string {
        let d = new Date().getTime()
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now()
        }
        let id = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return id;
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
            return new Color(r, g, b, a);
        } else if (rgba && rgba.length == 7 && rgba[0] == '#') {
            let r = parseInt(rgba.slice(1, 3), 16)
            let g = parseInt(rgba.slice(3, 5), 16)
            let b = parseInt(rgba.slice(5, 7), 16)
            let a = 255
            return new Color(r, g, b, a);
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
        let alink = document.createElement('a');
        alink.download = fileName;
        alink.style.display = 'none';
        let blob = new Blob([content]);
        alink.href = URL.createObjectURL(blob);
        document.body.appendChild(alink);
        alink.click();
        document.body.removeChild(alink);
    }

    public static parseStrokeDashStyle(strokeDashStyle: string): StrokeDashStyle {
        switch (strokeDashStyle) {
            case Consts.STROKE_DASH_STYLE_DASH:
                return StrokeDashStyle.DASH
                break;
            case Consts.STROKE_DASH_STYLE_DOT:
                return StrokeDashStyle.DOT
                break;
            case Consts.STROKE_DASH_STYLE_DASH_DOT:
                return StrokeDashStyle.DASH_DOT
                break;
            case Consts.STROKE_DASH_STYLE_DASH_DOT_DOT:
                return StrokeDashStyle.DASH_DOT_DOT
                break;
            case Consts.STROKE_DASH_STYLE_SOLID:
            default:
                return StrokeDashStyle.SOLID
                break;
        }
    }

    public static generateStrokeDashStyle(strokeDashStyle: StrokeDashStyle): string {
        switch (strokeDashStyle) {
            case StrokeDashStyle.DASH: {
                return Consts.STROKE_DASH_STYLE_DASH
                break;
            }
            case StrokeDashStyle.DOT: {
                return Consts.STROKE_DASH_STYLE_DOT
            }
            case StrokeDashStyle.DASH_DOT: {
                return Consts.STROKE_DASH_STYLE_DASH_DOT
                break;
            }
            case StrokeDashStyle.DASH_DOT_DOT: {
                return Consts.STROKE_DASH_STYLE_DASH_DOT_DOT
                break;
            }
            case StrokeDashStyle.SOLID:
            default:
                return Consts.STROKE_DASH_STYLE_SOLID
                break;
        }
    }

    public static parseTextAlignment(textAlignment: string): TextAlignment {
        switch (textAlignment) {
            case Consts.TEXT_ALIGNMENT_CENTER:
                return TextAlignment.CENTER
                break;
            case Consts.TEXT_ALIGNMENT_END:
                return TextAlignment.END
                break;
            case Consts.TEXT_ALIGNMENT_JUSTIFY:
                return TextAlignment.JUSTIFY
                break;
            case Consts.TEXT_ALIGNMENT_RIGHT:
                return TextAlignment.RIGHT
                break;
            case Consts.TEXT_ALIGNMENT_START:
                return TextAlignment.START
                break;
            case Consts.TEXT_ALIGNMENT_LEFT:
            default:
                return TextAlignment.LEFT
                break;
        }
    }

    public static generateTextAlignment(textAlignment: TextAlignment): string {
        switch (textAlignment) {
            case TextAlignment.CENTER:
                return Consts.TEXT_ALIGNMENT_CENTER
                break;
            case TextAlignment.END:
                return Consts.TEXT_ALIGNMENT_END
                break;
            case TextAlignment.JUSTIFY:
                return Consts.TEXT_ALIGNMENT_JUSTIFY
                break;
            case TextAlignment.RIGHT:
                return Consts.TEXT_ALIGNMENT_RIGHT
                break;
            case TextAlignment.START:
                return Consts.TEXT_ALIGNMENT_START
                break;
            case TextAlignment.LEFT:
            default:
                return Consts.TEXT_ALIGNMENT_LEFT
                break;
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

    public static findConnectorArrowType(connectorArrowTypeName: string): string {
        let connectorArrowTypeNameValue = ConnectorArrowTypes[0].name
        ConnectorArrowTypes.forEach(connectorArrowType => {
            if(connectorArrowType.name == connectorArrowTypeName) {
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
        for(let i = 0; i < count; i ++) {
            const point = points[i]
            output = output + `${i}:[${point.x}, ${point.y}],`
        }
        console.log(output)
    }
}


