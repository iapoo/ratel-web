/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/no-unused-vars */
import { ExtensionCategory, Item, Plugin, ShapeEntity } from '@ratel-web/editor/Items'
import { ConnectorConfig, ExtensionConfig, RenderContext } from '@ratel-web/editor/Shapes'
import { Colors } from '@ratel-web/engine'

export function loadPlugin(): Plugin {
  return {
    name: 'Clipboard',
    description: 'Clipboard',
    author: 'Ivipa',
    homepage: 'https://www.ivipa.com',
    email: 'ivipa-support@ivipa.com',
    categories: 'false' === process.env.PRODUCTION ? [testExtensions] : [],
  }
}

const renderShape = (renderContext: RenderContext, config: ExtensionConfig) => {
  renderContext.path.moveTo(renderContext.width, renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.modifierWidth, renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.modifierWidth, 0)
  renderContext.path.lineTo(0, renderContext.controllerHeight)
  renderContext.path.lineTo(renderContext.modifierWidth, renderContext.height)
  renderContext.path.lineTo(renderContext.modifierWidth, renderContext.height - renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.width, renderContext.height - renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.controllerWidth, renderContext.controllerHeight)
  renderContext.path.lineTo(renderContext.width, renderContext.modifierHeight)
}

const setupConnector = (entity: Item, config: ExtensionConfig) => {
  const connectorConfig = config as ConnectorConfig
  const width = Math.abs(connectorConfig.startX - connectorConfig.endX)
  const height = Math.abs(connectorConfig.endY - connectorConfig.startY)
  const textBox = new ShapeEntity(width / 2 - 50, height / 2 - 15, 100, 30)
  textBox.text = '<<include>>'
  textBox.fillColor = Colors.Transparent
  textBox.strokeColor = Colors.Transparent
  textBox.lineWidth = 0
  entity.addItem(textBox)
}

const setupTable = (entity: Item, config: ExtensionConfig) => {
  ;(entity.items[0] as Item).text = 'Hello world'
}

const setupContainer = (entity: Item, config: ExtensionConfig) => {
  const textBox = new ShapeEntity(30, 30, 100, 30)
  textBox.text = '<<include>>'
  textBox.fillColor = Colors.Transparent
  textBox.strokeColor = Colors.Transparent
  textBox.lineWidth = 0
  entity.addItem(textBox)
}

const renderContainer = (renderContext: RenderContext, config: ExtensionConfig) => {
  renderContext.path.moveTo(renderContext.width, renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.modifierWidth, renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.modifierWidth, 7)
  renderContext.path.lineTo(7, renderContext.controllerHeight)
  renderContext.path.lineTo(renderContext.modifierWidth, renderContext.height)
  renderContext.path.lineTo(renderContext.modifierWidth, renderContext.height - renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.width, renderContext.height - renderContext.modifierHeight)
  renderContext.path.lineTo(renderContext.controllerWidth, renderContext.controllerHeight)
  renderContext.path.lineTo(renderContext.width, renderContext.modifierHeight)
}

