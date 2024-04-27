import { Colors, Graphics, MathUtils, ParagraphDirection, Point2, Rectangle, StrokeDashStyle } from '@/components/Engine'
import { EntityShapeType } from '../../../Shapes/src/EntityShape'
import { ConnectorDirection, ConnectorType, CustomShape } from '../../../Shapes'
import { Connector, CustomEntity, ShapeEntity, Shapes } from '../../../Items'
import { Categories, Type } from '../../../Items/src/Item'
import { ShapeOptions, ShapeType } from '@/components/Rockie/Items/src/ShapeEntity'
import { ConnectorArrowTypes } from '@/components/Rockie/Items/src/Connector'
import { Consts, SystemUtils } from '@/components/Workspace/Utils'
import { CustomConnector, CustomConnectorTypeInfo } from '@/components/Rockie/Items/src/CustomConnector'

export class UMLConnectors {
  public static TYPE_INHERITANCE = 'Inheritance'
  public static DESC_INHERITANCE = 'Inheritance'
  public static TEXT_INHERITANCE = 'Inheritance'
  public static TYPE_REALIZATION = 'Realization'
  public static DESC_REALIZATION = 'Realization'
  public static TEXT_REALIZATION = 'Realization'
  public static TYPE_ASSOCIATION = 'Association'
  public static DESC_ASSOCIATION = 'Association'
  public static TEXT_ASSOCIATION = 'Association'
  public static TYPE_DIRECTED_ASSOCIATION = 'Directed Association'
  public static DESC_DIRECTED_ASSOCIATION = 'Directed Association'
  public static TEXT_RDIRECTED_ASSOCIATION = 'Directed Association'
  public static TYPE_AGGREGATION = 'Aggregation'
  public static DESC_AGGREGATION = 'Aggregation'
  public static TEXT_AGGREGATION = 'Aggregation'
  public static TYPE_COMPOSITION = 'Composition'
  public static DESC_COMPOSITION = 'Composition'
  public static TEXT_COMPOSITION = 'Composition'
  public static TYPE_DEPENDENCY = 'Dependency'
  public static DESC_DEPENDENCY = 'Dependency'
  public static TEXT_DEPENDENCY = 'Dependency'
  public static TYPE_ASSOCIATION_USE_CASE = 'Association-Use Case'
  public static DESC_ASSOCIATION_USE_CASE = 'Association-Use Case'
  public static TEXT_ASSOCIATION_USE_CASE = 'Association-Use Case'
  public static TYPE_DEPENDENCY_USE_CASE = 'Dependency-Use Case'
  public static DESC_DEPENDENCY_USE_CASE = 'Dependency-Use Case'
  public static TEXT_DEPENDENCY_USE_CASE = 'Dependency-Use Case'
  public static TYPE_GENERALIZATION = 'Generalization'
  public static DESC_GENERALIZATION = 'Generalization'
  public static TEXT_GENERALIZATION = 'Generalization'
  public static TYPE_INCLUDE = 'Include'
  public static DESC_INCLUDE = 'Include'
  public static TEXT_INCLUDE = 'Include'
  public static TYPE_EXTEND = 'Extend'
  public static DESC_EXTEND = 'Extend'
  public static TEXT_EXTEND = 'Extend'
}

