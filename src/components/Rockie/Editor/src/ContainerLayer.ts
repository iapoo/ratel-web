/* eslint-disable max-params */
import { EditorLayer, } from './EditorLayer'

export class ContainerLayer extends EditorLayer {
  public constructor (left = 0, top = 0, width = 100, height = 100) {
    super(left, top, width, height, false)
    this.hittable = true
  }

  protected buildLayer () {}
}
