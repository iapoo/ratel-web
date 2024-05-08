import { UMLConnector, UMLConnectorTypeInfos,} from './src/UMLConnector'
import { UMLContainerShape, UMLContainerTypes } from './src/UMLContainerShape'
import { UMLCustomShape, UMLCustomShapeTypes } from './src/UMLCustomShape'
import { UMLFrameShape, UMLFrameShapeTypes } from './src/UMLFrameShape'
import { UMLCustomTable, UMLCustomTableTypes, } from './src/UMLCustomTable'
import { UMLBasicShape, UMLBasicShapeTypes, } from './src/UMLBasicShape'
import { UMLCustomContainer, UMLCustomContainerTypes } from './src/UMLCustomContainer'

export  {UMLCustomTableTypes, UMLCustomTable} from './src/UMLCustomTable'


export const UMLCustomTables = [
    //Class
    {name: UMLCustomTableTypes[0].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[0] },
    {name: UMLCustomTableTypes[1].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[1] },
    {name: UMLCustomTableTypes[2].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[2] },
    {name: UMLCustomTableTypes[3].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[3] },
    {name: UMLCustomTableTypes[4].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[4] },
    {name: UMLCustomTableTypes[5].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[5] }, // For other too
    {name: UMLCustomTableTypes[6].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[6] },
    {name: UMLCustomTableTypes[7].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[7] },
    {name: UMLCustomTableTypes[8].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[8] },
    {name: UMLCustomTableTypes[9].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[9] },
    {name: UMLCustomTableTypes[10].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[10] },
    {name: UMLCustomTableTypes[11].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[11] },
    {name: UMLCustomTableTypes[12].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[12] },
    {name: UMLCustomTableTypes[13].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[13] },
]

export const UMLContainerShapes = [
    //Class
    {name: UMLContainerTypes[0].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[0] },
    //Use Case & Activity State
    {name: UMLContainerTypes[1].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[1] },
    //Activity & State
    {name: UMLContainerTypes[2].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[2] },
    {name: UMLContainerTypes[3].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[3] },
]

export const UMLBasicShapes = [
    //Use case
    {name: UMLBasicShapeTypes[0].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[0] },
    //Use case & Class & all others: Note
    {name: UMLBasicShapeTypes[1].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[1] },
    //Use Case
    {name: UMLBasicShapeTypes[2].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[2] },
    //Activity State
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

    // Activity State
    {name: UMLConnectorTypeInfos[16].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[16] },
    {name: UMLConnectorTypeInfos[17].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[17] },
]

export const UMLCustomShapes = [
    // Sequence
    {name: UMLCustomShapeTypes[0].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[0] },
    // Activity State
    {name: UMLCustomShapeTypes[1].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[1] },
    // Other
    {name: UMLCustomShapeTypes[2].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[2] },
    {name: UMLCustomShapeTypes[3].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[3] },
    {name: UMLCustomShapeTypes[4].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[4] },
    {name: UMLCustomShapeTypes[5].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[5] },
    {name: UMLCustomShapeTypes[6].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[6] },
    {name: UMLCustomShapeTypes[7].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[7] },
]

export const UMLFrameShapes = [
    // Sequence
    {name: UMLFrameShapeTypes[0].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[0] },
    {name: UMLFrameShapeTypes[1].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[1] },
    {name: UMLFrameShapeTypes[2].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[2] },
    {name: UMLFrameShapeTypes[3].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[3] },
    {name: UMLFrameShapeTypes[4].name, type: UMLFrameShape, typeInfo:  UMLFrameShapeTypes[4] },
]

export const UMLCustomContainers = [
    // Sequence
    {name: UMLCustomContainerTypes[0].name, type: UMLCustomContainer, typeInfo:  UMLCustomContainerTypes[0] },
    {name: UMLCustomContainerTypes[1].name, type: UMLCustomContainer, typeInfo:  UMLCustomContainerTypes[1] },
]

export const UMLGridShapesForClass = [
    {name: UMLCustomTableTypes[0].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[0] },
    {name: UMLCustomTableTypes[1].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[1] },
    {name: UMLCustomTableTypes[2].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[2] },
    {name: UMLCustomTableTypes[3].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[3] },
    {name: UMLCustomTableTypes[4].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[4] },
    {name: UMLCustomTableTypes[5].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[5] },
    {name: UMLCustomTableTypes[6].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[6] },
    {name: UMLCustomTableTypes[7].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[7] },
    {name: UMLCustomTableTypes[8].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[8] },
    {name: UMLCustomTableTypes[9].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[9] },
    {name: UMLCustomTableTypes[10].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[10] },
    {name: UMLCustomTableTypes[11].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[11] },
    {name: UMLCustomTableTypes[12].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[12] },
    {name: UMLCustomTableTypes[13].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[13] },
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

export const UMLCustomContainersForSequence = [
    // Sequence
    {name: UMLCustomContainerTypes[0].name, type: UMLCustomContainer, typeInfo:  UMLCustomContainerTypes[0] },
    {name: UMLCustomContainerTypes[1].name, type: UMLCustomContainer, typeInfo:  UMLCustomContainerTypes[1] },
]

export const UMLCustomShapesForSequence = [
    {name: UMLCustomShapeTypes[0].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[0] },
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

export const UMLBasicShapesForActivityState = [
    {name: UMLBasicShapeTypes[3].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[3] },
    {name: UMLBasicShapeTypes[4].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[4] },
    {name: UMLBasicShapeTypes[5].name, type: UMLBasicShape, typeInfo:  UMLBasicShapeTypes[5] },
]

export const UMLCustomShapesForActivityState = [
    {name: UMLCustomShapeTypes[1].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[1] },
]

export const UMLConnectorsForActivityState = [
    {name: UMLConnectorTypeInfos[16].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[16] },
    {name: UMLConnectorTypeInfos[17].name, type: UMLConnector, typeInfo:  UMLConnectorTypeInfos[17] },
]

export const UMLContainerShapesForActivityState = [
    {name: UMLContainerTypes[1].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[1] },
    {name: UMLContainerTypes[2].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[2] },
    {name: UMLContainerTypes[3].name, type: UMLContainerShape, typeInfo:  UMLContainerTypes[3] },
]

export const UMLGridShapesForOther = [
    {name: UMLCustomTableTypes[8].name, type: UMLCustomTable, typeInfo:  UMLCustomTableTypes[8] }, // For other too
]

export const UMLCustomShapesForOther = [
    {name: UMLCustomShapeTypes[2].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[2] },
    {name: UMLCustomShapeTypes[3].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[3] },
    {name: UMLCustomShapeTypes[4].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[4] },
    {name: UMLCustomShapeTypes[5].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[5] },
    {name: UMLCustomShapeTypes[6].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[6] },
    {name: UMLCustomShapeTypes[7].name, type: UMLCustomShape, typeInfo:  UMLCustomShapeTypes[7] },
]
