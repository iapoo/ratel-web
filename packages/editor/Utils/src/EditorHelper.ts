import { Font, Matrix, Paint, Path, Point2, Rectangle, StrokeDashStyle, Woff2Utils } from '@ratel-web/engine'
import opentype from 'opentype.js'
import { Editor } from '../../Editor'
import { Categories, Connector, ConnectorInfo, EditorItem, EditorItemInfo, Entity, Item } from '../../Items'
import { Operation, OperationHelper, OperationType } from '../../Operations'
import { ConnectorArrowDisplayType, ConnectorMode, ConnectorType } from '../../Shapes'
import { CommonUtils } from './CommonUtils'
import { ImageUtils } from './ImageUtils'

export class EditorHelper {
  public static DEFAULT_OFFSET_X = 32
  public static DEFAULT_OFFSET_Y = 32

  public static generateEditorItems(editor: Editor): EditorItemInfo[] {
    const editorItemInfos: Array<EditorItemInfo> = []
    const editorItems = editor.contentLayer.getAllEditorItems()
    editorItems.forEach((editorItem) => {
      let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      editorItemInfos.push(editorItemInfo)
    })
    return editorItemInfos
  }

  public static generateEditorSelections(editor: Editor): EditorItemInfo[] {
    const selections: Array<EditorItemInfo> = []
    const editorItems = editor.selectionLayer.getAllEditorItems()
    editorItems.forEach((editorItem) => {
      let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
      selections.push(editorItemInfo)
    })
    return selections
  }

  public static exportEditorSelections(editor: Editor): string {
    const selections: Array<EditorItemInfo> = EditorHelper.generateEditorSelections(editor)
    let json = JSON.stringify(selections)
    return json
  }

  public static validateSelections(data: string) {
    let selections: EditorItemInfo[]
    let validation = false
    try {
      selections = JSON.parse(data)
      if (selections instanceof Array) {
        selections.forEach((selection) => {
          if (selection.category && selection.id && selection.items instanceof Array) {
            validation = true
          } else {
            validation = false
          }
        })
      }
    } catch (error) {
      validation = false
    }

    return validation
  }

  public static readSelections(data: string) {
    let selections: EditorItemInfo[] = []
    if (EditorHelper.validateSelections(data)) {
      selections = JSON.parse(data)
    }
    return selections
  }

  public static pasteSelections(selections: EditorItemInfo[], editor: Editor, pasteFromSystem: boolean, pasteLocation: Point2) {
    if (selections.length > 0) {
      let offsetX = EditorHelper.DEFAULT_OFFSET_X
      let offsetY = EditorHelper.DEFAULT_OFFSET_Y
      if (!pasteFromSystem) {
        offsetX = pasteLocation.x - selections[0].left - editor.horizontalSpace
        offsetY = pasteLocation.y - selections[0].top - editor.verticalSpace
      }
      //refresh connections of shapes & Setup new location
      let editorItems: Array<EditorItem> = []
      selections.forEach((selection) => {
        let editorItem = OperationHelper.loadItem(selection, editor)
        if (editorItem instanceof Connector && editorItem.start && editorItem.end) {
          const start = editorItem.start
          const end = editorItem.end
          editorItem.start = new Point2(start.x + offsetX, start.y + offsetY)
          editorItem.end = new Point2(end.x + offsetX, end.y + offsetY)
        } else if (editorItem instanceof Item) {
          editorItem.boundary = Rectangle.makeLTWH(editorItem.left + offsetX, editorItem.top + offsetY, editorItem.width, editorItem.height)
        }
        editorItems.push(editorItem)
      })
      //regenerate item id & load
      selections.forEach((selection) => {
        EditorHelper.refreshSelections(selection, editorItems)
      })
      //regenerate item id & load
      //Make them selected
      editor.selectionLayer.removeAllEditorItems()
      editorItems.forEach((editorItem) => {
        EditorHelper.refreshEditorItem(editorItem)
        editor.contentLayer.addEditorItem(editorItem)
        editor.selectionLayer.addEditorItem(editorItem)
      })
      const newEditorItems = EditorHelper.generateEditorSelections(editor)
      const operation = new Operation(editor, OperationType.ADD_SELECTION_ITEMS, newEditorItems, true)
      editor.operationService.addOperation(operation)
      editor.triggerOperationChange()
    }
  }

