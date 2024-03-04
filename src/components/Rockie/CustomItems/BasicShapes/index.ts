import { BottomTriangle, BottomTriangleTypes } from './src/BottomTriangle'
import { LeftTriangle, LeftTriangleTypes } from './src/LeftTriangle'
import { Polygon, PolygonTypes } from './src/Polygon'
import { RightTriangle, RightTriangleTypes } from './src/RightTriangle'
import { Star, StarTypes } from './src/Star'
import { TopTriangle, TopTriangleTypes } from './src/TopTriangle'

export {BottomTriangle} from './src/BottomTriangle'
export {LeftTriangle} from './src/LeftTriangle'
export {Polygon} from './src/Polygon'
export {RightTriangle} from './src/RightTriangle'
export {Star} from './src/Star'
export {TopTriangle} from './src/TopTriangle'

export const BasicShapes = [
    {name: BottomTriangleTypes[0].name, type: BottomTriangle, typeInfo:  BottomTriangleTypes[0] },
    {name: LeftTriangleTypes[0].name, type: LeftTriangle, typeInfo: LeftTriangleTypes[0] },
    {name: PolygonTypes[0].name, type: Polygon, typeInfo: PolygonTypes[0] },
    {name: RightTriangleTypes[0].name, type: RightTriangle, typeInfo: RightTriangleTypes[0] },
    {name: StarTypes[0].name, type: Star, typeInfo: StarTypes[0] },
    {name: TopTriangleTypes[0].name, type: TopTriangle, typeInfo: TopTriangleTypes[0] },
]