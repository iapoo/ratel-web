import { Color, Colors, } from '@/components/Engine'

export class Theme {
    public static DEFAULT_STROKE_COLOR = Colors.Red
    public static DEFAULT_FILL_COLOR = Colors.Blue
    private static _instance = new Theme()

    public static getInstance () {
      return Theme._instance
    }

    private _strokeColor: Color = Theme.DEFAULT_STROKE_COLOR

    public get strokeColor () {
      return this._strokeColor
    }

    public set strokeColor (value: Color) {
      this._strokeColor = value
    }
}
