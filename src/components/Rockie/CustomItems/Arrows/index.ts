import { CustomEntityTypeInfo } from "../../Items/src/CustomEntity";
import { Arrow, ArrowTypes } from "./src/Arrow";

export { Arrow } from './src/Arrow'

export const Arrows: CustomEntityTypeInfo[] = [
    { name: ArrowTypes[0].name, type: Arrow, typeInfo: ArrowTypes[0] },
    { name: ArrowTypes[1].name, type: Arrow, typeInfo: ArrowTypes[1] },
    { name: ArrowTypes[2].name, type: Arrow, typeInfo: ArrowTypes[2] },
    { name: ArrowTypes[3].name, type: Arrow, typeInfo: ArrowTypes[3] },
    { name: ArrowTypes[4].name, type: Arrow, typeInfo: ArrowTypes[4] },
    { name: ArrowTypes[5].name, type: Arrow, typeInfo: ArrowTypes[5] },
    { name: ArrowTypes[6].name, type: Arrow, typeInfo: ArrowTypes[6] },
    { name: ArrowTypes[7].name, type: Arrow, typeInfo: ArrowTypes[7] },
]