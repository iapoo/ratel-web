/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-parameter-properties */
/* eslint-disable max-params */
//
// enum DocumentElementType {
//   TEXT,
//   IMAGE,
// }
//
// class DocumentElement {
//   private _type: DocumentElementType
//   private _content: string
//   private _start: number
//   private _end: number
//
//   public DocumentElement(type: DocumentElementType, content: string) {
//     this._type = type
//     this._content = content
//   }
//
//   public get content() {
//     return this._content
//   }
//
//   public get type() {
//     return this._type
//   }
//
//   public get start() {
//     return this._start
//   }
//
//   public get end() {
//     return this._end
//   }
// }
//
// class DocumentLayoutBuilder {
//   private elements: Array<DocumentElement> = new Array<DocumentElement>(0)
//
//   public build(): TextLayout {
//     const textLayout = new TextLayout()
//
//     return textLayout
//   }
//
//   public addText(text: string) {}
//
//   public addTextStyle(textStyle: TextStyle) {}
//
//   public addTextStyleExtended(textStyle: TextStyle, foreground: Paint, background: Paint) {}
//
//   public reset() {}
// }
//
// class TextLayout {
//   public TextLayout(textLayoutBuilder: TextLayoutBuilder) {}
//
//   public layout(width: number) {}
//
//   public getShapeLines(): ShapeLine[] {}
//
//   public getHeight(): number {
//     return 0
//   }
//
//   public getMaxWidth(): number {
//     return 0
//   }
// }
