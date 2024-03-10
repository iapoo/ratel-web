export class ImageUtils {

    /**
     * Convert base64 image to Blob for future use
     * @param content 
     */
    public static convertBase64StringToBlob(base64Text: string) {
        const attrs = base64Text.split(',')
        const matches = attrs[0].match(/:(.*?);/)
        if(matches) {
            const mime = matches[1];
            const blobStr = atob(attrs[1])
            let n = blobStr.length
            const u8Data = new Uint8Array(n)
            while(n--) {
                u8Data[n] = blobStr.charCodeAt(n)
            } 
            return new Blob([u8Data], {type: mime})
        } else {
            return undefined
        }
    }

    /**
     * Convert base64 image to Uint8Array for future use, it will remove Promise so can be handled without async code.
     * @param content 
     */
    public static convertBase64StringToUInt8Array(base64Text: string) {
        const attrs = base64Text.split(',')
        const matches = attrs[0].match(/:(.*?);/)
        if(matches) {
            const mime = matches[1];
            const blobStr = atob(attrs[1])
            let n = blobStr.length
            const u8Data = new Uint8Array(n)
            while(n--) {
                u8Data[n] = blobStr.charCodeAt(n)
            } 
            return u8Data
        } else {
            return undefined
        }
    }
}