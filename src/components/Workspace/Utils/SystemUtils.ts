/**
 * 定义一些全局方法和状态信息
 */

import { Point2 } from "@/components/Engine";

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
        if(point && point.length >=3) {
            let index = point.indexOf(',')
            if(index >= 1 && index < point.length - 1) {
                let x = point.substring(0, index)
                let y = point.substring(index + 1)
                return this.isNumeric(x) && this.isNumeric(y)
            }
        } 
        return false
    }

    public static parsePointString(point: string): Point2 {
        if(point && point.length >=3) {
            let index = point.indexOf(',')
            if(index >= 1 && index < point.length - 1) {
                let x = point.substring(0, index)
                let y = point.substring(index + 1)
                return new Point2(parseFloat(x),parseFloat(y))
            }
        } 
        return new Point2()
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
}


