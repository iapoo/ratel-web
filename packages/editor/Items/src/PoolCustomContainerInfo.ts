import { StyleInfo } from '../../Shapes'
import { Categories } from './Item'
import { PoolCustomContainers } from './PoolCustomContainer'
import { ShapeInfo } from './ShapeInfo'

/* eslint-disable max-params */
export class PoolCustomContainerInfo extends ShapeInfo {
  public horizontal: boolean
  public poolCount: number
  public stageCount: number
  public poolTextHorizontal: boolean
  public stageTextHorizontal: boolean

  public constructor(
    type = PoolCustomContainers.TYPE_HORIZONTAL_POOL,
    category = Categories.POOL,
    left = 0,
    top = 0,
    width = 100,
    height = 100,
    poolCount = 2,
    stageCount = 2,
    horizontal = true,
    poolTextHorizontal = true,
    stageTextHorizontal = true,
    text = '',
    rotation = 0,
    styles: StyleInfo[] = [],
    useTheme = true,
    strokeColor: string | null = null,
    fillColor: string | null = null,
    lineWidth: number | null = null,
  ) {
    super(type, category, left, top, width, height, text, rotation, styles, useTheme, strokeColor, fillColor, lineWidth)
    this.horizontal = horizontal
    this.poolCount = poolCount
    this.stageCount = stageCount
    this.poolTextHorizontal = poolTextHorizontal
    this.stageTextHorizontal = stageTextHorizontal
  }
}
