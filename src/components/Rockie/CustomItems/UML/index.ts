import { UMLConnector, UMLConnectorTypeInfos,} from './src/UMLConnector'
import { UMLContainerShape, UMLContainerTypes } from './src/UMLContainerShape'
import { UMLCustomShape, UMLCustomShapeTypes } from './src/UMLCustomShape'
import { UMLFrameShape, UMLFrameShapeTypes } from './src/UMLFrameShape'
import { UMLGridShape, UMLGridShapeTypes, } from './src/UMLGridShape'
import { UMLBasicShape, UMLBasicShapeTypes, UMLBasicShapes } from './src/UMLShape'

export  {UMLGridShapeTypes, UMLGridShape} from './src/UMLGridShape'


export const UMLGridShapes = [
    //Class
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
    {name: UMLGridShapeTypes[12].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[12] },
    {name: UMLGridShapeTypes[13].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[13] },
]

export const UMLContainerShapes = [
    //Class
    {name: UMLContainerTypes[0].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[0] },
    //Use Case
    {name: UMLContainerTypes[1].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[1] },
]

export const UMLShapes = [
    //Use case
    {name: UMLBasicShapeTypes[0].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[0] },
    //Use case & Class & all others: Note
    {name: UMLBasicShapeTypes[1].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[1] },
    //Use Case
    {name: UMLBasicShapeTypes[2].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[2] },
    //Activity
    {name: UMLBasicShapeTypes[3].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[3] },
    {name: UMLBasicShapeTypes[4].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[4] },
    {name: UMLBasicShapeTypes[5].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[5] },
]

export const UMLConnectors = [
    // Class
    {name: UMLConnectorTypeInfos[0].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[0] },
    {name: UMLConnectorTypeInfos[1].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[1] },
    {name: UMLConnectorTypeInfos[2].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[2] },
    {name: UMLConnectorTypeInfos[3].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[3] },
    {name: UMLConnectorTypeInfos[4].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[4] },
    {name: UMLConnectorTypeInfos[5].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[5] },
    {name: UMLConnectorTypeInfos[6].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[6] },

    // Use case
    {name: UMLConnectorTypeInfos[7].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[7] },
    {name: UMLConnectorTypeInfos[8].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[8] },
    {name: UMLConnectorTypeInfos[9].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[9] },
    {name: UMLConnectorTypeInfos[10].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[10] },
    {name: UMLConnectorTypeInfos[11].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[11] },

    // Sequence
    {name: UMLConnectorTypeInfos[12].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[12] },
    {name: UMLConnectorTypeInfos[13].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[13] },
    {name: UMLConnectorTypeInfos[14].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[14] },
    {name: UMLConnectorTypeInfos[15].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[15] },

    // Activity
    {name: UMLConnectorTypeInfos[16].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[16] },
    {name: UMLConnectorTypeInfos[17].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[17] },
]

export const UMLCustomShapes = [
    // Sequence
    {name: UMLCustomShapeTypes[0].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[0] },
    {name: UMLCustomShapeTypes[1].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[1] },
    {name: UMLCustomShapeTypes[2].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[2] },
    // Activity
    {name: UMLCustomShapeTypes[3].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[3] },
]

export const UMLFrameShapes = [
    // Sequence
    {name: UMLFrameShapeTypes[0].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[0] },
    {name: UMLFrameShapeTypes[1].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[1] },
    {name: UMLFrameShapeTypes[2].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[2] },
    {name: UMLFrameShapeTypes[3].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[3] },
    {name: UMLFrameShapeTypes[4].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[4] },
]

export const UMLGridShapesForClass = [
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
    {name: UMLGridShapeTypes[12].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[12] },
    {name: UMLGridShapeTypes[13].name, type: UMLGridShape, typeInfo:  UMLGridShapeTypes[13] },
]

export const UMLBasicShapesForClass = [
    {name: UMLBasicShapeTypes[1].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[1] },
]

export const UMLContainerShapesForClass = [
    {name: UMLContainerTypes[0].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[0] },
]

export const UMLConnectorsForClass = [
    {name: UMLConnectorTypeInfos[0].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[0] },
    {name: UMLConnectorTypeInfos[1].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[1] },
    {name: UMLConnectorTypeInfos[2].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[2] },
    {name: UMLConnectorTypeInfos[3].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[3] },
    {name: UMLConnectorTypeInfos[4].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[4] },
    {name: UMLConnectorTypeInfos[5].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[5] },
    {name: UMLConnectorTypeInfos[6].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[6] },
]

export const UMLGridShapesForUseCase = [
]

export const UMLBasicShapesForUseCase = [
    {name: UMLBasicShapeTypes[0].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[0] },
    {name: UMLBasicShapeTypes[1].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[1] },
    {name: UMLBasicShapeTypes[2].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[2] },
]

export const UMLContainerShapesForUseCase = [
    {name: UMLContainerTypes[1].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[1] },
]

export const UMLConnectorsForUseCase = [
    {name: UMLConnectorTypeInfos[7].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[7] },
    {name: UMLConnectorTypeInfos[8].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[8] },
    {name: UMLConnectorTypeInfos[9].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[9] },
    {name: UMLConnectorTypeInfos[10].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[10] },
    {name: UMLConnectorTypeInfos[11].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[11] },
]

export const UMLCustomShapesForSequence = [
    {name: UMLCustomShapeTypes[0].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[0] },
    {name: UMLCustomShapeTypes[1].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[1] },
    {name: UMLCustomShapeTypes[2].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[2] },
]

export const UMLFrameShapesForSequence = [
    {name: UMLFrameShapeTypes[0].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[0] },
    {name: UMLFrameShapeTypes[1].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[1] },
    {name: UMLFrameShapeTypes[2].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[2] },
    {name: UMLFrameShapeTypes[3].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[3] },
    {name: UMLFrameShapeTypes[4].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[4] },
]

export const UMLConnectorsForSequence = [
    {name: UMLConnectorTypeInfos[12].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[12] },
    {name: UMLConnectorTypeInfos[13].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[13] },
    {name: UMLConnectorTypeInfos[14].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[14] },
    {name: UMLConnectorTypeInfos[15].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[15] },
]

export const UMLBasicShapesForActivity = [
    {name: UMLBasicShapeTypes[3].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[3] },
    {name: UMLBasicShapeTypes[4].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[4] },
    {name: UMLBasicShapeTypes[5].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[5] },
]

export const UMLCustomShapesForActivity = [
    {name: UMLCustomShapeTypes[3].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[3] },
]

export const UMLConnectorsForActivity = [
    {name: UMLConnectorTypeInfos[16].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[16] },
    {name: UMLConnectorTypeInfos[17].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[17] },
]