const testExtensions: ExtensionCategory = {
  name: 'Network',
  description: 'Network clipboards',
  extensions: [
    {
      name: 'star',
      description: 'star',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="130" height="110" viewbox="0 0 130 110"   shape-rendering="geometricPrecision">
    <path fill="#FFFFFFFF" stroke="#323232FF" stroke-width="2" d="M0 0L0 80L40 100L40 20L0 0L40 20L120 20L80 0L0 0M40 20L40 100L120 100L120 20L40 20Z"/>    
</svg>`,
      iconType: 'svg',
      type: 'shape',
      setup: null,
      render: renderShape,
      config: {
        freeze: 'None',
        text: 'Text',
        left: 0,
        top: 0,
        width: 120,
        height: 70,
        enableMask: false,
        modifiable: true,
        modifierX: 0.3,
        modifierY: 0.6,
        modifierStartX: 0,
        modifierStartY: 0,
        modifierEndX: 1,
        modifierEndY: 0.5,
        modifyInLine: false,
        modifyInPercent: true,
        controllable: true,
        controllerX: 1,
        controllerY: 0,
        controllerStartX: 0.2,
        controllerStartY: 0.5,
        controllerEndX: 1,
        controllerEndY: 0.5,
        controlInLine: true,
        controlInPercent: true,
        adaptable: false,
        adapterX: 0,
        adapterY: 0,
        adapterDirection: 'X',
        adapterSize: 0,
        adapterStartX: 0,
        adapterStartY: 0,
        adapterEndX: 0,
        adapterEndY: 0,
        adaptInLine: true,
        adaptInPercent: true,
      },
    },
    {
      name: 'connector2',
      description: 'connector2',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="130" height="110" viewbox="0 0 130 110"   shape-rendering="geometricPrecision">
    <path fill="#FFFFFFFF" stroke="#323232FF" stroke-width="2" d="M0 0L0 80L40 100L40 20L0 0L40 20L120 20L80 0L0 0M40 20L40 100L120 100L120 20L40 20Z"/>    
</svg>`,
      iconType: 'svg',
      type: 'connector',
      setup: setupConnector,
      render: null,
      config: {
        text: 'Text',
        width: 240,
        height: 100,
        startX: 0,
        startY: 50,
        endX: 240,
        endY: 50,
        startArrowTypeName: 'None',
        endArrowTypeName: 'Triangle-4',
        strokeDashStyle: 'solid',
        connectorType: 'curved',
      },
    },
    {
      name: 'table1',
      description: 'table1',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="130" height="110" viewbox="0 0 130 110"   shape-rendering="geometricPrecision">
    <path fill="#FFFFFFFF" stroke="#323232FF" stroke-width="2" d="M0 0L0 80L40 100L40 20L0 0L40 20L120 20L80 0L0 0M40 20L40 100L120 100L120 20L40 20Z"/>    
</svg>`,
      iconType: 'svg',
      type: 'table',
      setup: setupTable,
      render: null,
      config: {
        freeze: 'None',
        text: 'table',
        left: 0,
        top: 0,
        width: 250,
        height: 160,
        enableMask: false,
        rowCount: 3,
        columnCount: 1,
        fixedFirstRow: true,
        firstRowHeight: 32,
        fixedFirstColumn: false,
        firstColumnWidth: 0,
        modifiable: false,
        modifierX: 0,
        modifierY: 0,
        modifierStartX: 0,
        modifierStartY: 0,
        modifierEndX: 0,
        modifierEndY: 0,
        modifyInLine: false,
        modifyInPercent: true,
        controllable: false,
        controllerX: 0,
        controllerY: 0,
        controllerStartX: 0,
        controllerStartY: 0,
        controllerEndX: 0,
        controllerEndY: 0,
        controlInLine: true,
        controlInPercent: true,
        adaptable: false,
        adapterX: 0,
        adapterY: 0,
        adapterDirection: 'X',
        adapterSize: 0,
        adapterStartX: 0,
        adapterStartY: 0,
        adapterEndX: 0,
        adapterEndY: 0,
        adaptInLine: true,
        adaptInPercent: true,
      },
    },
    {
      name: 'container',
      description: 'container',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="130" height="110" viewbox="0 0 130 110"   shape-rendering="geometricPrecision">
    <path fill="#FFFFFFFF" stroke="#323232FF" stroke-width="2" d="M0 0L0 80L40 100L40 20L0 0L40 20L120 20L80 0L0 0M40 20L40 100L120 100L120 20L40 20Z"/>    
</svg>`,
      iconType: 'svg',
      type: 'container',
      setup: setupContainer,
      render: renderContainer,
      config: {
        freeze: 'None',
        text: 'Text',
        left: 0,
        top: 0,
        width: 120,
        height: 70,
        enableMask: false,
        modifiable: true,
        modifierX: 0.3,
        modifierY: 0.6,
        modifierStartX: 0,
        modifierStartY: 0,
        modifierEndX: 1,
        modifierEndY: 0.5,
        modifyInLine: false,
        modifyInPercent: true,
        controllable: true,
        controllerX: 1,
        controllerY: 0,
        controllerStartX: 0.2,
        controllerStartY: 0.5,
        controllerEndX: 1,
        controllerEndY: 0.5,
        controlInLine: true,
        controlInPercent: true,
        adaptable: false,
        adapterX: 0,
        adapterY: 0,
        adapterDirection: 'X',
        adapterSize: 0,
        adapterStartX: 0,
        adapterStartY: 0,
        adapterEndX: 0,
        adapterEndY: 0,
        adaptInLine: true,
        adaptInPercent: true,
      },
    },
    {
      name: 'image',
      description: 'image',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAB+jdEVYdG14ZmlsZQAlM0NteGZpbGUlMjBob3N0JTNEJTIyYXBwLmRpYWdyYW1zLm5ldCUyMiUyMG1vZGlmaWVkJTNEJTIyMjAyNC0wNy0xOVQxNSUzQTEyJTNBMjcuODMwWiUyMiUyMGFnZW50JTNEJTIyTW96aWxsYSUyRjUuMCUyMChXaW5kb3dzJTIwTlQlMjAxMC4wJTNCJTIwV2luNjQlM0IlMjB4NjQpJTIwQXBwbGVXZWJLaXQlMkY1MzcuMzYlMjAoS0hUTUwlMkMlMjBsaWtlJTIwR2Vja28pJTIwQ2hyb21lJTJGMTI2LjAuMC4wJTIwU2FmYXJpJTJGNTM3LjM2JTIyJTIwZXRhZyUzRCUyMmxiUGRZM0ppbERLSjBEQXZfWnBIJTIyJTIwdmVyc2lvbiUzRCUyMjI0LjcuMSUyMiUyMHNjYWxlJTNEJTIyMC4xMiUyMiUyMGJvcmRlciUzRCUyMjAlMjIlM0UlMEElMjAlMjAlM0NkaWFncmFtJTIwbmFtZSUzRCUyMkNvcHklMjBvZiUyMFBhZ2UtMSUyMiUyMGlkJTNEJTIyQjZYVmx5RFNjVklZOGlSeloySkYlMjIlM0UlMEElMjAlMjAlMjAlMjAlM0NteEdyYXBoTW9kZWwlMjBkeCUzRCUyMjMwMjAlMjIlMjBkeSUzRCUyMjE2ODglMjIlMjBncmlkJTNEJTIyMSUyMiUyMGdyaWRTaXplJTNEJTIyMTAlMjIlMjBndWlkZXMlM0QlMjIxJTIyJTIwdG9vbHRpcHMlM0QlMjIxJTIyJTIwY29ubmVjdCUzRCUyMjElMjIlMjBhcnJvd3MlM0QlMjIxJTIyJTIwZm9sZCUzRCUyMjElMjIlMjBwYWdlJTNEJTIyMSUyMiUyMHBhZ2VTY2FsZSUzRCUyMjElMjIlMjBwYWdlV2lkdGglM0QlMjIxMDI0JTIyJTIwcGFnZUhlaWdodCUzRCUyMjEwMjQlMjIlMjBiYWNrZ3JvdW5kJTNEJTIybm9uZSUyMiUyMG1hdGglM0QlMjIwJTIyJTIwc2hhZG93JTNEJTIyMCUyMiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUzQ3Jvb3QlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteENlbGwlMjBpZCUzRCUyMk1lLVBBRFBmOU5LTTVac1ZlV2JYLTAlMjIlMjAlMkYlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteENlbGwlMjBpZCUzRCUyMk1lLVBBRFBmOU5LTTVac1ZlV2JYLTElMjIlMjBwYXJlbnQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0wJTIyJTIwJTJGJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhDZWxsJTIwaWQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0zJTIyJTIwdmFsdWUlM0QlMjIlMjIlMjBzdHlsZSUzRCUyMnJvdW5kZWQlM0QxJTNCd2hpdGVTcGFjZSUzRHdyYXAlM0JodG1sJTNEMSUzQmFyY1NpemUlM0QxOSUzQmdyYWRpZW50Q29sb3IlM0QlMjNCNzg3NDclM0JncmFkaWVudERpcmVjdGlvbiUzRHdlc3QlM0JmaWxsQ29sb3IlM0QlMjNGOEVEOUUlM0JzdHJva2VDb2xvciUzRG5vbmUlM0Jtb3ZhYmxlJTNEMSUzQnJlc2l6YWJsZSUzRDElM0Jyb3RhdGFibGUlM0QxJTNCZGVsZXRhYmxlJTNEMSUzQmVkaXRhYmxlJTNEMSUzQmxvY2tlZCUzRDAlM0Jjb25uZWN0YWJsZSUzRDElM0IlMjIlMjB2ZXJ0ZXglM0QlMjIxJTIyJTIwcGFyZW50JTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtMSUyMiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214R2VvbWV0cnklMjB3aWR0aCUzRCUyMjEwMjAlMjIlMjBoZWlnaHQlM0QlMjIxMDIwJTIyJTIwYXMlM0QlMjJnZW9tZXRyeSUyMiUyMCUyRiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQyUyRm14Q2VsbCUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214Q2VsbCUyMGlkJTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtNCUyMiUyMHZhbHVlJTNEJTIyJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNEMCUzQmh0bWwlM0QxJTNCamV0dHlTaXplJTNEYXV0byUzQm9ydGhvZ29uYWxMb29wJTNEMSUzQmZvbnRTaXplJTNEMTElM0JlbmRBcnJvdyUzRGJsb2NrJTNCZW5kRmlsbCUzRDAlM0JlbmRTaXplJTNEOCUzQnN0cm9rZVdpZHRoJTNENDglM0JzaGFkb3clM0QwJTNCbGFiZWxCYWNrZ3JvdW5kQ29sb3IlM0Rub25lJTNCZWRnZVN0eWxlJTNEb3J0aG9nb25hbEVkZ2VTdHlsZSUzQnN0cm9rZUNvbG9yJTNEJTIzMzE0MzU0JTNCZmlsbENvbG9yJTNEJTIzNjQ3Njg3JTNCJTIyJTIwZWRnZSUzRCUyMjElMjIlMjBwYXJlbnQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0xJTIyJTIwc291cmNlJTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtNSUyMiUyMHRhcmdldCUzRCUyMk1lLVBBRFBmOU5LTTVac1ZlV2JYLTclMjIlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteEdlb21ldHJ5JTIwcmVsYXRpdmUlM0QlMjIxJTIyJTIwYXMlM0QlMjJnZW9tZXRyeSUyMiUyMCUyRiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQyUyRm14Q2VsbCUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214Q2VsbCUyMGlkJTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtNSUyMiUyMHZhbHVlJTNEJTIyJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNEMSUzQndoaXRlU3BhY2UlM0R3cmFwJTNCaHRtbCUzRDElM0Jmb250U2l6ZSUzRDEyJTNCZ2xhc3MlM0QwJTNCc3Ryb2tlV2lkdGglM0Q0OCUzQnNoYWRvdyUzRDAlM0JzdHJva2VDb2xvciUzRCUyMzMxNDM1NCUzQmZpbGxDb2xvciUzRCUyMzMxNDM1NCUzQmZvbnRDb2xvciUzRCUyM2ZmZmZmZiUzQiUyMiUyMHZlcnRleCUzRCUyMjElMjIlMjBwYXJlbnQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0xJTIyJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhHZW9tZXRyeSUyMHglM0QlMjIxNDAlMjIlMjB5JTNEJTIyMTAwJTIyJTIwd2lkdGglM0QlMjIyNDAlMjIlMjBoZWlnaHQlM0QlMjIxMjAlMjIlMjBhcyUzRCUyMmdlb21ldHJ5JTIyJTIwJTJGJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDJTJGbXhDZWxsJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhDZWxsJTIwaWQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC02JTIyJTIwdmFsdWUlM0QlMjIlMjIlMjBzdHlsZSUzRCUyMmVkZ2VTdHlsZSUzRG9ydGhvZ29uYWxFZGdlU3R5bGUlM0Jyb3VuZGVkJTNEMCUzQmh0bWwlM0QxJTNCamV0dHlTaXplJTNEYXV0byUzQm9ydGhvZ29uYWxMb29wJTNEMSUzQmZvbnRTaXplJTNEMTElM0JlbmRBcnJvdyUzRGJsb2NrJTNCZW5kRmlsbCUzRDAlM0JlbmRTaXplJTNEOCUzQnN0cm9rZVdpZHRoJTNENDglM0JzaGFkb3clM0QwJTNCbGFiZWxCYWNrZ3JvdW5kQ29sb3IlM0Rub25lJTNCc3Ryb2tlQ29sb3IlM0QlMjMzMTQzNTQlM0JmaWxsQ29sb3IlM0QlMjM2NDc2ODclM0IlMjIlMjBlZGdlJTNEJTIyMSUyMiUyMHBhcmVudCUzRCUyMk1lLVBBRFBmOU5LTTVac1ZlV2JYLTElMjIlMjBzb3VyY2UlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC03JTIyJTIwdGFyZ2V0JTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtOCUyMiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214R2VvbWV0cnklMjB5JTNEJTIyMTAlMjIlMjByZWxhdGl2ZSUzRCUyMjElMjIlMjBhcyUzRCUyMmdlb21ldHJ5JTIyJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhQb2ludCUyMGFzJTNEJTIyb2Zmc2V0JTIyJTIwJTJGJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDJTJGbXhHZW9tZXRyeSUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQyUyRm14Q2VsbCUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214Q2VsbCUyMGlkJTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtNyUyMiUyMHZhbHVlJTNEJTIyJTIyJTIwc3R5bGUlM0QlMjJyaG9tYnVzJTNCd2hpdGVTcGFjZSUzRHdyYXAlM0JodG1sJTNEMSUzQnNoYWRvdyUzRDAlM0Jmb250RmFtaWx5JTNESGVsdmV0aWNhJTNCZm9udFNpemUlM0QxMiUzQmFsaWduJTNEY2VudGVyJTNCc3Ryb2tlV2lkdGglM0Q0OCUzQnNwYWNpbmclM0Q2JTNCc3BhY2luZ1RvcCUzRC00JTNCc3Ryb2tlQ29sb3IlM0QlMjMzMTQzNTQlM0JmaWxsQ29sb3IlM0QlMjMzMTQzNTQlM0Jmb250Q29sb3IlM0QlMjNmZmZmZmYlM0IlMjIlMjB2ZXJ0ZXglM0QlMjIxJTIyJTIwcGFyZW50JTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtMSUyMiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214R2VvbWV0cnklMjB4JTNEJTIyMTMwJTIyJTIweSUzRCUyMjQzMCUyMiUyMHdpZHRoJTNEJTIyMjYwJTIyJTIwaGVpZ2h0JTNEJTIyMTI3LjUlMjIlMjBhcyUzRCUyMmdlb21ldHJ5JTIyJTIwJTJGJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDJTJGbXhDZWxsJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhDZWxsJTIwaWQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0xMCUyMiUyMHZhbHVlJTNEJTIyJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNEMSUzQndoaXRlU3BhY2UlM0R3cmFwJTNCaHRtbCUzRDElM0Jmb250U2l6ZSUzRDEyJTNCZ2xhc3MlM0QwJTNCc3Ryb2tlV2lkdGglM0Q0OCUzQnNoYWRvdyUzRDAlM0JzdHJva2VDb2xvciUzRCUyM0IyMDAwMCUzQmZpbGxDb2xvciUzRCUyM2IyMDAwMCUzQmFyY1NpemUlM0Q1MCUzQmZvbnRDb2xvciUzRCUyM2ZmZmZmZiUzQiUyMiUyMHZlcnRleCUzRCUyMjElMjIlMjBwYXJlbnQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0xJTIyJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhHZW9tZXRyeSUyMHglM0QlMjI3MzAlMjIlMjB5JTNEJTIyNzcwJTIyJTIwd2lkdGglM0QlMjIxMjAlMjIlMjBoZWlnaHQlM0QlMjIxMjAlMjIlMjBhcyUzRCUyMmdlb21ldHJ5JTIyJTIwJTJGJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDJTJGbXhDZWxsJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhDZWxsJTIwaWQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0xMSUyMiUyMHZhbHVlJTNEJTIyJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNEMCUzQmh0bWwlM0QxJTNCamV0dHlTaXplJTNEYXV0byUzQm9ydGhvZ29uYWxMb29wJTNEMSUzQmZvbnRTaXplJTNEMTElM0JlbmRBcnJvdyUzRGJsb2NrJTNCZW5kRmlsbCUzRDAlM0JlbmRTaXplJTNEOCUzQnN0cm9rZVdpZHRoJTNENDglM0JzaGFkb3clM0QwJTNCbGFiZWxCYWNrZ3JvdW5kQ29sb3IlM0Rub25lJTNCZWRnZVN0eWxlJTNEb3J0aG9nb25hbEVkZ2VTdHlsZSUzQnN0cm9rZUNvbG9yJTNEJTIzQjIwMDAwJTNCZW50cnlYJTNEMC41JTNCZW50cnlZJTNEMCUzQmVudHJ5RHglM0QwJTNCZW50cnlEeSUzRDAlM0JleGl0WCUzRDAuNSUzQmV4aXRZJTNEMSUzQmV4aXREeCUzRDAlM0JleGl0RHklM0QwJTNCZmlsbENvbG9yJTNEJTIzZTUxNDAwJTNCJTIyJTIwZWRnZSUzRCUyMjElMjIlMjBwYXJlbnQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0xJTIyJTIwc291cmNlJTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtOCUyMiUyMHRhcmdldCUzRCUyMk1lLVBBRFBmOU5LTTVac1ZlV2JYLTEwJTIyJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhHZW9tZXRyeSUyMHJlbGF0aXZlJTNEJTIyMSUyMiUyMGFzJTNEJTIyZ2VvbWV0cnklMjIlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteFBvaW50JTIweCUzRCUyMjM4MCUyMiUyMHklM0QlMjIyOTAlMjIlMjBhcyUzRCUyMnNvdXJjZVBvaW50JTIyJTIwJTJGJTNFJTBBJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTIwJTNDbXhQb2ludCUyMHglM0QlMjIzODAlMjIlMjB5JTNEJTIyNDE0JTIyJTIwYXMlM0QlMjJ0YXJnZXRQb2ludCUyMiUyMCUyRiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQyUyRm14R2VvbWV0cnklM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0MlMkZteENlbGwlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteENlbGwlMjBpZCUzRCUyMkZKbEo1MUswZDFSZTNUM2h4anEwLTAlMjIlMjB2YWx1ZSUzRCUyMiUyMiUyMHN0eWxlJTNEJTIycm91bmRlZCUzRDElM0J3aGl0ZVNwYWNlJTNEd3JhcCUzQmh0bWwlM0QxJTNCZm9udFNpemUlM0QxMiUzQmdsYXNzJTNEMCUzQnN0cm9rZVdpZHRoJTNENDglM0JzaGFkb3clM0QwJTNCc3Ryb2tlQ29sb3IlM0QlMjMzMTQzNTQlM0JmaWxsQ29sb3IlM0QlMjMzMTQzNTQlM0JhcmNTaXplJTNENTAlM0Jmb250Q29sb3IlM0QlMjNmZmZmZmYlM0IlMjIlMjB2ZXJ0ZXglM0QlMjIxJTIyJTIwcGFyZW50JTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtMSUyMiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214R2VvbWV0cnklMjB4JTNEJTIyMjAwJTIyJTIweSUzRCUyMjc3NiUyMiUyMHdpZHRoJTNEJTIyMTIwJTIyJTIwaGVpZ2h0JTNEJTIyMTE0JTIyJTIwYXMlM0QlMjJnZW9tZXRyeSUyMiUyMCUyRiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQyUyRm14Q2VsbCUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214Q2VsbCUyMGlkJTNEJTIyRkpsSjUxSzBkMVJlM1QzaHhqcTAtMSUyMiUyMHZhbHVlJTNEJTIyJTIyJTIwc3R5bGUlM0QlMjJyb3VuZGVkJTNEMCUzQmh0bWwlM0QxJTNCamV0dHlTaXplJTNEYXV0byUzQm9ydGhvZ29uYWxMb29wJTNEMSUzQmZvbnRTaXplJTNEMTElM0JlbmRBcnJvdyUzRGJsb2NrJTNCZW5kRmlsbCUzRDAlM0JlbmRTaXplJTNEOCUzQnN0cm9rZVdpZHRoJTNENDglM0JzaGFkb3clM0QwJTNCbGFiZWxCYWNrZ3JvdW5kQ29sb3IlM0Rub25lJTNCZWRnZVN0eWxlJTNEb3J0aG9nb25hbEVkZ2VTdHlsZSUzQnN0cm9rZUNvbG9yJTNEJTIzMzE0MzU0JTNCZW50cnlYJTNEMC41JTNCZW50cnlZJTNEMCUzQmVudHJ5RHglM0QwJTNCZW50cnlEeSUzRDAlM0JleGl0WCUzRDAuNSUzQmV4aXRZJTNEMSUzQmV4aXREeCUzRDAlM0JleGl0RHklM0QwJTNCZmlsbENvbG9yJTNEJTIzNjQ3Njg3JTNCJTIyJTIwZWRnZSUzRCUyMjElMjIlMjBwYXJlbnQlM0QlMjJNZS1QQURQZjlOS001WnNWZVdiWC0xJTIyJTIwdGFyZ2V0JTNEJTIyRkpsSjUxSzBkMVJlM1QzaHhqcTAtMCUyMiUyMHNvdXJjZSUzRCUyMk1lLVBBRFBmOU5LTTVac1ZlV2JYLTclMjIlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteEdlb21ldHJ5JTIwcmVsYXRpdmUlM0QlMjIxJTIyJTIwYXMlM0QlMjJnZW9tZXRyeSUyMiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214UG9pbnQlMjB4JTNEJTIyMjYwJTIyJTIweSUzRCUyMjU4MCUyMiUyMGFzJTNEJTIyc291cmNlUG9pbnQlMjIlMjAlMkYlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteFBvaW50JTIweCUzRCUyMi0xMjAlMjIlMjB5JTNEJTIyNDQwJTIyJTIwYXMlM0QlMjJ0YXJnZXRQb2ludCUyMiUyMCUyRiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQyUyRm14R2VvbWV0cnklM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0MlMkZteENlbGwlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NteENlbGwlMjBpZCUzRCUyMk1lLVBBRFBmOU5LTTVac1ZlV2JYLTglMjIlMjB2YWx1ZSUzRCUyMiUyMiUyMHN0eWxlJTNEJTIycm91bmRlZCUzRDElM0J3aGl0ZVNwYWNlJTNEd3JhcCUzQmh0bWwlM0QxJTNCZm9udFNpemUlM0QxMiUzQmdsYXNzJTNEMCUzQnN0cm9rZVdpZHRoJTNENDglM0JzaGFkb3clM0QwJTNCc3Ryb2tlQ29sb3IlM0QlMjMzMTQzNTQlM0JmaWxsQ29sb3IlM0QlMjMzMTQzNTQlM0Jmb250Q29sb3IlM0QlMjNmZmZmZmYlM0IlMjIlMjB2ZXJ0ZXglM0QlMjIxJTIyJTIwcGFyZW50JTNEJTIyTWUtUEFEUGY5TktNNVpzVmVXYlgtMSUyMiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ214R2VvbWV0cnklMjB4JTNEJTIyNjcwJTIyJTIweSUzRCUyMjQzMS44OCUyMiUyMHdpZHRoJTNEJTIyMjQwJTIyJTIwaGVpZ2h0JTNEJTIyMTIzLjc1JTIyJTIwYXMlM0QlMjJnZW9tZXRyeSUyMiUyMCUyRiUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQyUyRm14Q2VsbCUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUzQyUy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',
      iconType: 'image',
      type: 'image',
      setup: null,
      render: null,
      config: {
        width: 160,
        height: 120,
      },
    },
    {
      name: 'svg',
      description: 'svg',
      icon: `<svg t="1732011959878" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4056" width="200" height="200"><path d="M983.038771 262.208952h-188.927764c17.407978-26.495967 27.647965-57.919928 27.647966-91.519885C821.758973 76.609184 742.527072 0.00128 645.119194 0.00128 592.12726 0.00128 544.38332 22.785252 511.99936 58.625207A179.071776 179.071776 0 0 0 378.879526 0.00128C281.471648 0.00128 202.239747 76.545184 202.239747 170.689067c0 33.599958 10.111987 65.023919 27.647966 91.519885H40.959949a40.25595 40.25595 0 0 0-40.959949 39.551951V549.120594c0 5.439993 4.607994 9.855988 10.239987 9.855987h51.199936v425.471468c0 21.887973 18.303977 39.551951 40.959949 39.551951h819.198976c22.655972 0 40.959949-17.663978 40.959949-39.551951V558.976581h51.199936c5.631993 0 10.239987-4.479994 10.239987-9.855987V301.760903a40.25595 40.25595 0 0 0-40.959949-39.551951z m-427.519465-91.519885c0-47.74394 40.19195-86.591892 89.599888-86.591892 49.407938 0 89.599888 38.847951 89.599888 86.591892s-40.19195 86.527892-89.599888 86.527891h-89.599888V170.689067zM378.879526 84.097175c49.407938 0 89.599888 38.847951 89.599888 86.591892v86.527891h-89.599888c-49.407938 0-89.599888-38.783952-89.599888-86.527891 0-47.74394 40.19195-86.591892 89.599888-86.591892zM87.039891 474.880686V346.240847h381.439523v128.639839H87.039891z m61.439923 84.095895h319.9996v380.927524h-319.9996V558.976581z m727.039092 380.927524h-319.9996V558.976581h319.9996v380.927524z m61.439923-465.023419H555.519306V346.240847h381.439523v128.639839z" fill="#262626" p-id="4057"></path></svg>`,
      iconType: 'svg',
      type: 'svg',
      setup: null,
      render: null,
      config: {
        width: 160,
        height: 120,
      },
    },
  ],
}
