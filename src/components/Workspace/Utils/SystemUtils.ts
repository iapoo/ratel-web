/**
 * 定义一些全局方法和状态信息
 */

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
}


