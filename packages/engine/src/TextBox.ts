/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Colors, Font, GlyphRun, Graphics, Paint, Paragraph, ParagraphBuilder, ParagraphStyle, Path, Rectangle, ShapedLine } from './Graphics'
import { Shape } from './Shape'
import { Block, CursorMaker, Style } from './TextUtils'

export class TextBox extends Shape {
  private _text: string
  private _fontPaint: Paint
  private _lines = new Array<ShapedLine>(0)
  private _cursor: CursorMaker = new CursorMaker(Colors.Black, Colors.Blue, 0, 0, 0, 750)
  private _startIndex = 0
  private _endIndex = 0
  private _styles = new Array<Style>(0)
  private _font = new Font()
  private _runs = new Array<GlyphRun>(0)
  private _paragraphBuilder: ParagraphBuilder
  private _paragraphStyle: ParagraphStyle
  private _paragraph: Paragraph
  private _focused = false

  constructor(text = '', left = 0, top = 0, width = 100, height = 100) {
    super(left, top, width, height)
    // this.filled = false
    this._text = ''
    this._fontPaint = new Paint()
    this._fontPaint.setColor(Colors.Blue)
    this.path.addRectangle(Rectangle.makeLTWH(0, 0, width, height))
    this._styles.push(new Style(this._text.length))
    this._paragraphStyle = new ParagraphStyle()
    this._paragraphBuilder = new ParagraphBuilder(this._paragraphStyle)
    this._paragraphBuilder.addText(this._text)
    this._paragraph = this._paragraphBuilder.build()
    this._paragraph.layout(width)

    this.insert(text)
    // const style = new Style(2, EngineUtils.FONT_NAME_SERIF, 36)
    // this.applyStyleToRange(style, 1, 3)
    // this.select(7, 7)
  }

  public get focused() {
    return this._focused
  }

  public set focused(value: boolean) {
    this._focused = value
  }

  public get text(): string {
    return this._text
  }

  public set text(value: string) {
    this.deleteRange(0, this._text.length - 1)
    this.insert(value)
    this._text = value
    this.markDirty()
  }

  // eslint-disable-next-line accessor-pairs
  public set boundary(boundary: Rectangle) {
    super.boundary = boundary
    this.buildLines()
  }

  // eslint-disable-next-line accessor-pairs
  // public set width (width: number) {
  //  this.boundary = Rectangle.makeLTWH(this.boundary.left, this.boundary.top, width, this.boundary.height)
  // }

  // eslint-disable-next-line accessor-pairs
  // public set right (right: number) {
  //  this.boundary = Rectangle.makeLTWH(this.boundary.left, this.boundary.top, right - this.boundary.left, this.boundary.height)
  // }

  public get lines() {
    return this._lines
  }

  public handleBackspace() {}

  public handleReturn() {
    this.insert('\r\n')
  }

  public selectAll() {
    this.select(0, this._text.length - 1)
  }

  public select(start: number, end: number) {
    this._startIndex = Math.min(start, end)
    this._endIndex = Math.max(start, end)
    this.rebuildSelection()
  }

  public enter(x: number, y: number) {
    for (const line of this._lines) {
      if (line.bottom > y) {
        for (const run of line.runs) {
          for (let index = 0; index < run.indices.length - 1; index++) {
            if (x >= run.positions[index * 2] && x <= run.positions[index * 2 + 2]) {
              console.log(`Enter index = ${run.indices[index]}`)
              this.select(run.indices[index], run.indices[index])
              return
            }
          }
        }
        return
      }
    }
  }

  public moveColumns(columnCount: number) {
    if (this._startIndex === this._endIndex) {
      const index = Math.max(Math.min(this._startIndex + columnCount, this._text.length), 0)
      this.select(index, index)
    } else {
      const index = columnCount < 0 ? this._startIndex : this._endIndex
      this.select(index, index)
    }
  }

  public moveRows(rowCount: number) {
    let index = rowCount < 0 ? this._startIndex : this._endIndex
    const i = this.getLinesIndexToLineIndex(index)
    if (rowCount < 0 && i === 0) {
      index = 0
    } else if (rowCount > 0 && i === this._lines.length - 1) {
      index = this._text.length
    } else {
      const x = this.getRunsIndexToX(this._lines[i], index)
      index = this.getRunsXToIndex(this._lines[i + rowCount], x)
    }
    this.select(index, index)
  }

  public deleteSelection() {
    let start = this._startIndex
    if (start === this._endIndex) {
      if (start === 0) {
        return
      }
      this.deleteRange(start - 1, start)
      start -= 1
    } else {
      this.deleteRange(start, this._endIndex)
    }
    this._startIndex = this._endIndex = start
    this.buildLines()
  }

