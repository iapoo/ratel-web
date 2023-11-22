/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

import { Color, Colors, Font, FontSlant, FontWeight, GlyphRun, Graphics, Matrix, Paint, Paragraph, ParagraphBuilder, ParagraphDirection, ParagraphStyle, Path, PlaceholderAlignment, Point2, Rectangle, Rotation, RoundRectangle, Shape, ShapedLine, TextAlignment, TextBaseline, TextDecoration, TextDirection, TextStyle, TextVerticalAlignment, } from '@/components/Engine'
import { Block, CursorMaker, Style, } from './EntityUtils'

export abstract class AbstractTextShape extends Shape {
    public static DEFAULT_TEXT_PADDING = 4

    private _text: string
    private _fontPaint: Paint
    private _lines = new Array<ShapedLine>(0)
    private _cursor: CursorMaker = new CursorMaker(Colors.Black, Colors.Blue, 0, 0, 0, 750)
    private _startIndex = 0
    private _endIndex = 0
    private _selectStartIndex = 0
    private _startStyleIndex = 0
    private _endStyleIndex = 0
    private _selectStyle = new Style()
    private _styles = new Array<Style>(0)
    private _font = new Font()
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

    public get fontColor() {
      if(this._focused) {
        return this._selectStyle.color
      } else {
      return this._styles[0].color
    }
    }

    public set fontColor(value: Color) {
      //this._styles[this._startStyleIndex].color = value
      this._selectStyle.color = value
      if(!this._focused) {
        this._styles.forEach(style => {
          style.color = value
        })
      }
      this.buildLines()
    }

    public get fontSize() {
      if(this._focused) {
        return this._selectStyle.size
      } else {
        return this._styles[0].size
      }
    }

    public set fontSize(value: number) {
      //this._styles[this._startStyleIndex].size = value
      this._selectStyle.size = value
      if(!this._focused) {
        this._styles.forEach(style => {
          style.size = value
        })
      }
      this.buildLines()
    }

    public get fontWeight() {
      if(this._focused) {
        return this._selectStyle.bold ? FontWeight.BOLD : FontWeight.NORMAL
      } else {
        return this._styles[0].bold ? FontWeight.BOLD : FontWeight.NORMAL
      }
    }

    public set fontWeight(value: FontWeight) {
      //this._styles[this._startStyleIndex].bold = value == FontWeight.BOLD
      this._selectStyle.bold = value == FontWeight.BOLD
      if(!this._focused) {
        this._styles.forEach(style => {
          style.bold = value == FontWeight.BOLD
        })
      }
      this.buildLines()
    }

    public get fontSlant() {
      if(this._focused) {
        return this._selectStyle.italic ? FontSlant.ITALIC : FontSlant.UP_RIGHT
      } else {
        return this._styles[0].italic ? FontSlant.ITALIC : FontSlant.UP_RIGHT
      }
    }

    public set fontSlant(value: FontSlant) {
      //this._styles[this._startStyleIndex].italic = value == FontSlant.ITALIC
      this._selectStyle.italic = value == FontSlant.ITALIC
      if(!this._focused) {
        this._styles.forEach(style => {
          style.italic = value == FontSlant.ITALIC
        })
      }
      this.buildLines()
    }

    public get textDecoration() {
      if(this._focused) {
        return this._selectStyle.underline ? TextDecoration.UNDERLINE : TextDecoration.NONE
      } else {
        return this._styles[0].underline ? TextDecoration.UNDERLINE : TextDecoration.NONE
    }
    }

