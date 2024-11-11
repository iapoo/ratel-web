/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/no-unused-vars */
import { Plugin, ShapeConstants } from '@ratel-web/editor/Items'
import { RenderContext } from '@ratel-web/editor/Shapes'

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
        buildShape: buildShape1,
        config: {
          freeze: ShapeConstants.FREEZE_NONE,
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
    ],
  }
}

const buildShape1 = (renderContext: RenderContext) => {
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
