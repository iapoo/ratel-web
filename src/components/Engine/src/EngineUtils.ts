import axios, { AxiosResponse, AxiosRequestConfig, } from 'axios'

export class EngineUtils {
  public static FONT_NAME_DEFAULT = 'Serif'
  public static FONT_NAME_SANS = 'Sans'
  public static FONT_NAME_SERIF = 'Serif'
  public static FONT_SIZE_DEFAULT = 14

    public static getCanvasKitWasm = () => {
      return axios.get(`/resources/canvaskit.wasm`, {
        headers: {
          'Content-Type': 'application/wasm',
        },
        responseType: 'arraybuffer',
      })
    }
}
