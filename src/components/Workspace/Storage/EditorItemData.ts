/* eslint-disable max-params */

export class EditorItemData {
    public type: string
    public category: string
    public left: number
    public top: number
    public width: number
    public height: number
    public rotation: number
    public text: string
    public items: Array<EditorItemData> = new Array<EditorItemData>(0)
    public id: string = ''
    public useTheme: boolean
    public strokeColor: string | null
    public fillColor: string | null
    public lineWidth: number | null

    public constructor (type = 'Shape', category = 'Rectangle', left = 0, top = 0, width = 100, height = 100, 
        text = '', rotation = 0, useTheme: boolean = true, 
        strokeColor: string | null = null, fillColor: string | null = null,
        lineWidth: number | null = null) {
      this.type = type
      this.category = category
      this.left = left
      this.top = top
      this.width = width
      this.height = height
      this.text = text
      this.rotation = rotation
      this.useTheme = useTheme
      this.strokeColor = strokeColor
      this.fillColor = fillColor
      this.lineWidth = lineWidth
    }
}
