import { UMLConnector, UMLConnectorTypeInfos,} from './src/UMLConnector'
import { UMLContainerShape, UMLContainerTypes } from './src/UMLContainerShape'
import { UMLGridShape, UMLGridShapeTypes, } from './src/UMLGridShape'
import { UMLBasicShape, UMLBasicShapeTypes, UMLBasicShapes } from './src/UMLShape'

export  {UMLGridShapeTypes, UMLGridShape} from './src/UMLGridShape'


export const UMLGridShapes = [
    {name: UMLGridShapeTypes[0].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[0] },
    {name: UMLGridShapeTypes[1].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[1] },
    {name: UMLGridShapeTypes[2].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[2] },
    {name: UMLGridShapeTypes[3].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[3] },
    {name: UMLGridShapeTypes[4].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[4] },
    {name: UMLGridShapeTypes[5].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[5] },
    {name: UMLGridShapeTypes[6].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[6] },
    {name: UMLGridShapeTypes[7].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[7] },
    {name: UMLGridShapeTypes[8].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[8] },
    {name: UMLGridShapeTypes[9].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[9] },
    {name: UMLGridShapeTypes[10].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[10] },
    {name: UMLGridShapeTypes[11].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[11] },
]

export const UMLContainerShapes = [
    {name: UMLContainerTypes[0].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[0] },
]

export const UMLShapes = [
    {name: UMLBasicShapeTypes[0].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[0] },
]

export const UMLConnectors = [
    {name: UMLConnectorTypeInfos[0].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[0] },
    {name: UMLConnectorTypeInfos[1].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[1] },
    {name: UMLConnectorTypeInfos[2].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[2] },
    {name: UMLConnectorTypeInfos[3].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[3] },
    {name: UMLConnectorTypeInfos[4].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[4] },
    {name: UMLConnectorTypeInfos[5].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[5] },
    {name: UMLConnectorTypeInfos[6].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[6] },
]