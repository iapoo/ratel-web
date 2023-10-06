import { Rectangle, Rotation, } from '@/components/Engine'
import { EntityShape, } from '../../Shapes'
import { EditorItemInfo } from '../../Items';
import { Editor } from '../../Editor';

export interface EditorItem {
  readonly shape: EntityShape;
  boundary: Rectangle;
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
  readonly right: number;
  readonly bottom: number;
  readonly minWidth: number;
  readonly minHeight: number;
  readonly text: string;
  readonly items: EditorItem[]
  readonly category: string;
  readonly type: string;
  readonly rotation: Rotation;
  id: string;
  saveData: () => EditorItemInfo;
  loadData: (data: EditorItemInfo, editor: Editor) => void;
  //clone: () => EditorItem
}