  public static deleteSelections(editor: Editor) {
    const editorItems = editor.selectionLayer.getAllEditorItems()
    let deleteChildItem: boolean = false
    let parentItem: Item | undefined = undefined
    for (let i = 0; i < editorItems.length; i++) {
      const editorItem = editorItems[i]
      const item = editorItem as Item
      if (item.parent) {
        deleteChildItem = true
        parentItem = item.parent
      }
    }
    if (deleteChildItem && parentItem) {
      const origEditItemInfo = OperationHelper.saveEditorItem(parentItem)
      for (let i = 0; i < editorItems.length; i++) {
        const editorItem = editorItems[i]
        parentItem.removeItem(editorItem)
      }
      const editorItemInfo = OperationHelper.saveEditorItem(parentItem)
      editor.selectionLayer.removeAllEditorItems()
      const operation = new Operation(editor, OperationType.UPDATE_ITEMS, [editorItemInfo], true, [origEditItemInfo])
      editor.operationService.addOperation(operation)
      editor.triggerOperationChange()
    } else {
      const selections = EditorHelper.generateEditorSelections(editor)
      for (let i = 0; i < editorItems.length; i++) {
        const editorItem = editorItems[i]
        editor.contentLayer.removeEditorItem(editorItem)
      }
      EditorHelper.exportEditorSelections(editor)
      editor.selectionLayer.removeAllEditorItems()
      const operation = new Operation(editor, OperationType.REMOVE_SELECTION_ITEMS, selections, true)
      editor.operationService.addOperation(operation)
      editor.triggerOperationChange()
    }
  }

  public static refreshSelections(selection: EditorItemInfo, editorItems: EditorItem[]) {
    if (selection.category === Categories.CONNECTOR || selection.category === Categories.CUSTOM_CONNECTOR) {
      let connectorInfo = selection as ConnectorInfo
      let connector: Connector | null = null
      editorItems.forEach((editorItem) => {
        if (connectorInfo.id === editorItem.id) {
          connector = editorItem as Connector
          EditorHelper.refreshConnector(connectorInfo, connector, editorItems)
        }
      })
    }
    selection.items.forEach((item) => {
      EditorHelper.refreshSelections(item, editorItems)
    })
  }

  private static refreshConnector(connectorInfo: ConnectorInfo, connector: Connector, editorItems: EditorItem[]) {
    editorItems.forEach((editorItem) => {
      if (connectorInfo.source === editorItem.id) {
        let entity = editorItem as Entity
        connector.source = entity
        entity.addSourceConnector(connector)
      }
      if (connectorInfo.target === editorItem.id) {
        let entity = editorItem as Entity
        connector.target = entity
        entity.addTargetConnector(connector)
      }
      if (editorItem.items.length > 0) {
        EditorHelper.refreshConnector(connectorInfo, connector, editorItem.items)
      }
    })
    //Need to restore points here
    connector.startDirection = CommonUtils.parseConnectorDirection(connectorInfo.startDirection)
    connector.endDirection = CommonUtils.parseConnectorDirection(connectorInfo.endDirection)
    connector.orthogonalPoints = CommonUtils.parsePointsString(connectorInfo.orthogonalPoints)
  }

  private static refreshEditorItem(editorItem: EditorItem) {
    editorItem.id = CommonUtils.generateID()
    editorItem.items.forEach((childItem) => {
      EditorHelper.refreshEditorItem(childItem)
    })
  }