export const UMLConnectorTypeInfos: CustomConnectorTypeInfo[] = [
  { name: UMLConnectors.TYPE_INHERITANCE, description: UMLConnectors.DESC_INHERITANCE, text: UMLConnectors.TEXT_INHERITANCE, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-4', strokeDashStyle: StrokeDashStyle.SOLID, connectorType: ConnectorType.Orthogonal },
  { name: UMLConnectors.TYPE_REALIZATION, description: UMLConnectors.DESC_REALIZATION, text: UMLConnectors.TEXT_REALIZATION, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-4', strokeDashStyle: StrokeDashStyle.DASH, connectorType: ConnectorType.Orthogonal },
  { name: UMLConnectors.TYPE_ASSOCIATION, description: UMLConnectors.DESC_ASSOCIATION, text: UMLConnectors.TEXT_ASSOCIATION, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'None', strokeDashStyle: StrokeDashStyle.SOLID, connectorType: ConnectorType.Orthogonal },
  { name: UMLConnectors.TYPE_DEPENDENCY, description: UMLConnectors.DESC_DEPENDENCY, text: UMLConnectors.TEXT_DEPENDENCY, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-1-2', strokeDashStyle: StrokeDashStyle.DASH, connectorType: ConnectorType.Orthogonal },
  { name: UMLConnectors.TYPE_DIRECTED_ASSOCIATION, description: UMLConnectors.DESC_DIRECTED_ASSOCIATION, text: UMLConnectors.TEXT_RDIRECTED_ASSOCIATION, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-1-2', strokeDashStyle: StrokeDashStyle.SOLID, connectorType: ConnectorType.Orthogonal },
  { name: UMLConnectors.TYPE_COMPOSITION, description: UMLConnectors.DESC_COMPOSITION, text: UMLConnectors.TEXT_COMPOSITION, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'Diamond-1', endArrowTypeName: 'None', strokeDashStyle: StrokeDashStyle.SOLID, connectorType: ConnectorType.Orthogonal },
  { name: UMLConnectors.TYPE_AGGREGATION, description: UMLConnectors.DESC_AGGREGATION, text: UMLConnectors.TEXT_AGGREGATION, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'Diamond-2', endArrowTypeName: 'None', strokeDashStyle: StrokeDashStyle.SOLID, connectorType: ConnectorType.Orthogonal },
  { name: UMLConnectors.TYPE_ASSOCIATION_USE_CASE, description: UMLConnectors.DESC_ASSOCIATION_USE_CASE, text: UMLConnectors.TEXT_ASSOCIATION_USE_CASE, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'None', strokeDashStyle: StrokeDashStyle.SOLID, connectorType: ConnectorType.StraightLine },
  { name: UMLConnectors.TYPE_DEPENDENCY_USE_CASE, description: UMLConnectors.DESC_DEPENDENCY_USE_CASE, text: UMLConnectors.TEXT_DEPENDENCY_USE_CASE, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-1-2', strokeDashStyle: StrokeDashStyle.DASH, connectorType: ConnectorType.StraightLine },
  { name: UMLConnectors.TYPE_GENERALIZATION, description: UMLConnectors.DESC_GENERALIZATION, text: UMLConnectors.TEXT_GENERALIZATION, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-4', strokeDashStyle: StrokeDashStyle.SOLID, connectorType: ConnectorType.StraightLine },
  { name: UMLConnectors.TYPE_INCLUDE, description: UMLConnectors.DESC_INCLUDE, text: UMLConnectors.TEXT_INCLUDE, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-1-2', strokeDashStyle: StrokeDashStyle.DASH, connectorType: ConnectorType.StraightLine },
  { name: UMLConnectors.TYPE_EXTEND, description: UMLConnectors.DESC_EXTEND, text: UMLConnectors.TEXT_EXTEND, 
    startX: 30, startY: 30, endX: 190, endY: 30, startArrowTypeName: 'None', endArrowTypeName: 'Triangle-1-2', strokeDashStyle: StrokeDashStyle.DASH, connectorType: ConnectorType.StraightLine },
]

export class UMLConnector extends CustomConnector {

    public constructor(start: Point2, end: Point2, connectorTypeInfoName: string, connectorTypeInfos: CustomConnectorTypeInfo[] = UMLConnectorTypeInfos) {
      super(start, end, connectorTypeInfoName, connectorTypeInfos)
      this.buildShape()
    }

    private buildShape() {
      const width = Math.abs(this.start.x - this.end.x)
      const height = Math.abs(this.start.y - this.end.y)
      switch(this.connectorTypeInfo.name) {
        case UMLConnectors.TYPE_INCLUDE: {
          const textBox = new ShapeEntity(width / 2 - 50, height / 2 - 25, 100, 30)
          textBox.text = '<<include>>'
          textBox.fillColor = Colors.Transparent
          textBox.strokeColor = Colors.Transparent
          this.addItem(textBox)
          break;
        }
        case UMLConnectors.TYPE_EXTEND: {
          const textBox = new ShapeEntity(width / 2 - 50, height / 2 - 25, 100, 30)
          textBox.text = '<<extend>>'
          textBox.fillColor = Colors.Transparent
          textBox.strokeColor = Colors.Transparent
          this.addItem(textBox)
          break;
        }
      } 
    }

}
