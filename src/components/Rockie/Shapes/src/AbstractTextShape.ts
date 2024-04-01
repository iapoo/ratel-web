/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Colors, Font, FontSlant, FontUtils, FontWeight, GlyphRun, Graphics, Matrix, Paint, Paragraph, ParagraphBuilder, ParagraphDirection, ParagraphStyle, Path, PlaceholderAlignment, Point2, Rectangle, Rotation, RoundRectangle, Shape, ShapedLine, TextAlignment, TextBaseline, TextDecoration, TextDirection, TextStyle, TextVerticalAlignment, } from '@/components/Engine'
import { TextCursor, Style, StyleInfo, } from './EntityUtils'

export abstract class AbstractTextShape extends Shape {
    public static DEFAULT_TEXT_PADDING = 4

    private _text: string
    private _fontPaint: Paint
    private _lines = new Array<ShapedLine>(0)
    private _cursor: TextCursor = new TextCursor(Colors.Black, Colors.Blue, 0, 0, 0, 800)
    private _startIndex = 0
    private _endIndex = 0
    private _selectStartIndex = 0
    private _selectStyle = new Style()
    private _styles = new Array<Style>(0)
    //private _font = new Font()
    private _runs = new Array<GlyphRun>(0)
    private _paragraphBuilder: ParagraphBuilder
    private _paragraphStyle: ParagraphStyle
    private _paragraph: Paragraph
    private _focused = false
    private _textMargin: number
    private _textVerticalAlignment: TextVerticalAlignment
    private _textWidth: number
    private _textHeight: number
    private _paragraphDirection: ParagraphDirection

    constructor (text = '', left = 0, top = 0, width = 100, height = 100) {
      super(left, top, width, height)
      // this.filled = false
      this.clipped = false
      this._textWidth = width
      this._textHeight = height
      this._textMargin = AbstractTextShape.DEFAULT_TEXT_PADDING
      this._text = ''
      this._fontPaint = new Paint()
      this._fontPaint.setColor(Colors.Blue)
      // this.path.addRectangle(Rectangle.makeLTWH(0, 0, width, height))
      this.buildShape()
      this._textVerticalAlignment  = TextVerticalAlignment.MIDDLE
      this._paragraphDirection = ParagraphDirection.LeftRight
      this._styles.push(new Style(this._text.length))
      this._paragraphStyle = new ParagraphStyle()
      this._paragraphBuilder = new ParagraphBuilder(this._paragraphStyle)
      this._paragraphBuilder.addText(this._text)
      this._paragraph = this._paragraphBuilder.build()
      this._paragraph.layout(this._textWidth - this._textMargin * 2)
      this.textAlignment = TextAlignment.CENTER
      this.insert(text)
      // const style = new Style(2, EngineUtils.FONT_NAME_SERIF, 36)
      // this.applyStyleToRange(style, 1, 3)
      // this.select(7, 7)
    }

    //public get font() {
    //  return this._font
    //}

    //public set font(value: Font) {
    //  this._font = value
    //}

    //public get fontPaint() {
    //  return this._fontPaint
    //}

    //public set fontPaint(value: Paint) {
    //  this._fontPaint = value
    //}

    public get textWidth() {
      return this._textWidth
    }

    public set textWidth(value: number) {
      this._textWidth = value
      this.buildLines()
    }

    public get textHeight() {
      return this._textHeight
    }

    public set textHeight(value: number) {
      this._textHeight = value
      this.buildLines()
    }
    
    public get paragraphDirection() {
      return this._paragraphDirection
    }

    public set paragraphDirection(value: ParagraphDirection) {
      this._paragraphDirection = value
      this.buildLines()
    }