  public static exportSelected(
    editor: Editor,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    format: 'png' | 'jpg' = 'png',
    forIcon: boolean = false,
    encoded: boolean = true,
  ): any {
    try {
      const left = editor.horizontalSpace
      const top = editor.verticalSpace
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const right = editor.workWidth + editor.horizontalSpace
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const bottom = editor.workHeight + editor.verticalSpace
      const [selectionLeft, selectionTop, selectionRight, selectionBottom] = editor.getSelectionBoundary()
      const width = selectionRight - selectionLeft
      const height = selectionBottom - selectionTop
      const iconWidth = 32
      const iconHeight = 32
      const fontSizeFactor = 1
      const lineWidthFactor = width / iconWidth > height / iconHeight ? width / iconWidth : height / iconHeight
      const sizeFactor = width > 300 || height > 300 ? 0.5 : width > 200 || height > 200 ? 0.75 : 1
      const selections: Array<EditorItemInfo> = []
      const allEditorItems = editor.selectionLayer.getAllEditorItems()
      const editorItems: Array<EditorItem> = []
      editor.exportLayer.removeAllEditorItems()
      allEditorItems.forEach((editorItem) => {
        let editorItemInfo = OperationHelper.saveEditorItem(editorItem)
        selections.push(editorItemInfo)
      })
      selections.forEach((selection) => {
        let editorItem = OperationHelper.loadItem(selection, editor)
        if (editorItem instanceof Connector && editorItem.start && editorItem.end) {
          const start = editorItem.start
          const end = editorItem.end
          editorItem.start = new Point2(start.x, start.y)
          editorItem.end = new Point2(end.x, end.y)
        } else if (editorItem instanceof Item) {
          editorItem.boundary = Rectangle.makeLTWH(editorItem.left, editorItem.top, editorItem.width, editorItem.height)
        }
        if (forIcon) {
          editorItem.lineWidth = sizeFactor * editorItem.lineWidth * lineWidthFactor
          editorItem.fontSize = editorItem.fontSize * fontSizeFactor
          editorItem.items.forEach((item) => {
            item.lineWidth = sizeFactor * item.lineWidth * lineWidthFactor
            item.fontSize = item.fontSize * fontSizeFactor
          })
        }
        editorItems.push(editorItem)
      })
      editorItems.forEach((editorItem) => {
        editor.exportLayer.addEditorItem(editorItem)
      })
      editor.backgroundLayer.visible = false
      editor.selectionLayer.visible = false
      editor.contentLayer.visible = false
      editor.render()
      const image = editor.engine.surface.makeImageSnapshot([
        left + selectionLeft - 10,
        top + selectionTop - 10,
        left + selectionRight + 10,
        top + selectionBottom + 10,
      ])
      const data = image.encodeToBytes()
      image.delete()
      let base64Data = ''
      if (data && encoded) {
        base64Data = ImageUtils.convertUint8ArrayToBase64(data)
        return base64Data
      } else {
        return data
      }
    } finally {
      editor.backgroundLayer.visible = true
      editor.selectionLayer.visible = true
      editor.contentLayer.visible = true
      editor.exportLayer.removeAllEditorItems()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static export(editor: Editor, format: 'png' | 'jpg' = 'png'): any {
    try {
      editor.backgroundLayer.visible = false
      editor.selectionLayer.visible = false
      editor.render()
      const image = editor.engine.surface.makeImageSnapshot([
        editor.horizontalSpace,
        editor.verticalSpace,
        editor.workWidth + editor.horizontalSpace,
        editor.workHeight + editor.verticalSpace,
      ])
      const data = image.encodeToBytes()
      image.delete()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let encoded = ''
      if (data) {
        //encoded = Buffer.from(data).toString('base64');
      }
      return data
    } finally {
      editor.backgroundLayer.visible = true
      editor.selectionLayer.visible = true
    }
  }

  public static async exportToSVG(editor: Editor) {
    const result = await EditorHelper.generateEditorSVG(editor, false)
    return result
  }

  public static async exportSelectedToSVG(editor: Editor) {
    const result = await EditorHelper.generateEditorSVG(editor, true)
    return result
  }

  private static async generateEditorSVG(editor: Editor, onlySelected: boolean) {
    let content = ''
    const layer = onlySelected ? editor.selectionLayer : editor.contentLayer
    const [left, top, right, bottom] = editor.getSelectionBoundary()
    for (let i = 0; i < layer.getEditorItemCount(); i++) {
      const editorItem = layer.getEditorItem(i)
      content += await EditorHelper.generateEditorItemSVG(editorItem as Item, 0, left, top)
    }
    const backgroundColorSVG = CommonUtils.generateColorString(editor.backgroundColor)
    const backgroundSVG = editor.showBackground ? `style="background-color:${backgroundColorSVG}"` : ''
    const result =
      `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" ` +
      ` width="${right - left}" height="${bottom - top}" viewbox="0 0 ${right - left} ${bottom - top}"  ${backgroundSVG} shape-rendering="geometricPrecision">` +
      `${content}` +
      `\n</svg>`
    return result
  }

  private static async generateEditorItemSVG(item: Item, depth: number, left: number, top: number) {
    const itemSVG = await EditorHelper.generateSVGItem(item, depth, left, top)
    let itemsSVG = ''
    let indent = ''
    for (let i = 0; i < depth; i++) {
      indent += '    '
    }
    if (item.items.length > 0) {
      itemsSVG += `\n${indent}    <g>`
      for (let i = 0; i < item.items.length; i++) {
        const child = item.items[i]
        itemsSVG += await EditorHelper.generateEditorItemSVG(child as Item, depth + 2, left, top)
      }
      itemsSVG += `\n${indent}    </g>`
    }
    const result = itemSVG + itemsSVG + `\n${indent}</g>`
    return result
  }

  private static async generateSVGItem(item: Item, depth: number, lef: number, top: number) {
    const transformSVG = EditorHelper.generateSVGTransform(item, depth <= 0, lef, top)
    let indent = ''
    for (let i = 0; i < depth; i++) {
      indent += '    '
    }
    if (item instanceof Connector) {
      const connectorArrowPathSVG = EditorHelper.generateSVGConnectorArrow(item, indent + '    ')
      const textSVG = await EditorHelper.generateSVGText(item, indent)
      return `\n${indent}<g ${transformSVG}>${connectorArrowPathSVG}${textSVG}`
    } else {
      const pathSvg = EditorHelper.generateSVGPath(item.shape.path)
      const strokeSVG = EditorHelper.generateSVGPaint(item.shape.stroke, true, item.shape.stroked)
      const fillSVG = EditorHelper.generateSVGPaint(item.shape.fill, false, item.shape.filled)
      const disableSecond = item.shape.secondPath.isEmpty()
      const disableThird = item.shape.thirdPath.isEmpty()
      const disableFourth = item.shape.fourthPath.isEmpty()
      const secondPathSvg = disableSecond ? '' : EditorHelper.generateSVGPath(item.shape.secondPath)
      const secondStrokeSVG = disableSecond ? '' : EditorHelper.generateSVGPaint(item.shape.secondStroke, true, item.shape.secondStroked)
      const secondFillSVG = disableSecond ? '' : EditorHelper.generateSVGPaint(item.shape.secondFill, false, item.shape.secondFilled)
      const thirdPathSvg = disableThird ? '' : EditorHelper.generateSVGPath(item.shape.thirdPath)
      const thirdStrokeSVG = disableThird ? '' : EditorHelper.generateSVGPaint(item.shape.thirdStroke, true, item.shape.thirdStroked)
      const thirdFillSVG = disableThird ? '' : EditorHelper.generateSVGPaint(item.shape.thirdFill, false, item.shape.thirdFilled)
      const fourthPathSvg = disableFourth ? '' : EditorHelper.generateSVGPath(item.shape.fourthPath)
      const fourthStrokeSVG = disableFourth ? '' : EditorHelper.generateSVGPaint(item.shape.fourthStroke, true, item.shape.fourthStroked)
      const fourthFillSVG = disableFourth ? '' : EditorHelper.generateSVGPaint(item.shape.fourthFill, false, item.shape.fourthFilled)
      const secondSVG = disableSecond ? '' : `\n${indent}    <path ${secondFillSVG} ${secondStrokeSVG} ${secondPathSvg}/>`
      const thirdSVG = disableThird ? '' : `\n${indent}    <path ${thirdFillSVG} ${thirdStrokeSVG} ${thirdPathSvg}/>`
      const fourthSVG = disableFourth ? '' : `\n${indent}    <path ${fourthFillSVG} ${fourthStrokeSVG} ${fourthPathSvg}/>`
      const textSVG = await EditorHelper.generateSVGText(item, indent + '    ')

      return `\n${indent}<g ${transformSVG}>\n${indent}    <path ${fillSVG} ${strokeSVG} ${pathSvg}/> ${secondSVG} ${thirdSVG} ${fourthSVG} ${textSVG}`
    }
  }

  private static async generateSVGText(item: Item, indent: string) {
    const shape = item.shape
    const matrix = shape.getParagraphMatrix()
    const transform = EditorHelper.generateSVGTextTransform(matrix)
    const textIndent = indent + '    '
    const runs = shape.runs
    const styles = shape.styles
    const fontPaint = shape.fontPaint

    if (item.text.trim().length === 0) {
      return ''
    }
    let textSVG = `\n${indent}<g ${transform}>`
    let style = styles[0]
    let styleIndex = 0
    let styleStart = 0
    let styleEnd = style.length

    let run = runs[0]
    let runIndex = 0

    let start = 0
    let end = 0
    while (start < shape.text.length) {
      if (!run) {
        // just R&L in text
        break
      }
      while (run.textRange.end <= start) {
        run = runs[++runIndex]
        if (!run) {
          // space
          break
        }
      }
      if (!run) {
        //space
        break
      }
      while (styleEnd <= start) {
        style = styles[++styleIndex]
        if (!style) {
          break
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        styleStart = styleEnd
        styleEnd += style.length
      }
      end = Math.min(run.textRange.end, styleEnd)

      // check that we have anything to draw
      if (run.textRange.start >= end) {
        start = end
        continue // could be a span of WS with no glyphs
      }

      const font = style.font
      font.skewX = style.italic ? -0.2 : 0
      fontPaint.setColor(style.color)

      let gly = run.glyphs
      let pos = run.positions
      let textStart = run.textRange.start
      let textEnd = run.textRange.end
      let offsetX = pos[0]
      let offsetY = pos[1]
      //TODO: it may happend when run with & without italic
      if (start > run.textRange.start || end < run.textRange.end) {
        // search for the subset of glyphs to draw
        let glyph_start = 0
        let glyph_end = 0
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
        textEnd = textStart + glyph_end
        textStart = textStart + glyph_start
        offsetX = pos[glyph_start * 2]
        offsetY = pos[glyph_start * 2 + 1]
        gly = gly.slice(glyph_start, glyph_end)
        // +2 at the end so we can see the trailing position (esp. for underlines)
        pos = pos.slice(glyph_start * 2, glyph_end * 2 + 2)
      } else {
        // LOG('    use entire glyph run')
      }
      // canvas.drawGlyphs(gly, pos, 0, 0, f, p)
      let startX = shape.getTextPaddingX()
      let startY = shape.getTextPaddingY()
      //graphics.
      //const glyphFont = new Font(run.typefaceName, run.size)
      //graphics.drawGlyphs(gly, pos, startX, startY, font, fontPaint)
      const textSVGData = await EditorHelper.generateSVGTextPath(
        shape.text.substring(textStart, textEnd),
        startX + offsetX,
        startY + offsetY,
        font,
        fontPaint,
        style.italic,
        style.bold,
      )
      textSVG += '\n' + textIndent + textSVGData
      if (style.underline) {
        const gap = 2
        const Y = pos[1] // first Y
        const lastX = pos[gly.length * 2]
        // @ts-ignore
        const sects = font.getGlyphIntercepts(gly, pos, Y + 2, Y + 4)
        const underlineColor = CommonUtils.generateColorString(fontPaint.getColor())

        let x = pos[0]
        for (let i = 0; i < sects.length; i += 2) {
          const end = sects[i] - gap
          if (x < end) {
            //graphics.drawRect4f(x + startX, Y + 2 + startY, end + startX, Y + 4 + startY, fontPaint)
            textSVG += `\n${textIndent}<rect x="${x + startX}" y="${Y + 2 + startY}" width="${end - x}" height="${2}" fill="${underlineColor}" />`
          }
          x = sects[i + 1] + gap
        }
        if (x < lastX) {
          //graphics.drawRect4f(x + startX, Y + 2 + startY, lastX + startX, Y + 4 + startY, fontPaint)
          textSVG += `\n${textIndent}<rect x="${x + startX}" y="${Y + 2 + startY}" width="${lastX - x}" height="${2}" fill="${underlineColor}" />`
        }
      }

      start = end
    }
    textSVG += `\n${indent}</g>`
    return textSVG
  }

  private static generateSVGTextTransform(matrix: Matrix) {
    return `transform="matrix(${matrix.source[0].toFixed(2)}, ${matrix.source[3].toFixed(2)}, ${matrix.source[1].toFixed(2)}, ${matrix.source[4].toFixed(2)}, ${matrix.source[2].toFixed(2)}, ${matrix.source[5].toFixed(2)})"`
  }

  private static async generateSVGTextPath(text: string, startX: number, startY: number, font: Font, fontPaint: Paint, isItalic: boolean, isBold: boolean) {
    const ttfdata = await Woff2Utils.decompress(font.fontName)
    //const arrayBuffer = ttfdata.buffer.slice(ttfdata.byteOffset, ttfdata.byteLength + ttfdata.byteOffset)
    const ttfFont = opentype.parse(ttfdata)
    // console.log(`Font info = ${ttfFont}`)
    //opentype can't handle some characters and we need to exclude them here
    // @ts-ignore
    const newText = text.replaceAll('\n', '')
    const textPath = ttfFont.getPath(newText, startX, startY, font.fontSize)
    const textSVGData = textPath.toPathData(2)
    //const textSVG = EditorHelper.generateSVGPath()
    const fontColor = CommonUtils.generateColorString(fontPaint.getColor())
    //TODO: Need to redesign this.
    const offset = Math.tan((7 / 180) * Math.PI) * startY
    const italicData = isItalic ? `transform="translate(${offset.toFixed(1)}), skewX(-7)"` : ''
    const strokeWidth = isBold ? (font.fontSize < 20 ? 0.5 : (font.fontSize / 24) * 0.5 + 0.5) : 0.1
    const textSVG = `<path fill="${fontColor}" stroke="${fontColor}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${strokeWidth}"  ${italicData} d="${textSVGData}"/>`

    return textSVG
  }

  private static generateSVGConnectorArrow(connector: Connector, indent: string) {
    const connectorShape = connector.connectorShape
    const pathSvg = EditorHelper.generateSVGPath(connectorShape.path)
    const strokeSVG = EditorHelper.generateSVGPaint(connectorShape.stroke, true, connectorShape.stroked)
    const fillSVG = EditorHelper.generateSVGPaint(connectorShape.fill, false, connectorShape.filled)
    const startArrowPathSVG = EditorHelper.generateSVGPath(connectorShape.startArrowPath)
    const endArrowPathSVG = EditorHelper.generateSVGPath(connectorShape.endArrowPath)
    const connectorDoubleLinePathSVG = EditorHelper.generateSVGPath(connectorShape.connectorDoubleLinePath)
    const arrowStrokeSVG = EditorHelper.generateSVGPaint(connectorShape.arrowStroke, false, true)
    const arrowFillSVG = EditorHelper.generateSVGPaint(connectorShape.arrowFill, false, true)
    const arrowOutlineSVG = EditorHelper.generateSVGPaint(connectorShape.arrowOutline, true, true)
    const connectorDoubleLineStrokeSVG = EditorHelper.generateSVGPaint(connectorShape.connectorDoubleLineStroke, true, true)
    const connectorDoubleLineFillSVG = EditorHelper.generateSVGPaint(connectorShape.connectorDoubleLineFill, true, true)
    const connectorDoubleLinePaintSVG = EditorHelper.generateSVGPaint(connectorShape.connectorDoubleLinePaint, true, true)
    let result = ''
    switch (connector.connectorType) {
      case ConnectorType.Curve:
        switch (connector.connectorMode) {
          case ConnectorMode.Double:
            result += `\n${indent}<path fill="none" ${connectorDoubleLineStrokeSVG} ${pathSvg}/>`
            result += `\n${indent}<path fill="none" ${connectorDoubleLineFillSVG} ${pathSvg}/>`
            break
          case ConnectorMode.DoubleAndStartArrow:
          case ConnectorMode.DoubleAndEndArrow:
          case ConnectorMode.DoubleAndBothArrows:
          case ConnectorMode.Single:
          default:
            result += `\n${indent}<path fill="none" ${strokeSVG} ${pathSvg}/>`
            break
        }
        break
      case ConnectorType.Orthogonal:
        switch (connector.connectorMode) {
          case ConnectorMode.DoubleAndStartArrow:
          case ConnectorMode.DoubleAndEndArrow:
          case ConnectorMode.DoubleAndBothArrows:
            result += `\n${indent}<path fill="none" ${connectorDoubleLinePaintSVG} ${connectorDoubleLinePathSVG}/>`
            break
          case ConnectorMode.Double:
            result += `\n${indent}<path fill="none" ${connectorDoubleLineStrokeSVG} ${pathSvg}/>`
            result += `\n${indent}<path fill="none" ${connectorDoubleLineFillSVG} ${pathSvg}/>`
            break
          case ConnectorMode.Single:
          default:
            result += `\n${indent}<path fill="none" ${strokeSVG} ${pathSvg}/>`
            break
        }
        break
      case ConnectorType.StraightLine:
      default:
        result += `\n${indent}<path fill="none" ${strokeSVG} ${pathSvg}/>`
        break
    }
    result += `\n${indent}<path ${fillSVG} ${strokeSVG} ${pathSvg}/>`
    if (connector.connectorMode === ConnectorMode.Single) {
      if (connector.startArrow.type !== ConnectorArrowDisplayType.None) {
        if (connector.startArrow.close) {
          if (connector.startArrow.outline) {
            result += `\n${indent}<path ${arrowFillSVG} ${startArrowPathSVG}/>`
          } else {
            result += `\n${indent}<path ${arrowStrokeSVG} ${startArrowPathSVG}/>`
          }
        }
        result += `\n${indent}<path fill="none" ${arrowOutlineSVG} ${startArrowPathSVG}/>`
      }
      if (connector.endArrow.type !== ConnectorArrowDisplayType.None) {
        if (connector.endArrow.close) {
          if (connector.endArrow.outline) {
            result += `\n${indent}<path ${arrowFillSVG} ${endArrowPathSVG}/>`
          } else {
            result += `\n${indent}<path ${arrowStrokeSVG} ${endArrowPathSVG}/>`
          }
        }
        result += `\n${indent}<path fill="none" ${arrowOutlineSVG} ${endArrowPathSVG}/>`
      }
    }
    return result
  }

  private static generateSVGTransform(item: Item, useOffset: boolean, left: number, top: number) {
    const translate = `translate(${item.shape.position.x - (useOffset ? left : 0)}, ${item.shape.position.y - (useOffset ? top : 0)})`
    const rotate =
      item.shape.rotation.px === 0 && item.shape.rotation.py === 0 && item.shape.rotation.radius === 0
        ? ''
        : `rotate(${(item.shape.rotation.radius * 180) / Math.PI}, ${item.shape.rotation.px}, ${item.shape.rotation.py})`
    const result = `transform="${translate} ${rotate}"`
    return result
  }

  private static generateSVGPath(path: Path) {
    const result = `d="${path.toSVGString()}"`
    return result
  }

  private static generateSVGPaint(paint: Paint, isStroke: boolean, isEnabled: boolean) {
    let color = 'none'
    if (isEnabled) {
      color = CommonUtils.generateColorString(paint.getColor())
    }
    if (isStroke) {
      let dashSVG = ''
      switch (paint.getStrokeDashStyle()) {
        case StrokeDashStyle.DASH:
          dashSVG = `stroke-dasharray="10, 2"`
          break
        case StrokeDashStyle.DASH_DOT:
          dashSVG = `stroke-dasharray="10, 2, 2, 2"`
          break
        case StrokeDashStyle.DASH_DOT_DOT:
          dashSVG = `stroke-dasharray="10, 2, 2, 2, 2, 2"`
          break
        case StrokeDashStyle.DOT:
          dashSVG = `stroke-dasharray="2, 2"`
          break
        case StrokeDashStyle.SOLID:
        default:
          break
      }
      const strokeWidth = paint.getStrokeWidth()
      const result = `stroke="${color}" stroke-width="${strokeWidth}" ${dashSVG}`
      return result
    } else {
      const result = `fill="${color}"`
      return result
    }
  }
}
