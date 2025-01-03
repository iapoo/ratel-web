export class ImageUtils {
  /**
   * Convert base64 image to Blob for future use
   * @param content
   */
  public static convertBase64StringToBlob(base64Text: string) {
    const attrs = base64Text.split(',')
    const matches = attrs[0].match(/:(.*?);/)
    if (matches) {
      const mime = matches[1]
      const blobStr = atob(attrs[1])
      let n = blobStr.length
      const u8Data = new Uint8Array(n)
      while (n--) {
        u8Data[n] = blobStr.charCodeAt(n)
      }
      return new Blob([u8Data], { type: mime })
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
    if (matches) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mime = matches[1]
      const blobStr = atob(attrs[1])
      let n = blobStr.length
      const u8Data = new Uint8Array(n)
      while (n--) {
        u8Data[n] = blobStr.charCodeAt(n)
      }
      return u8Data
    } else {
      return undefined
    }
  }

  /**
   * 示例：创建Uint8Array并转换为Base64
   * const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
   * const base64 = uint8ArrayToBase64(uint8Array);
   * console.log(base64); // 输出: SGVsbG8=
   * @param u8Array
   * @returns
   */
  public static convertUint8ArrayToBase64(u8Array: Uint8Array) {
    const CHUNK_SIZE = 0x8000 // 32K chunks
    let base64 = ''
    for (let i = 0; i < u8Array.length; i += CHUNK_SIZE) {
      const chunk = u8Array.subarray(i, i + CHUNK_SIZE)
      // @ts-ignore
      const chunkBase64 = btoa(String.fromCharCode.apply(null, chunk))
      // @ts-ignore
      base64 += chunkBase64.match(/.{2}/g).join('')
    }
    return base64
  }

  public static convertBase64ImageToString(base64Text: string) {
    const attrs = base64Text.split(',')
    const matches = attrs[0].match(/:(.*?);/)
    if (matches) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mime = matches[1]
      const blobStr = atob(attrs[1])
      let n = blobStr.length
      const u8Data = new Uint8Array(n)
      while (n--) {
        u8Data[n] = blobStr.charCodeAt(n)
      }
      const decoder = new TextDecoder('utf-8')
      return decoder.decode(u8Data)
    } else {
      return ''
    }
  }

  /**
   * Convert SVG content to Data URL for img to show
   * @param text
   */
  public static convertSVGStringToDataUrl(text: string) {
    return 'data:image/svg+xml;base64,' + btoa(text)
  }
}
