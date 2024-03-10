export class ImageUtils {

    /**
     * Convert base64 image to Blob for future use
     * @param content 
     */
    public static convertBase64StringToBlob(base64Text: string) {
        const attrs = base64Text.split(',')
        const matches = attrs[0].match(/:(.*?);/)
        const mime = matches[1];
        const blobStr = atob(attrs[1])
        let n = blobStr.length
        const u8Data = new Uint8Array(n)
        while(n--) {
            u8Data[n] = blobStr.charCodeAt(n)
        } 
        return new Blob([u8Data], {type: mime})
    }
}