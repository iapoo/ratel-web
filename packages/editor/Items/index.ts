import type { ConnectorArrowType } from './src/Connector'
import type { CustomConnectorTypeInfo } from './src/CustomConnector'
import type { CustomEntityTypeInfo } from './src/CustomEntity'
import type { CustomTableType } from './src/CustomTableEntity'
import { EditorItem as IEditorItem } from './src/EditorItem'
import type { Plugin } from './src/EntityExtensions'
import type { Type } from './src/Item'
import type { ShapeOptions, ShapeType } from './src/ShapeEntity'

export { ConnectorArrowType, CustomConnectorTypeInfo, CustomEntityTypeInfo, CustomTableType, Plugin, ShapeOptions, ShapeType, Type }

export enum MyShapeType {
  SELECTION = 0,
  SVG = 1,
  IMAGE = 2,
}

export interface MyShape {
  icon: string
  id: string
  name: string
  image: string
  info: string
  type: MyShapeType
  width: number
  height: number
}

export { CellEntity } from './src/CellEntity'
export { Connector, ConnectorArrowTypes } from './src/Connector'
export { ConnectorArrowInfo } from './src/ConnectorArrowInfo'
export { ConnectorInfo } from './src/ConnectorInfo'
export { ContainerEntity, Containers, ContainerTypes } from './src/ContainerEntity'
export { ContainerInfo } from './src/ContainerInfo'
export { CustomConnector } from './src/CustomConnector'
export { CustomConnectorInfo } from './src/CustomConnectorInfo'
export { CustomContainerEntity } from './src/CustomContainerEntity'
export { CustomEntity } from './src/CustomEntity'
export { CustomShapeInfo } from './src/CustomShapeInfo'
export { CustomTableEntity } from './src/CustomTableEntity'
export { CustomTableInfo } from './src/CustomTableInfo'
export { EditorItemInfo } from './src/EditorItemInfo'
export { Entity } from './src/Entity'
export { ExtendedConnector, ExtendedContainer, ExtendedEntity, ExtendedImageContainer, ExtendedSvgContainer, ExtendedTable } from './src/EntityExtensions'
export { FrameEntity } from './src/FrameEntity'
export { FrameEntityInfo } from './src/FrameEntityInfo'
export { GroupEntity } from './src/GroupEntity'
export { ImageContainer } from './src/ImageContainer'
export { ImageContainerInfo } from './src/ImageContainerInfo'
export { Categories, Item } from './src/Item'
export { LineEntity, LineType } from './src/LineEntity'
export { LineInfo } from './src/LineInfo'
export { PoolEntity } from './src/PoolEntity'
export { ShapeConstants, ShapeEntity, ShapeTypes } from './src/ShapeEntity'
export { ShapeInfo } from './src/ShapeInfo'
export { SvgContainer } from './src/SvgContainer'
export { SvgContainerInfo } from './src/SvgContainerInfo'
export { TableEntity, TableTypes } from './src/TableEntity'
export { TableInfo } from './src/TableInfo'
export type EditorItem = IEditorItem
