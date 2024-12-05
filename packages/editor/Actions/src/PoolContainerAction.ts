import { Editor } from '../../Editor'
import { Item, PoolCustomContainer, PoolType } from '../../Items'
import { Action } from './Action'

export class PoolContainerAction extends Action {
  private _poolType: PoolType

  public constructor(editor: Editor, type: string | undefined, poolType: PoolType) {
    super(editor, type)
    this._poolType = poolType
    this.build()
  }

  protected buildItems(): Item[] {
    if (this._poolType) {
      let left = this._poolType.left
      let top = this._poolType.top
      let width = this._poolType.width
      let height = this._poolType.height
      let poolCount = this._poolType.poolCount
      let stageCount = this._poolType.stageCount
      let horizontal = this._poolType.horizontal
      let poolTypeName = this._poolType.name
      const poolCustomContainer = new PoolCustomContainer(
        left,
        top,
        width,
        height,
        poolCount,
        stageCount,
        horizontal,
        this._poolType.poolTextHorizontal,
        this._poolType.stageTextHorizontal,
        poolTypeName,
      )
      return [poolCustomContainer]
    }
    return [new PoolCustomContainer(0, 0, 200, 100)]
  }
}