    public set textDecoration(value: TextDecoration) {
      //this._styles[this._startStyleIndex].underline = value == TextDecoration.UNDERLINE
      this._selectStyle.underline = value == TextDecoration.UNDERLINE
      if(!this._focused) {
        this._styles.forEach(style => {
          style.underline = value == TextDecoration.UNDERLINE
        })
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

    public get richText(): string {
      let styles = this._styles
      let text =this._text
      return ''
    }

    public get richSelection(): string{
      return ''
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

    // eslint-disable-next-line accessor-pairs
    // public set width (width: number) {
    //  this.boundary = Rectangle.makeLTWH(this.boundary.left, this.boundary.top, width, this.boundary.height)
    // }

    // eslint-disable-next-line accessor-pairs
    // public set right (right: number) {
    //  this.boundary = Rectangle.makeLTWH(this.boundary.left, this.boundary.top, right - this.boundary.left, this.boundary.height)
    // }

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
      const [startStyleIndex, preStartLen, ] = this.findStyleIndexAndPrevLength(this._startIndex)
      const [endStyleIndex, preEndLen, ] = this.findStyleIndexAndPrevLength(this._endIndex)
      this._startStyleIndex = startStyleIndex
      this._endStyleIndex = endStyleIndex
      this._selectStyle = this._styles[startStyleIndex].clone()
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
        //Empty text and so we assume height is font size x 140%
        this._cursor.place(this.getTextPaddingX(), this.getTextPaddingY() , this.getTextPaddingY() + this.fontSize * 1.4)
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
        //Empty text and so we assume height is font size x 140%
        this._cursor.place(this.getTextPaddingX(), this.getTextPaddingY() , this.getTextPaddingY() + this.fontSize * 1.4)
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
      const i = this.getLinesIndexToLineIndex(index)
      if (rowCount < 0 && i == 0) {
        index = 0
      } else if (rowCount > 0 && i == this._lines.length - 1) {
        index = this._text.length
      } else {
        const x = this.getRunsIndexToX(this._lines[i], index)
        index = this.getRunsXToIndex(this._lines[i + rowCount], x)
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

    public insert (text: string) {
      //if(text == '方式') {
      //  console.log('1')
      //}
      if (!text || text.length <= 0) {
        return
      }
      if (this._startIndex != this._endIndex) {
        this.deleteSelection()
      }

      // do this before edit the text (we use text.length in an assert)
      const index = this._startIndex
      const [ styleIndex, preLen, ] = this.findStyleIndexAndPrevLength(index)
      const style = this._styles[styleIndex]
      if(style.length == 0) { //Empty yet
        this._styles[styleIndex] = this._selectStyle.clone()         
        this._styles[styleIndex].length += text.length
        this._text = this._text.slice(0, index) + text + this._text.slice(index)
        this._startIndex = this._endIndex = index + text.length
      } else if(!style.isSameStyle(this._selectStyle)){
        let totalLength = 0
        for (let i = 0; i < this._styles.length; ++i) {
          const styleLength = style.length
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

    public findStyleIndexAndPrevLength (index: number) {
      let length = 0
      for (let i = 0; i < this._styles.length; ++i) {
        const l = this._styles[i].length
        length += l
        // < favors the latter style if index is between two styles
        if (index <= length) {
          return [ i, length - l, ]
        }
      }
      return [ this._styles.length - 1, length, ]
    }

    public applyStyleToRange (style: Style, startIndex: number, endIndex: number) {
      // if (start > end) { [ start, end, ] = [ end, start, ] }
      // ASSERT(start >= 0 && end <= this._text.length)
      let start = startIndex
      let end = endIndex
      if (start === end) {
        return
      }

      // LOG('trying to apply', style, start, end)
      let i
      for (i = 0; i < this._styles.length; ++i) {
        if (start <= this._styles[i].length) {
          break
        }
        start -= this._styles[i].length
        end -= this._styles[i].length
      }

      let s = this._styles[i]
      // do we need to fission off a clean subset for the head of s?
      if (start > 0) {
        const ns = s.clone()
        s.length = start
        ns.length -= start
        // LOG('initial splice', i, start, s._length, ns._length)
        i += 1
        this._styles.splice(i, 0, ns)
        end -= start
        // we don't use start any more
      }
      // merge into any/all whole styles we overlap
      let layoutChanged = false
      while (end >= this._styles[i].length) {
        // LOG('whole run merging for style index', i)
        layoutChanged = layoutChanged || this._styles[i].mergeFrom(style)
        end -= this._styles[i].length
        i += 1
        if (end == 0) {
          break
        }
      }
      // do we partially cover the last run
      if (end > 0) {
        s = this._styles[i]
        const ns = s.clone() // the new first half
        ns.length = end
        s.length -= end // trim the (unchanged) tail
        // LOG('merging tail', i, ns._length, s._length)
        layoutChanged = layoutChanged || ns.mergeFrom(style)
        this._styles.splice(i, 0, ns)
      }

      // this._validateStyles()
      // LOG('after applying styles', this._styles)
      
      if (layoutChanged) {
        this.buildLines()
      }
    }

    public applyStyleToSelection (style: Style) {
      this.applyStyleToRange(style, this._startIndex, this._endIndex)
    }

    public render (graphics: Graphics): void {
      super.render(graphics)

        // switch(this._paragraphDirection) {
        //   case ParagraphDirection.BottomTop:
        //     graphics.translate(0, this.textWidth)
        //     graphics.rotate(270, 0, 0)
        //     break
        //   case ParagraphDirection.TopBottom:
        //     graphics.translate(this.textHeight, 0)
        //     graphics.rotate(90, 0, 0)
        //     break
        //   default:
        //   case ParagraphDirection.LeftRight:
        //     //Do nothing for default case
        //     break;
        // }
      //Apply paragraph direction matrix here
      const matrix = this.getParagraphMatrix()      
      graphics.concat(matrix)

      if (this._focused) {
        this._cursor.renderBefore(graphics)
      }

      const runs = this._runs
      const styles = this._styles
      const font = this._font
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
          if (!run) {
            // ran out of runs, so the remaining text must just be WS
            break
          }
        }
        if (!run) { break }
        while (styleEnd <= start) {
          style = styles[++styleIndex]
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
        font.fontSize = run.size
        font.embolden = style.bold
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
          //Empty text and so we assume height is font size x 140%
          this._cursor.place(this.getTextPaddingX(), this.getTextPaddingY() , this.getTextPaddingY() + this.fontSize * 1.4)
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

    private buildLines () {
      const blocks = new Array<Block>(0)
      let block = null
      for (const s of this._styles) {
        if (!block || (block.typefaceName === s.typeFaceName && block.size === s.size)) {
          if (!block) {
            block = new Block(s.typeFaceName, 0, s.size)
          }
          block.length += s.length
        } else {
          blocks.push(block)
          block = new Block(s.typeFaceName, s.length, s.size)
        }
      }
      if (block) {
        blocks.push(block)
      }

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
        this._paragraphBuilder.pushStyle(style.makeTextStyle())
        this._paragraphBuilder.addText(this._text.substring(index, index + style.length))
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
          run.offsets.forEach(offset => {
            run.indices.push(startIndex)
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

    private deleteRange (start: number, end: number) {
      if (start === end) {
        return false
      }

      this.deleteStyleRange(start, end)
      // Do this after shrink styles (we use text.length in an assert)
      this._text = this._text.slice(0, start) + this._text.slice(end, this._text.length)
      // this._text = string_del(this._text, start, end);
      return true
    }

    private deleteStyleRange (start: number, end: number) {
      let N = end - start
      let [ i, prev_len, ] = this.findStyleIndexAndPrevLength(start)
      let s = this._styles[i]
      if (start > prev_len) {
        // we overlap the first style (but not entirely
        const skip = start - prev_len
        // ASSERT(skip < s._length);
        const shrink = Math.min(N, s.length - skip)
        // ASSERT(shrink > 0);
        s.length -= shrink
        N -= shrink
        if (N === 0) {
          return
        }
        i += 1
        // ASSERT(i < this._styles.length);
      }
      while (N > 0) {
        s = this._styles[i]
        if (N >= s.length) {
          N -= s.length
          this._styles.splice(i, 1)
        } else {
          s.length -= N
          break
        }
      }
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
      let run = line.runs[line.runs.length - 1]
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

  protected abstract buildShape (): void;
}
