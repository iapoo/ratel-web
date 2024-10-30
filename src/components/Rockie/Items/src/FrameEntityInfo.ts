import { StyleInfo } from "../../Shapes/src/EntityUtils"
import { Containers } from "./ContainerEntity"
import { Categories } from "./Item"
import { ShapeInfo } from "./ShapeInfo"

/* eslint-disable max-params */
export class FrameEntityInfo extends ShapeInfo {

  public constructor(type = Containers.TYPE_CONTAINER, category = Categories.CONTAINER, left = 0, top = 0, width = 100, height = 100, text = ''
    , rotation = 0, styles: StyleInfo[] = [], useTheme = true, strokeColor: string | null = null
    , fillColor: string | null = null, lineWidth: number | null = null) {
    super(type, category, left, top, width, height, text, rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
  }
}
