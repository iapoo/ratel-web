/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/no-unused-vars */
import { Plugin, ShapeEntity } from '@ratel-web/editor/Items'
import { ConnectorConfig, RenderContext, ShapeConfig, TableConfig } from '@ratel-web/editor/Shapes'
import { Colors } from '@ratel-web/engine'

export function loadPlugin(): Plugin {
  return {
    name: 'a',
    description: 'b',
    author: 'c',
    homepage: 'd',
    email: 'e',
    extensions: [
      {
        name: 'star',
        description: 'star',
        icon: '',
        type: 'shape',
        setup: null,
        render: buildShape1,
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
        icon: '',
        type: 'connector',
        setup: buildShape2,
        render: null,
        config: {
          text: 'Text',
          width: 60,
          height: 60,
          startX: 0,
          startY: 30,
          endX: 60,
          endY: 30,
          startArrowTypeName: 'None',
          endArrowTypeName: 'Triangle-4',
          strokeDashStyle: 'solid',
          connectorType: 'curved',
        },
      },
    ],
  }
}

const buildShape1 = (renderContext: RenderContext, config: ShapeConfig | ConnectorConfig | TableConfig) => {
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

const buildShape2 = (config: ShapeConfig | ConnectorConfig | TableConfig) => {
  const width = 60
  const height = 30
  const textBox = new ShapeEntity(width / 2 - 50, height / 2 - 25, 100, 30)
  textBox.text = '<<include>>'
  textBox.fillColor = Colors.Transparent
  textBox.strokeColor = Colors.Transparent
  return [textBox]
}
