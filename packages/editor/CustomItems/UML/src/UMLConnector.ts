import { Point2, StrokeDashStyle } from '@ratel-web/engine'
import { CustomConnector, CustomConnectorTypeInfo, ShapeEntity } from '../../../Items'
import { ConnectorDirection, ConnectorType } from '../../../Shapes'

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
  public static TEXT_DIRECTED_ASSOCIATION = 'Directed Association'
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
  public static TYPE_MESSAGE = 'Message'
  public static DESC_MESSAGE = 'Message'
  public static TEXT_MESSAGE = 'Message'
  public static TYPE_ASYNCHRONIZED_MESSAGE = 'Asynchronized Message'
  public static DESC_ASYNCHRONIZED_MESSAGE = 'Asynchronized Message'
  public static TEXT_ASYNCHRONIZED_MESSAGE = 'Asynchronized Message'
  public static TYPE_SELF_MESSAGE = 'Self Message'
  public static DESC_SELF_MESSAGE = 'Self Message'
  public static TEXT_SELF_MESSAGE = 'Self Message'
  public static TYPE_RETURN_MESSAGE = 'Return Message'
  public static DESC_RETURN_MESSAGE = 'Return Message'
  public static TEXT_RETURN_MESSAGE = 'Return Message'
  public static TYPE_CONTROL_STREAM = 'Control Stream'
  public static DESC_CONTROL_STREAM = 'Control Stream'
  public static TEXT_CONTROL_STREAM = 'Control Stream'
  public static TYPE_CONTROL_STREAM_2 = 'Control Stream 2'
  public static DESC_CONTROL_STREAM_2 = 'Control Stream 2'
  public static TEXT_CONTROL_STREAM_2 = 'Control Stream 2'
}

//Assume left =  0, top = 0, width = 160, height = 160
export const UMLConnectorTypeInfos: CustomConnectorTypeInfo[] = [
  {
    name: UMLConnectors.TYPE_INHERITANCE,
    description: UMLConnectors.DESC_INHERITANCE,
    text: UMLConnectors.TEXT_INHERITANCE,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-4',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_REALIZATION,
    description: UMLConnectors.DESC_REALIZATION,
    text: UMLConnectors.TEXT_REALIZATION,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-4',
    strokeDashStyle: StrokeDashStyle.DASH,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_ASSOCIATION,
    description: UMLConnectors.DESC_ASSOCIATION,
    text: UMLConnectors.TEXT_ASSOCIATION,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'None',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_DEPENDENCY,
    description: UMLConnectors.DESC_DEPENDENCY,
    text: UMLConnectors.TEXT_DEPENDENCY,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.DASH,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_DIRECTED_ASSOCIATION,
    description: UMLConnectors.DESC_DIRECTED_ASSOCIATION,
    text: UMLConnectors.TEXT_DIRECTED_ASSOCIATION,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_COMPOSITION,
    description: UMLConnectors.DESC_COMPOSITION,
    text: UMLConnectors.TEXT_COMPOSITION,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'Diamond-1',
    endArrowTypeName: 'None',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_AGGREGATION,
    description: UMLConnectors.DESC_AGGREGATION,
    text: UMLConnectors.TEXT_AGGREGATION,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'Diamond-2',
    endArrowTypeName: 'None',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_ASSOCIATION_USE_CASE,
    description: UMLConnectors.DESC_ASSOCIATION_USE_CASE,
    text: UMLConnectors.TEXT_ASSOCIATION_USE_CASE,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'None',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_DEPENDENCY_USE_CASE,
    description: UMLConnectors.DESC_DEPENDENCY_USE_CASE,
    text: UMLConnectors.TEXT_DEPENDENCY_USE_CASE,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.DASH,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_GENERALIZATION,
    description: UMLConnectors.DESC_GENERALIZATION,
    text: UMLConnectors.TEXT_GENERALIZATION,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-4',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_INCLUDE,
    description: UMLConnectors.DESC_INCLUDE,
    text: UMLConnectors.TEXT_INCLUDE,
    width: 90,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 90,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.DASH,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_EXTEND,
    description: UMLConnectors.DESC_EXTEND,
    text: UMLConnectors.TEXT_EXTEND,
    width: 90,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 90,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.DASH,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_MESSAGE,
    description: UMLConnectors.DESC_MESSAGE,
    text: UMLConnectors.TEXT_MESSAGE,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_ASYNCHRONIZED_MESSAGE,
    description: UMLConnectors.DESC_ASYNCHRONIZED_MESSAGE,
    text: UMLConnectors.TEXT_ASYNCHRONIZED_MESSAGE,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_SELF_MESSAGE,
    description: UMLConnectors.DESC_SELF_MESSAGE,
    text: UMLConnectors.TEXT_SELF_MESSAGE,
    width: 60,
    height: 60,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 150,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.Orthogonal,
  },
  {
    name: UMLConnectors.TYPE_RETURN_MESSAGE,
    description: UMLConnectors.DESC_RETURN_MESSAGE,
    text: UMLConnectors.TEXT_RETURN_MESSAGE,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'Triangle-1-2',
    endArrowTypeName: 'None',
    strokeDashStyle: StrokeDashStyle.DASH,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_CONTROL_STREAM,
    description: UMLConnectors.DESC_CONTROL_STREAM,
    text: UMLConnectors.TEXT_CONTROL_STREAM,
    width: 60,
    height: 60,
    startX: 0,
    startY: 30,
    endX: 60,
    endY: 30,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.StraightLine,
  },
  {
    name: UMLConnectors.TYPE_CONTROL_STREAM_2,
    description: UMLConnectors.DESC_CONTROL_STREAM_2,
    text: UMLConnectors.TEXT_CONTROL_STREAM_2,
    width: 60,
    height: 60,
    startX: 0,
    startY: 0,
    endX: 50,
    endY: 50,
    startArrowTypeName: 'None',
    endArrowTypeName: 'Triangle-1-2',
    strokeDashStyle: StrokeDashStyle.SOLID,
    connectorType: ConnectorType.Orthogonal,
  },
]

export class UMLConnector extends CustomConnector {
  public constructor(start: Point2, end: Point2, connectorTypeInfoName: string, connectorTypeInfos: CustomConnectorTypeInfo[] = UMLConnectorTypeInfos) {
    super(start, end, connectorTypeInfoName, connectorTypeInfos)
    this.buildShape()
  }

  private buildShape() {
    const width = Math.abs(this.start.x - this.end.x)
    const height = Math.abs(this.start.y - this.end.y)
    switch (this.connectorTypeInfo.name) {
      case UMLConnectors.TYPE_INCLUDE: {
        const textBox = new ShapeEntity(width / 2 - 50, height / 2 - 25, 100, 30)
        textBox.text = '<<include>>'
        textBox.stroked = false
        textBox.filled = false
        this.addItem(textBox)
        break
      }
      case UMLConnectors.TYPE_EXTEND: {
        const textBox = new ShapeEntity(width / 2 - 50, height / 2 - 25, 100, 30)
        textBox.text = '<<extend>>'
        textBox.stroked = false
        textBox.filled = false
        this.addItem(textBox)
        break
      }
      case UMLConnectors.TYPE_SELF_MESSAGE: {
        this.startDirection = ConnectorDirection.Right
        this.endDirection = ConnectorDirection.Right
        this.orthogonalPoints = [new Point2(0, 0), new Point2(12, 0), new Point2(40, 0), new Point2(40, 40), new Point2(12, 40), new Point2(0, 40)]
        break
      }
    }
  }
}
