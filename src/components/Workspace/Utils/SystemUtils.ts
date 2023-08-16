/**
 * 定义一些全局方法和状态信息
 */

export class SystemUtils {

    public static convertDocumentData(documentData: any) {
        let content = documentData.data.data.content.content
        let data = JSON.parse(content)
        return data;
    }

}


