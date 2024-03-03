import { BottomTriangle, BottomTriangleTypes } from './src/BottomTriangle'
import { LeftTriangle, LeftTriangleTypes } from './src/LeftTriangle'
import { RightTriangle, RightTriangleTypes } from './src/RightTriangle'
import { Star, StarTypes } from './src/Star'
import { TopTriangle, TopTriangleTypes } from './src/TopTriangle'

export {BottomTriangle} from './src/BottomTriangle'
export {LeftTriangle} from './src/LeftTriangle'
export {RightTriangle} from './src/RightTriangle'
export {Star} from './src/Star'
export {TopTriangle} from './src/TopTriangle'

export const BasicShapes = [
    {name: BottomTriangleTypes[0].name, type: BottomTriangle },
    {name: LeftTriangleTypes[0].name, type: LeftTriangle },
    {name: RightTriangleTypes[0].name, type: RightTriangle },
    {name: StarTypes[0].name, type: Star },
    {name: TopTriangleTypes[0].name, type: TopTriangle },
]