    public get fontName() {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        return selectionStyles[0].typeFaceName
      } else {
        if(this._focused) {
          return this._selectStyle.typeFaceName
        } else {
          return this._styles[0].typeFaceName
        }
      } 
    }

    public set fontName(value: string) {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        selectionStyles.forEach(selectionStyle => {
          selectionStyle.typeFaceName = value
        })        
      } else {
        this._selectStyle.typeFaceName = value
        if(!this._focused) {
          this._styles.forEach(style => {
            style.typeFaceName = value
          })
        }
      }
      this.buildFontName()
      this.buildLines()
    }

    public get fontColor() {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        return selectionStyles[0].color
      } else {
        if(this._focused) {
          return this._selectStyle.color
        } else {
          return this._styles[0].color
        }
      } 
    }

    public set fontColor(value: Color) {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        selectionStyles.forEach(selectionStyle => {
          selectionStyle.color = value
        })        
      } else {
        this._selectStyle.color = value
        if(!this._focused) {
          this._styles.forEach(style => {
            style.color = value
          })
        }
      }
      this.buildLines()
    }

    public get fontSize() {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        return selectionStyles[0].size
      } else {
        if(this._focused) {
          return this._selectStyle.size
        } else {
          return this._styles[0].size
        }
      }
    }

    public set fontSize(value: number) {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        selectionStyles.forEach(selectionStyle => {
          selectionStyle.size = value
        })        
      } else {
        this._selectStyle.size = value
        if(!this._focused) {
          this._styles.forEach(style => {
            style.size = value
          })
        }
      }
      this.buildLines()
    }

    public get fontWeight() {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        return selectionStyles[0].bold ? FontWeight.BOLD : FontWeight.NORMAL
      } else {
        if(this._focused) {
          return this._selectStyle.bold ? FontWeight.BOLD : FontWeight.NORMAL
        } else {
          return this._styles[0].bold ? FontWeight.BOLD : FontWeight.NORMAL
        }
      }
    }

    public set fontWeight(value: FontWeight) {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        selectionStyles.forEach(selectionStyle => {
          selectionStyle.bold = value == FontWeight.BOLD
        })        
      } else {
        this._selectStyle.bold = value == FontWeight.BOLD
        if(!this._focused) {
          this._styles.forEach(style => {
            style.bold = value == FontWeight.BOLD
          })
        }
      }
      this.buildLines()
    }

    public get fontSlant() {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        return selectionStyles[0].italic ? FontSlant.ITALIC : FontSlant.UP_RIGHT
      } else {
        if(this._focused) {
          return this._selectStyle.italic ? FontSlant.ITALIC : FontSlant.UP_RIGHT
        } else {
          return this._styles[0].italic ? FontSlant.ITALIC : FontSlant.UP_RIGHT
        }
      }
    }

    public set fontSlant(value: FontSlant) {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        selectionStyles.forEach(selectionStyle => {
          selectionStyle.italic = value == FontSlant.ITALIC
        })        
      } else {
        this._selectStyle.italic = value == FontSlant.ITALIC
        if(!this._focused) {
          this._styles.forEach(style => {
            style.italic = value == FontSlant.ITALIC
          })
        }
      }
      this.buildLines()
    }

    public get textDecoration() {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        return selectionStyles[0].underline ? TextDecoration.UNDERLINE : TextDecoration.NONE
      } else {
        if(this._focused) {
          return this._selectStyle.underline ? TextDecoration.UNDERLINE : TextDecoration.NONE
        } else {
          return this._styles[0].underline ? TextDecoration.UNDERLINE : TextDecoration.NONE
        }
      }
    }

    public set textDecoration(value: TextDecoration) {
      if(this._endIndex != this._startIndex) {
        const selectionStyles = this.findSelectionStyles()
        selectionStyles.forEach(selectionStyle => {
          selectionStyle.underline = value == TextDecoration.UNDERLINE
        })        
      } else {
        this._selectStyle.underline = value == TextDecoration.UNDERLINE
        if(!this._focused) {
          this._styles.forEach(style => {
            style.underline = value == TextDecoration.UNDERLINE
          })
        }
      }
      this.buildLines()
    }

    public get textAlignment() {
      return this._paragraphStyle.textAlignment
    }

    public set textAlignment(value: TextAlignment) {
      this._paragraphStyle = new ParagraphStyle({
        maxLines: 0,
        textAlignment: value,
        textDirection: TextDirection.LTR,
        textStyle: new TextStyle(),
      })
      this.buildLines()
      this.rebuildSelection()
    }

    public get textVerticalAlignment() {
      return this._textVerticalAlignment
    }

    public set textVerticalAlignment(value: TextVerticalAlignment) {
      this._textVerticalAlignment = value
      this.buildLines()
      this.rebuildSelection()
    }

    public get textMargin () {
      return this._textMargin
    }

    public set textMargin (value: number) {
      this._textMargin = value
    }

    public get focused () {
      return this._focused
    }

    public set focused (value: boolean) {
      this._focused = value
    }

    public get text (): string {
      return this._text
    }

    public get selection(): string {
      return this._text.substring(this._startIndex, this._endIndex)
    }

    public get styles() {
      return this._styles
    }

    public set styles(value: Style[]) {
      this._styles = value
      this.buildLines()
      this.rebuildSelection()
    }
 
    public get richText(): string {
      let styles = this._styles
      let text =this._text
      let styleInfos: StyleInfo[] = []
      styles.forEach(style => {
        let styleInfo = style.makeStyleInfo()
        styleInfos.push(styleInfo)
      })
      let data = {
        type: 'richtext',
        text: text,
        styles: styleInfos
      }
      let result = JSON.stringify(data)
      return result
    }

    public get richSelection(): string{
      let styles = this.rebuildRangeStyles(this._startIndex, this._endIndex)
      let text =this._text.substring(this._startIndex, this._endIndex)
      let styleInfos: StyleInfo[] = []
      styles.forEach(style => {
        let styleInfo = style.makeStyleInfo()
        styleInfos.push(styleInfo)
      })
      let data = {
        type: 'richtext',
        text: text,
        styles: styleInfos
      }
      let result = JSON.stringify(data)
      return result
    }

    public set text (value: string) {
      this.deleteRange(0, this._text.length - 1)
      this.insert(value)
      this._text = value
      this.markDirty()
    }

    public set boundary (boundary: Rectangle) {
      super.boundary = boundary
      this.buildLines()
    }

    public get boundary () {
      return super.boundary
    }

    public get lines () {
      return this._lines
    }

    public handleBackspace () {
      this.deleteSelection()
    }

    /**
     * Skia will fail if no space here
     */
    public handleReturn () {
      this.insert('\r\n')
    }

    public selectAll () {
      this.select(0, this._text.length - 1)
    }

    public select (start: number, end: number) {
      if(start == this._startIndex && end == this._endIndex) {
        return
      }
      if(start == end) {
        this._selectStartIndex = start
      }
      this._startIndex = Math.min(start, end)
      this._endIndex = Math.max(start, end)
      const [startStyleIndex, preStartLen, ] = this.findStyleIndexAndPrevLength(this._startIndex, true)
      const [endStyleIndex, preEndLen, ] = this.findStyleIndexAndPrevLength(this._endIndex, false)
      this._selectStyle = this._styles[startStyleIndex].clone()
      // console.log(`text selectting =  ${startStyleIndex}  ${endStyleIndex} ${this._startIndex} ${this._endIndex}`)
      // if(this._startIndex == 3 && this._endIndex == 3) {
      //   console.log(`Exception is here`)
      // }
      this.rebuildSelection()
    }

    public selectTo (end: number) {
      this.select(this._selectStartIndex, end)
    }

    public enter (x2: number, y2: number) {
      let point = this.applyParagraphReverseMatrix(x2, y2)
      let newX = point.x 
      let newY = point.y
      //console.log(`Enter ${newX} ${newY}`)
      if(this.lines.length == 0) {
        this.updateCursorWithEmptyText()
        return
      }
      const firstLine = this._lines[0]
      const lastLine = this._lines[this._lines.length - 1]
      if(firstLine.top > newY - this.getTextPaddingY()) {
        const firstRun = firstLine.runs[0]
        const lastRun = firstLine.runs[firstLine.runs.length - 1]
        if(newX - this.getTextPaddingX() < firstRun.positions[0] ) {
          this.select(firstRun.indices[0], firstRun.indices[0])
        } else if(newX - this.getTextPaddingX() >= lastRun.positions[lastRun.indices.length * 2 - 2 ]) {
          this.select(lastRun.indices[lastRun.indices.length - 1],lastRun.indices[lastRun.indices.length - 1])
        } else {
          for (const run of firstLine.runs) {
            for (let index = 0; index < run.indices.length - 1; index++) {
              if (newX - this.getTextPaddingX() >= run.positions[index * 2] && newX - this.getTextPaddingX() <= run.positions[index * 2 + 2]) {
                console.log(`Enter index = ${run.indices[index]}`)
                this.select(run.indices[index], run.indices[index])
              }
            }
          }
        }        
      } else if(lastLine.bottom < newY -this.getTextPaddingY()) {
        const firstRun = lastLine.runs[0]
        const lastRun = lastLine.runs[lastLine.runs.length - 1]
        if(newX - this.getTextPaddingX() < firstRun.positions[0] ) {
          this.select(firstRun.indices[0], firstRun.indices[0])
        } else if(newX - this.getTextPaddingX() >= lastRun.positions[lastRun.indices.length * 2 - 2 ]) {
          this.select(lastRun.indices[lastRun.indices.length - 1],lastRun.indices[lastRun.indices.length - 1])
        } else {
          for (const run of lastLine.runs) {
            for (let index = 0; index < run.indices.length - 1; index++) {
              if (newX - this.getTextPaddingX() >= run.positions[index * 2] && newX - this.getTextPaddingX() <= run.positions[index * 2 + 2]) {
                console.log(`Enter index = ${run.indices[index]}`)
                this.select(run.indices[index], run.indices[index])
              }
            }
          }
        }        
      } else {
        for (let lineIndex = 0; lineIndex < this._lines.length; lineIndex++) {
          const line = this._lines[lineIndex]
          let selected = false
          if(line.top <= newY - this.getTextPaddingY() && line.bottom >= newY - this.getTextPaddingY()) {
            const firstRun = line.runs[0]
            const lastRun = line.runs[line.runs.length - 1]
            if(newX - this.getTextPaddingX() < firstRun.positions[0] ) {
              this.select(firstRun.indices[0], firstRun.indices[0])
            } else if(newX - this.getTextPaddingX() >= lastRun.positions[lastRun.indices.length * 2 - 2 ]) {
              this.select(lastRun.indices[lastRun.indices.length - 1],lastRun.indices[lastRun.indices.length - 1])
            } else {
              for (const run of line.runs) {
                for (let index = 0; index < run.indices.length - 1; index++) {
                  if (newX - this.getTextPaddingX() >= run.positions[index * 2] && newX - this.getTextPaddingX() <= run.positions[index * 2 + 2]) {
                    console.log(`Enter index = ${run.indices[index]}`)
                    this.select(run.indices[index], run.indices[index])
                    selected = true
                    break;
                  }
                }
              }
            }
          }
          if(selected) {
            break;
          }
        }
      }
    }

    public enterTo (x2: number, y2: number) {
      let point = this.applyParagraphReverseMatrix(x2, y2)
      let newX = point.x 
      let newY = point.y
      //console.log(`Enter ${newX} ${newY}`)
      if(this.lines.length == 0) {
        this.updateCursorWithEmptyText()
        return
      }
      const firstLine = this._lines[0]
      const lastLine = this._lines[this._lines.length - 1]
      if(firstLine.top > newY - this.getTextPaddingY()) {
        const firstRun = firstLine.runs[0]
        const lastRun = firstLine.runs[firstLine.runs.length - 1]
        if(newX - this.getTextPaddingX() < firstRun.positions[0] ) {
          this.selectTo(firstRun.indices[0])
        } else if(newX - this.getTextPaddingX() >= lastRun.positions[lastRun.indices.length * 2 - 2 ]) {
          this.selectTo(lastRun.indices[lastRun.indices.length - 1])
        } else {
          for (const run of firstLine.runs) {
            for (let index = 0; index < run.indices.length - 1; index++) {
              if (newX - this.getTextPaddingX() >= run.positions[index * 2] && newX - this.getTextPaddingX() <= run.positions[index * 2 + 2]) {
                console.log(`Enter index = ${run.indices[index]}`)
                this.selectTo(run.indices[index])
              }
            }
          }
        }        
      } else if(lastLine.bottom < newY -this.getTextPaddingY()) {
        const firstRun = lastLine.runs[0]
        const lastRun = lastLine.runs[lastLine.runs.length - 1]
        if(newX - this.getTextPaddingX() < firstRun.positions[0] ) {
          this.selectTo(firstRun.indices[0])
        } else if(newX - this.getTextPaddingX() >= lastRun.positions[lastRun.indices.length * 2 - 2 ]) {
          this.selectTo(lastRun.indices[lastRun.indices.length - 1])
        } else {
          for (const run of lastLine.runs) {
            for (let index = 0; index < run.indices.length - 1; index++) {
              if (newX - this.getTextPaddingX() >= run.positions[index * 2] && newX - this.getTextPaddingX() <= run.positions[index * 2 + 2]) {
                console.log(`Enter index = ${run.indices[index]}`)
                this.selectTo(run.indices[index])
              }
            }
          }
        }        
      } else {
        for (let lineIndex = 0; lineIndex < this._lines.length; lineIndex++) {
          const line = this._lines[lineIndex]
          let selected = false
          if(line.top <= newY - this.getTextPaddingY() && line.bottom >= newY - this.getTextPaddingY()) {
            const firstRun = line.runs[0]
            const lastRun = line.runs[line.runs.length - 1]
            if(newX - this.getTextPaddingX() < firstRun.positions[0] ) {
              this.selectTo(firstRun.indices[0])
            } else if(newX - this.getTextPaddingX() >= lastRun.positions[lastRun.indices.length * 2 - 2 ]) {
              this.selectTo(lastRun.indices[lastRun.indices.length - 1])
            } else {
              for (const run of line.runs) {
                for (let index = 0; index < run.indices.length - 1; index++) {
                  if (newX - this.getTextPaddingX() >= run.positions[index * 2] && newX - this.getTextPaddingX() <= run.positions[index * 2 + 2]) {
                    console.log(`Enter index = ${run.indices[index]}`)
                    this.selectTo(run.indices[index])
                    selected = true
                    break;
                  }
                }
              }
            }
          }
          if(selected) {
            break;
          }
        }
      }    
    }

    public moveColumns (columnCount: number) {
      if (this._startIndex == this._endIndex) {
        const index = Math.max(Math.min(this._startIndex + columnCount, this._text.length), 0)
        this.select(index, index)
      } else {
        const index = columnCount < 0 ? this._startIndex : this._endIndex
        this.select(index, index)
      }
    }

    public moveRows (rowCount: number) {
      let index = (rowCount < 0) ? this._startIndex : this._endIndex
      const lineIndex = this.getLinesIndexToLineIndex(index)
      if (rowCount < 0 && lineIndex == 0) {
        index = 0
      } else if (rowCount > 0 && lineIndex == this._lines.length - 1) {
        index = this._text.length
      } else {
        const x = this.getRunsIndexToX(this._lines[lineIndex], index)
        index = this.getRunsXToIndex(this._lines[lineIndex + rowCount], x)
      }
      this.select(index, index)
    }

    public deleteSelection () {
      let start = this._startIndex
      if (start == this._endIndex) {
        if (start == 0) {
          return
        }
        this.deleteRange(start - 1, start)
        start -= 1
      } else {
        this.deleteRange(start, this._endIndex)
      }

      this._startIndex = this._endIndex = start            
      this.buildLines()
      this.rebuildSelection()
    }

    public insertRichText(richText: string) {
      let data = JSON.parse(richText)
      if(data.type !== 'richtext') {
        console.log(`unknow rich text detected: ${richText}`)
        return
      }
      let styleInfos: StyleInfo[] = data.styles
      let insertText: string = data.text
      let insertStyles: Style[] = []
      styleInfos.forEach(styleInfo => {
        let newStyleInfo = new StyleInfo(styleInfo.length, styleInfo.typeFaceName, styleInfo.size, styleInfo.color, styleInfo.bold, styleInfo.italic, styleInfo.underline)
        let style = newStyleInfo.makeStyle()
        insertStyles.push(style)
      })
      if (!insertText || insertText.length <= 0) {
        return
      }
      if (this._startIndex != this._endIndex) {
        this.deleteSelection()
      }
      const index = this._startIndex
      const [ styleIndex, preLength, ] = this.findStyleIndexAndPrevLength(index, false)
      const style = this._styles[styleIndex]
      const newStyles = []
      if(preLength == index) {
        for(let i = 0; i < styleIndex; i ++) {
          newStyles.push(this._styles[i])
        }
        for(let i = 0; i < insertStyles.length; i ++) {
          newStyles.push(insertStyles[i])
        }
        for(let i = styleIndex; i < this._styles.length; i ++) {
          newStyles.push(this._styles[i])
        }
        this._styles = newStyles
      } else if (preLength < index) {
        for(let i = 0; i < styleIndex; i ++) {
          newStyles.push(this._styles[i])
        }
        let newStyle = style.clone()
        newStyle.length = index - preLength
        newStyles.push(newStyle)
        for(let i = 0; i < insertStyles.length; i ++) {
          newStyles.push(insertStyles[i])
        }
        newStyle = style.clone()
        newStyle.length = newStyle.length - index + preLength
        newStyles.push(newStyle)
        for(let i = styleIndex + 1; i < this._styles.length; i ++) {
          newStyles.push(this._styles[i])
        }
        this._styles = newStyles
      } else {
        // It is impossible here
      }
      this._text = this._text.slice(0, index) + insertText + this._text.slice(index)
      this.buildLines()
      this.rebuildSelection()
    }

    public insert (text: string) {
      //if(text == 't') {
      //  console.log('1')
      //}
      if (!text || text.length <= 0) {
        return
      }
      if (this._startIndex != this._endIndex) {
        this.deleteSelection()
      }
      //this.insertInternal(text)
      //Need to handle such as chinese if ansi font used here.
      const glyphIDs = FontUtils.splitGlyphIds(this._selectStyle.typeFaceName, text)
      // if(glyphIDs.length > 0) {
      //   const a = this._selectStyle.font.getGlyphWidths([4])
      //   console.log(a)
      // }
      const origFontName = this._selectStyle.typeFaceName
      let index = 0
      for(const glyphList of glyphIDs) {
        const subText = text.substring(index, index + glyphList.length)
        index += glyphList.length
        if(FontUtils.isValidGlyphID(glyphList, 0, subText)) {
          this._selectStyle.typeFaceName = origFontName
          this.insertInternal(subText)
        } else {
          this._selectStyle.typeFaceName = FontUtils.currentLanguageFont.defaultNonLatinFont
          this.insertInternal(subText)
        }
      }
      //this._selectStyle.typeFaceName = origFontName
    }

    private insertInternal(text: string) {
      const index = this._startIndex
      const [ styleIndex, preLength, ] = this.findStyleIndexAndPrevLength(index, false)
      const style = this._styles[styleIndex]
      if(style.length == 0) { //Empty 
        this._styles[styleIndex] = this._selectStyle.clone()         
        this._styles[styleIndex].length += text.length
        this._text = this._text.slice(0, index) + text + this._text.slice(index)
        this._startIndex = this._endIndex = index + text.length
      } else if(!style.isSameStyle(this._selectStyle)){
        let totalLength = 0
        for (let i = 0; i < this._styles.length; ++i) {
          const styleLength = this._styles[i].length
          totalLength += styleLength
          if (index < totalLength) {
            let rightStyle = style.clone()
            let leftStyle = style.clone()
            let newStyle = this._selectStyle.clone()
            rightStyle.length = totalLength - index
            leftStyle.length = style.length - rightStyle.length
            newStyle.length = text.length
            this._styles[i] = leftStyle
            if(i == this._styles.length - 1) {
              this._styles.push(newStyle, rightStyle)
            } else {
              this._styles.splice(i + 1, 0, newStyle, rightStyle)
            }
            i = i + 2
            this._text = this._text.slice(0, index) + text + this._text.slice(index)
            this._startIndex = this._endIndex = index + text.length
            break
          } else if(index  == totalLength) {
            let newStyle = this._selectStyle.clone()         
            newStyle.length = text.length
            this._styles.splice(i + 1, 0, newStyle)
            this._text = this._text.slice(0, index) + text + this._text.slice(index)
            this._startIndex = this._endIndex = index + text.length
            i ++
          }
        }
      } else {
        this._styles[styleIndex].length += text.length
        this._text = this._text.slice(0, index) + text + this._text.slice(index)
        this._startIndex = this._endIndex = index + text.length
        // this.select(this._startIndex, this._endIndex)      
      }

      this.buildLines()
      this.rebuildSelection()
    }

    public findStyleIndexAndPrevLength (index: number, forRight: boolean) {
      let prevLength = 0
      let currLength = 0
      for (let i = 0; i < this._styles.length; ++i) {
        const length = this._styles[i].length
        currLength += length
        if(forRight) {
          if (index >= prevLength && index < currLength) {
            return [ i, prevLength, ]
          }
        } else {
          if(index <= currLength) {
            return [i, prevLength]
          }
        }
        prevLength = currLength
      }
      return [ this._styles.length - 1, prevLength, ]
    }

    public render (graphics: Graphics): void {
      super.render(graphics)

      //Apply paragraph direction matrix here
      const matrix = this.getParagraphMatrix()      
      graphics.concat(matrix)

      if (this._focused) {
        this._cursor.renderBefore(graphics)
      }

      //if only space in text will cause empty runs
      if(this._runs.length <= 0) {
        return
      }
      const runs = this._runs
      const styles = this._styles
      const fontPaint = this._fontPaint

      let style = styles[0]
      let styleIndex = 0
      let styleStart = 0
      let styleEnd = style.length

      let run = runs[0]
      let runIndex = 0

      let start = 0
      let end = 0
      while (start < this._text.length) {
        while (run.textRange.end <= start) {
          run = runs[++runIndex]
          if (!run) { // space
            break
          }
        }
        if (!run) { //space
          break 
        }
        while (styleEnd <= start) {
          style = styles[++styleIndex]
          if(!style) {
            break
          }
          styleStart = styleEnd
          styleEnd += style.length
        }
        end = Math.min(run.textRange.end, styleEnd)

        // check that we have anything to draw
        if (run.textRange.start >= end) {
          start = end
          continue // could be a span of WS with no glyphs
        }

        //              f.setTypeface(r.typeface); // r.typeface is always null (for now)
        const font = style.font
        // font.fontSize = run.size
        // font.embolden = style.bold
        // font.fontName = style.typeFaceName
        font.skewX = style.italic ? -0.2 : 0
        fontPaint.setColor(style.color)

        let gly = run.glyphs
        let pos = run.positions
        if (start > run.textRange.start || end < run.textRange.end) {
          // search for the subset of glyphs to draw
          let glyph_start = 0; let glyph_end = 0
          for (let i = 0; i < run.indices.length; ++i) {
            if (run.indices[i] >= start) {
              glyph_start = i
              break
            }
          }
          for (let i = glyph_start + 1; i < run.indices.length; ++i) {
            if (run.indices[i] >= end) {
              glyph_end = i
              break
            }
          }
          // LOG('    glyph subrange', glyph_start, glyph_end)
          gly = gly.slice(glyph_start, glyph_end)
          // +2 at the end so we can see the trailing position (esp. for underlines)
          pos = pos.slice(glyph_start * 2, glyph_end * 2 + 2)
        } else {
          // LOG('    use entire glyph run')
        }
        // canvas.drawGlyphs(gly, pos, 0, 0, f, p)
        let startX = this.getTextPaddingX()
        let startY = this.getTextPaddingY()
        //graphics.
        //const glyphFont = new Font(run.typefaceName, run.size)
        graphics.drawGlyphs(gly, pos, startX, startY, font, fontPaint)

        if (style.underline) {
          const gap = 2
          const Y = pos[1] // first Y
          const lastX = pos[gly.length * 2]
          const sects = font.getGlyphIntercepts(gly, pos, Y + 2, Y + 4)

          let x = pos[0]
          for (let i = 0; i < sects.length; i += 2) {
            const end = sects[i] - gap
            if (x < end) {
              graphics.drawRect4f(x + startX, Y + 2 + startY, end + startX, Y + 4 + startY, fontPaint)
            }
            x = sects[i + 1] + gap
          }
          if (x < lastX) {
            graphics.drawRect4f(x + startX, Y + 2 + startY, lastX + startX, Y + 4 + startY, fontPaint)
          }
        }

        start = end
      }

      if (this._focused) {
        this._cursor.renderAfter(graphics)
      }
    }

    public update () {
      super.update()
      if (this.dirty) {
        this.path.reset()
        this.buildShape()
      }
    }

    private rebuildSelection () {
      if(this._lines.length == 0) {
          this.updateCursorWithEmptyText()
          return
      }
      const startIndex = this._startIndex
      const endIndex = this._endIndex
      if (startIndex == endIndex) {
        const line = this.getLinesIndexToLine(startIndex)
        const run = this.getRunsIndexToRun(line, startIndex)
        let x = run.positions[run.positions.length - 2]
        let top = line.top
        for (let i = 0; i < run.indices.length - 1; i++) {
          if (startIndex == run.indices[i]) {
            x = run.positions[i * 2]
            top = line.baseline - run.size
          }
        }
        this._cursor.place(x + this.getTextPaddingX(), top + this.getTextPaddingY(), line.bottom + this.getTextPaddingY())
      } else {
        const path = this.getLinesIndicesToPath(startIndex, endIndex)
        this._cursor.path = path
      }
    }

    private buildFontName() {
      if(this._text.length <= 0) {
        return
      }
      const newStyles: Array<Style> = []
      let pos = 0
      for(const style of this._styles) {
        const text = this._text.substring(pos, pos + style.length)
        const glyphIDs = FontUtils.splitGlyphIds(style.typeFaceName, text)
        let index = 0
        for(const glyphIDList of glyphIDs) {
          const subText = text.substring(index, index + glyphIDList.length)
          index += glyphIDList.length
          const newStyle = style.clone()
          newStyle.length = glyphIDList.length
          if(FontUtils.isValidGlyphID(glyphIDList, 0, subText)) {
            newStyles.push(newStyle)
          } else {
            newStyle.typeFaceName = FontUtils.currentLanguageFont.defaultNonLatinFont
            newStyles.push(newStyle)
          }
        }
        pos += style.length        
      }
      this._styles = newStyles
    }

    private buildLines () {
      // const blocks = new Array<Block>(0)
      // let block = null
      // for (const s of this._styles) {
      //   if (!block || (block.typefaceName === s.typeFaceName && block.size === s.size)) {
      //     if (!block) {
      //       block = new Block(s.typeFaceName, 0, s.size)
      //     }
      //     block.length += s.length
      //   } else {
      //     blocks.push(block)
      //     block = new Block(s.typeFaceName, s.length, s.size)
      //   }
      // }
      // if (block) {
      //   blocks.push(block)
      // }

      // this._lines = Graphics.shapeText(this._text, blocks, this.width)
      // this.rebuildSelection()

      this._paragraphBuilder = new ParagraphBuilder(this._paragraphStyle)
      //this._paragraphBuilder.addPlaceholder(100, 100, this.placeholderAlignment, TextBaseline.ALPHABETIC, 1)
      let index = 0
      //blocks.forEach(block => {
      //  this._paragraphBuilder.pushStyle(block.textStyle)
      //  this._paragraphBuilder.addText(this._text.substring(index, index + block.length))
      //  index += block.length
      //})
      this._styles.forEach(style => {
        //this._paragraphBuilder.pushStyle(style.makeTextStyle())
        //this._paragraphBuilder.addText(this._text.substring(index, index + style.length))
        this.populateTextStyle(style, index)
        index += style.length
      })
      this._paragraph = this._paragraphBuilder.build()
      this._paragraph.layout(this.textWidth - this.getTextPaddingX() * 2)
      this._lines = this._paragraph.getShapedLines()
      this._runs.length = 0
      let startIndex = 0
      let _this = this
      for (const line of this._lines) {
        for (const run of line.runs) {
          run.indices = []
          run.offsets.forEach((offset: number, index: number) => {
            run.indices.push(startIndex)
            //replace white space with 'a' and then replace them back in ShapeLines since it will skip whitespace like trim().We get whitespace back  here
            if(_this.text[startIndex] == ' ' && index < run.offsets.length - 1) {
              run.glyphs[index] = 4 //whitespace
            }
            startIndex++
          })
          startIndex--          
          
          //Repair invisible characters because they are removed after built in shape line.
          //console.log(`${_this._text.length}    ${startIndex + 2} ${_this._text[startIndex]} ${_this._text[startIndex] == '\r'}  ` )
          if(_this._text.length >= startIndex + 2 && _this._text[startIndex] == '\r' && _this._text[startIndex + 1] == '\n'){
            startIndex = startIndex + 2
          }
          run.textRange = { start: run.indices[0], end: run.indices[run.indices.length - 1], }
          _this._runs.push(run)
        }
      }
    }


    //replace white space with 'a' and then replace them back in ShapeLines since it will skip whitespace like trim()
    private populateTextStyle(style: Style, index: number) {
      let subText = this._text.substring(index, index + style.length)
      subText = subText.replaceAll(' ', 'a')
      this._paragraphBuilder.pushStyle(style.makeTextStyle())
      this._paragraphBuilder.addText(subText)
    }

    private deleteRange (start: number, end: number) {
      if (start === end) {
        return false
      }

      this.deleteStyleRange(start, end)
      this._text = this._text.slice(0, start) + this._text.slice(end, this._text.length)
      return true
    }

    private deleteStyleRange (start: number, end: number) {
      let count = end - start
      let [ styleIndex, prevLength, ] = this.findStyleIndexAndPrevLength(start, false)
      //Skip if it is last style
      if(styleIndex == 0 && this._styles.length == 1) {
        return
      }

      let style = this._styles[styleIndex]
      if (start > prevLength) {
        // we overlap the first style (but not entirely
        const skip = start - prevLength
        const shrink = Math.min(count, style.length - skip)
        style.length -= shrink
        count -= shrink
        if (count === 0) {
          return
        }
        styleIndex += 1
      }
      while (count > 0) {
        style = this._styles[styleIndex]
        if (count >= style.length) {
          count -= style.length
          this._styles.splice(styleIndex, 1)
        } else {
          style.length -= count
          break
        }
      }
    }

    private rebuildRangeStyles(start: number, end: number) {
      let newStyles = []
      let [startIndex, startLength, ] = this.findStyleIndexAndPrevLength(start, true)
      let [endIndex, endLength, ] = this.findStyleIndexAndPrevLength(end, false)
      let newStyle = this._styles[startIndex].clone()
      newStyles.push(newStyle)
      if(start > startLength) {
        newStyle.length = newStyle.length - start + startLength
      }
      while(startIndex < endIndex) {
        startIndex ++
        newStyle = this._styles[startIndex].clone()
        newStyles.push(newStyle)
        if(startIndex == endIndex && end < endLength + newStyle.length) {
          newStyle.length = end - endLength
        }
      }
      return newStyles

    }

    private getLinesIndexToLineIndex (index: number) {
      let lineIndex = 0
      for (const line of this._lines) {
        //Currently there is a bug which seems not support chinese or unicode 16 and so we need to switch to use textrange in Runs
        //if (index <= line.textRange.last) {
        //  return i
        //}
        for(const run of line.runs) {
          if(index <= run.textRange.end) {
            return lineIndex
          }
        }
        lineIndex += 1
      }
      return this._lines.length - 1
    }

    private getLinesIndexToLine (index: number) {
      const lineIndex = this.getLinesIndexToLineIndex(index)
      return this._lines[lineIndex]
    }

    private getRunsIndexToX (line: ShapedLine, index: number) {
      const run = this.getRunsIndexToRun(line, index)
      for (let i = 0; i < run.indices.length - 1; i++) {
        if (index == run.indices[i]) {
          return run.positions[i * 2]
        }
      }
      return run.positions[run.positions.length - 2]
    }

    private getRunsIndexToRun (line: ShapedLine, index: number) {
      for (const run of line.runs) {
        if (index <= run.indices[run.indices.length - 1]) {
          return run
        }
      }
      return line.runs[line.runs.length - 1]
    }

    private getLinesIndicesToPath (startIndex: number, endIndex: number) {
      console.log(`getLinesIndicesToPath=> ${startIndex}  ${endIndex}`)
      if (startIndex == endIndex) {
        return undefined
      }
      const path = new Path()
      const startLineIndex = this.getLinesIndexToLineIndex(startIndex)
      const endLineIndex = this.getLinesIndexToLineIndex(endIndex)
      const startLine = this.getLinesIndexToLine(startIndex)
      const endLine = this.getLinesIndexToLine(endIndex)
      const startLineStartX = this.getRunsIndexToX(startLine, startIndex)
      const endLineEndX = this.getRunsIndexToX(endLine, endIndex)
      //if (startLine == endLine) {
      //  path.addRectangle(new Rectangle(startLineStartX + this.getTextPaddingX(), startLine.top + this.getTextPaddingY(), endLineEndX + this.getTextPaddingX(), startLine.bottom + this.getTextPaddingY()))
      //} else {
      //  path.addRectangle(new Rectangle(startLineStartX + this.getTextPaddingX(), startLine.top + this.getTextPaddingY(), startLine.right + this.getTextPaddingX(), startLine.bottom + this.getTextPaddingY()))
      //  path.addRectangle(new Rectangle(0 + this.getTextPaddingX(), endLine.top + this.getTextPaddingY(), endLineEndX + this.getTextPaddingX(), endLine.bottom + this.getTextPaddingY()))
      //  if (startLine.bottom < endLine.top) {          
      //    path.addRectangle(new Rectangle(0 + this.getTextPaddingX(), startLine.bottom + this.getTextPaddingY(), this.width + this.getTextPaddingX(), endLine.top + this.getTextPaddingY()))
      //  }
      //}
      if(startLineIndex == endLineIndex) {
        path.addRectangle(new Rectangle(startLineStartX + this.getTextPaddingX(), startLine.top + this.getTextPaddingY(), endLineEndX + this.getTextPaddingX(), startLine.bottom + this.getTextPaddingY()))
      } else {
        const startLineEndX = this.getLineToX(startLine)
        const endLineStartX = this.getLineFromX(endLine)
        path.addRectangle(new Rectangle(startLineStartX + this.getTextPaddingX(), startLine.top + this.getTextPaddingY(), startLineEndX + this.getTextPaddingX(), startLine.bottom + this.getTextPaddingY()))
        path.addRectangle(new Rectangle(endLineStartX + this.getTextPaddingX(), endLine.top + this.getTextPaddingY(), endLineEndX + this.getTextPaddingX(), endLine.bottom + this.getTextPaddingY()))
        for(let index = startLineIndex + 1; index <= endLineIndex - 1; index ++) {
          const line = this._lines[index]
          const lineEndX  = this.getLineToX(line)
          const lineStartX = this.getLineFromX(line)
          path.addRectangle(new Rectangle(lineStartX + this.getTextPaddingX(), line.top + this.getTextPaddingY(), lineEndX + this.getTextPaddingX(), line.bottom + this.getTextPaddingY()))
        }
      }
      return path
    }

    private getLineToX(line: ShapedLine): number {
      let run = line.runs[line.runs.length - 1]
      let x = run.positions[run.positions.length - 2]
      return x
    }

    private getLineFromX(line: ShapedLine): number {
      let run = line.runs[0]
      let x = run.positions[0]
      return x
    }

    private getRunsXToIndex (line: ShapedLine, x: number) {
      for (const run of line.runs) {
        for (let i = 1; i < run.indices.length; i += 1) {
          if (x < run.positions[i * 2]) {
            const mid = (run.positions[i * 2 - 2] + run.positions[i * 2]) * 0.5
            if (x <= mid) {
              return run.indices[i - 1]
            } else {
              return run.indices[i]
            }
          }
        }
      }
      const run = line.runs[line.runs.length - 1]
      return run.indices[run.indices.length - 1]
    }

    private getTextPaddingX() {
      return this._textMargin
    }

    private getTextPaddingY() {
      let startY = this._textMargin
      let paragraphHeight = this._paragraph.getHeight()
      if(paragraphHeight == 0) {
        //Empty text and so we assume height is font size x 140%
        paragraphHeight = this.fontSize * 1.4
      }
      switch(this._textVerticalAlignment) {
        case TextVerticalAlignment.TOP:
          startY = this._textMargin
          break;
        case TextVerticalAlignment.BOTTOM:
          startY = this.textHeight - this._textMargin - paragraphHeight
          break;
        case TextVerticalAlignment.MIDDLE:
        default:            
          startY = this._textMargin + (this.textHeight - this._textMargin * 2  - paragraphHeight) / 2
          break;
      }
      return startY
  }

  private getParagraphMatrix() {
    let matrix = new Matrix()
    switch(this._paragraphDirection) {
      case ParagraphDirection.BottomTop:
        matrix.translate(0, this.textWidth)
        matrix.rotate(270 * Math.PI / 180, 0, 0)
        break;
      case ParagraphDirection.TopBottom:
        matrix.translate(this.textHeight, 0)
        matrix.rotate(90 * Math.PI / 180, 0, 0)
        break;
      default:
      case ParagraphDirection.LeftRight:
        break;  
    }
    return matrix
  }

  private getParagraphReverseMatrix() {
    let matrix = this.getParagraphMatrix()
    let reverseMatrix = matrix.invert()
    return reverseMatrix
  }

  private applyParagraphMatrix(x: number, y: number) {
    let matrix = this.getParagraphMatrix()
    return matrix.makePoint(new Point2(x, y))
  }

  private applyParagraphReverseMatrix(x: number, y: number) {
    let matrix = this.getParagraphReverseMatrix()
    if(matrix) {
      return matrix.makePoint(new Point2(x, y))
    } else {
      return new Point2(x, y)
    }
  }

  private updateCursorWithEmptyText() {
    //Empty text and so we assume height is font size x 140%
    let newLeft = this.getTextPaddingX()
    switch(this.textAlignment){
      case TextAlignment.RIGHT:
        newLeft = this.width - this.getTextPaddingX()
        break;
      case TextAlignment.CENTER:
        newLeft = this.width / 2
        break;
      case TextAlignment.LEFT:
      default:
        newLeft = this.getTextPaddingX()
        break;
    }
    this._cursor.place(newLeft, this.getTextPaddingY() , this.getTextPaddingY() + this.fontSize * 1.4)
  }

  private splitStylesByIndex(start: number) {
    let newStyles = []
    let [startIndex, startLength, ] = this.findStyleIndexAndPrevLength(start, true)
    let newStyle = this._styles[startIndex].clone()
    newStyles.push(newStyle)
    if(start > startLength) {
      newStyle.length = newStyle.length - start + startLength
      this._styles[startIndex].length = start - startLength
      this._styles.splice(startIndex + 1, 0, newStyle)
    }
  }

  private findSelectionStyles() {
    this.splitStylesByIndex(this._startIndex)
    this.splitStylesByIndex(this._endIndex)
    const [startIndex, startLength, ] = this.findStyleIndexAndPrevLength(this._startIndex, true)
    const [endIndex, endLength, ] = this.findStyleIndexAndPrevLength(this._endIndex, false)
    const selectionStyles = this._styles.slice(startIndex, endIndex + 1)
    return selectionStyles
  }

  protected abstract buildShape (): void;
}