  public insert(text: string) {
    if (!text || text.length <= 0) {
      return
    }
    if (this._startIndex !== this._endIndex) {
      this.deleteSelection()
    }

    // do this before edit the text (we use text.length in an assert)
    const index = this._startIndex
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [i, preLen] = this.findStyleIndexAndPrevLength(index)
    this._styles[i].length += text.length

    // now grow the text
    this._text = this._text.slice(0, index) + text + this._text.slice(index)

    this._startIndex = this._endIndex = index + text.length
    // this.select(this._startIndex, this._endIndex)
    this.buildLines()
    this.rebuildSelection()
  }

  public findStyleIndexAndPrevLength(index: number) {
    let len = 0
    for (let i = 0; i < this._styles.length; ++i) {
      const l = this._styles[i].length
      len += l
      // < favors the latter style if index is between two styles
      if (index < len) {
        return [i, len - l]
      }
    }
    return [this._styles.length - 1, len]
  }

  public applyStyleToRange(style: Style, startIndex: number, endIndex: number) {
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
      if (end === 0) {
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

  public applyStyleToSelection(style: Style) {
    this.applyStyleToRange(style, this._startIndex, this._endIndex)
  }

  public render(graphics: Graphics): void {
    super.render(graphics)
    if (!this._text) {
      return
    }
    if (this._focused) {
      this._cursor.renderBefore(graphics)
    }

    const runs = this._runs
    const styles = this._styles
    const f = this._font
    const p = this._fontPaint

    let s = styles[0]
    let sindex = 0
    let s_start = 0
    let s_end = s.length

    let r = runs[0]
    let rindex = 0

    let start = 0
    let end = 0
    while (start < this._text.length) {
      while (r.textRange.end <= start) {
        r = runs[++rindex]
        if (!r) {
          // ran out of runs, so the remaining text must just be WS
          break
        }
      }
      if (!r) {
        break
      }
      while (s_end <= start) {
        s = styles[++sindex]
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        s_start = s_end
        s_end += s.length
      }
      end = Math.min(r.textRange.end, s_end)

      // LOG('New range: ', start, end,
      //  'from run', r.textRange.start, r.textRange.end,
      //  'style', s_start, s_end)

      // check that we have anything to draw
      if (r.textRange.start >= end) {
        start = end
        continue // could be a span of WS with no glyphs
      }

      //              f.setTypeface(r.typeface); // r.typeface is always null (for now)
      f.fontSize = r.size
      f.embolden = s.bold
      f.skewX = s.italic ? -0.2 : 0
      p.setColor(s.color)

      let gly = r.glyphs
      let pos = r.positions
      if (start > r.textRange.start || end < r.textRange.end) {
        // search for the subset of glyphs to draw
        let glyph_start = 0
        let glyph_end = 0
        for (let i = 0; i < r.offsets.length; ++i) {
          if (r.offsets[i] >= start) {
            glyph_start = i
            break
          }
        }
        for (let i = glyph_start + 1; i < r.offsets.length; ++i) {
          if (r.offsets[i] >= end) {
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
      // @ts-ignore
      graphics.drawGlyphs(gly, pos, 0, 0, f, p)

      if (s.underline) {
        const gap = 2
        const Y = pos[1] // first Y
        const lastX = pos[gly.length * 2]
        // @ts-ignore
        const sects = f.getGlyphIntercepts(gly, pos, Y + 2, Y + 4)

        let x = pos[0]
        for (let i = 0; i < sects.length; i += 2) {
          const end = sects[i] - gap
          if (x < end) {
            graphics.drawRect4f(x, Y + 2, end, Y + 4, p)
          }
          x = sects[i + 1] + gap
        }
        if (x < lastX) {
          graphics.drawRect4f(x, Y + 2, lastX, Y + 4, p)
        }
      }

      start = end
    }

    if (this._focused) {
      this._cursor.renderAfter(graphics)
    }
  }

  public update() {
    super.update()
    if (this.dirty) {
      this.path.reset()
      this.path.addRectangle(Rectangle.makeLTWH(0, 0, this.width, this.height))
    }
  }

  private rebuildSelection() {
    const startIndex = this._startIndex
    const endIndex = this._endIndex
    if (startIndex === endIndex) {
      const line = this.getLinesIndexToLine(startIndex)
      const run = this.getRunsIndexToRun(line, startIndex)
      let x = run.positions[run.positions.length - 2]
      let top = line.top
      for (let i = 0; i < run.indices.length - 1; i++) {
        if (startIndex === run.indices[i]) {
          x = run.positions[i * 2]
          top = line.baseline - run.size
        }
      }
      this._cursor.place(x, top, line.baseline)
    } else {
      const path = this.getLinesIndicesToPath(startIndex, endIndex)
      this._cursor.path = path
    }
  }

  private buildLines() {
    // console.log('hello2')
    const build_sparse = true
    const blocks = new Array<Block>(0)
    let block = null
    for (const s of this._styles) {
      if (build_sparse) {
        if (!block || (block.typefaceName === s.typeFaceName && block.size === s.size)) {
          if (!block) {
            block = new Block(s.typeFaceName, 0, s.size)
          }
          block.length += s.length
        } else {
          blocks.push(block)
          block = new Block(s.typeFaceName, s.length, s.size)
        }
      } else {
        // force a block on every style boundary for now
        blocks.push(new Block(s.typeFaceName, s.length, s.size))
      }
    }
    if (build_sparse && block) {
      blocks.push(block)
    }

    // this._lines = Graphics.shapeText(this._text, blocks, this.width)
    // this.rebuildSelection()

    this._paragraphBuilder.reset()
    let index = 0
    blocks.forEach((block) => {
      this._paragraphBuilder.pushStyle(block.textStyle)
      this._paragraphBuilder.addText(this._text.substring(index, index + block.length))
      index += block.length
    })
    this._paragraph = this._paragraphBuilder.build()
    this._paragraph.layout(this.width)
    this._lines = this._paragraph.getShapedLines()

    // add textRange to each run, to aid in drawing
    this._runs.length = 0
    let startIndex = 0
    for (const l of this._lines) {
      for (const r of l.runs) {
        // offset can't support chinese set and so we replace with indices
        r.indices = []
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-loop-func
        r.offsets.forEach((offset) => {
          r.indices.push(startIndex)
          startIndex++
        })
        startIndex--
        // r.textRange = { start: r.offsets[0], end: r.offsets[r.offsets.length - 1], }
        r.textRange = { start: r.indices[0], end: r.indices[r.indices.length - 1] }
        this._runs.push(r)
      }
    }
    // console.log(22)
  }

  private deleteRange(start: number, end: number) {
    if (start === end) {
      return false
    }

    this.deleteStyleRange(start, end)
    // Do this after shrink styles (we use text.length in an assert)
    this._text = this._text.slice(0, start) + this._text.slice(end, this._text.length)
    // this._text = string_del(this._text, start, end);
  }

  private deleteStyleRange(start: number, end: number) {
    // shrink/remove styles
    //
    // [.....][....][....][.....]  styles
    //    [..................]     start...end
    //
    // - trim the first style
    // - remove the middle styles
    // - trim the last style

    let N = end - start
    let [i, prev_len] = this.findStyleIndexAndPrevLength(start)
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

  private getLinesIndexToLineIndex(index: number) {
    let i = 0
    for (const l of this._lines) {
      // console.log(l)
      if (index <= l.textRange.last) {
        return i
      }
      i += 1
    }
    return this._lines.length - 1
  }

  private getLinesIndexToLine(index: number) {
    const lineIndex = this.getLinesIndexToLineIndex(index)
    return this._lines[lineIndex]
  }

  private getRunsIndexToX(line: ShapedLine, index: number) {
    const run = this.getRunsIndexToRun(line, index)
    for (let i = 0; i < run.indices.length - 1; i++) {
      if (index === run.indices[i]) {
        return run.positions[i * 2]
      }
    }
    return run.positions[run.positions.length - 2]
  }

  private getRunsIndexToRun(line: ShapedLine, index: number) {
    for (const run of line.runs) {
      if (index <= run.indices[run.indices.length - 1]) {
        return run
      }
    }
    return line.runs[line.runs.length - 1]
  }

  private getLinesIndicesToPath(startIndex: number, endIndex: number) {
    if (startIndex === endIndex) {
      return undefined
    }
    const path = new Path()
    const startLine = this.getLinesIndexToLine(startIndex)
    const endLine = this.getLinesIndexToLine(endIndex)
    const startX = this.getRunsIndexToX(startLine, startIndex)
    const endX = this.getRunsIndexToX(endLine, endIndex)
    if (startLine === endLine) {
      path.addRectangle(new Rectangle(startX, startLine.top, endX, startLine.bottom))
    } else {
      path.addRectangle(new Rectangle(startX, startLine.top, this.width, startLine.bottom))
      path.addRectangle(new Rectangle(0, endLine.top, endX, endLine.bottom))
      if (startLine.bottom < endLine.top) {
        path.addRectangle(new Rectangle(0, startLine.bottom, this.width, endLine.top))
      }
    }

    return path
  }

  private getRunsXToIndex(line: ShapedLine, x: number) {
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
}
