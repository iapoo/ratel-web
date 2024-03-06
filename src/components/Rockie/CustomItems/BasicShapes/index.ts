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
    {name: RightTriangleTypes[0].name, type: RightTriangle, typeInfo: RightTriangleTypes[0] },
    {name: TopTriangleTypes[0].name, type: TopTriangle, typeInfo: TopTriangleTypes[0] },
    {name: PolygonTypes[0].name, type: Polygon, typeInfo: PolygonTypes[0] },
    {name: PolygonTypes[1].name, type: Polygon, typeInfo: PolygonTypes[1] },
    {name: PolygonTypes[2].name, type: Polygon, typeInfo: PolygonTypes[2] },
    {name: PolygonTypes[3].name, type: Polygon, typeInfo: PolygonTypes[3] },
    {name: StarTypes[0].name, type: Star, typeInfo: StarTypes[0] },
    {name: StarTypes[1].name, type: Star, typeInfo: StarTypes[1] },
    {name: StarTypes[2].name, type: Star, typeInfo: StarTypes[2] },
    {name: StarTypes[3].name, type: Star, typeInfo: StarTypes[3] },
    {name: StarTypes[4].name, type: Star, typeInfo: StarTypes[4] },
    {name: StarTypes[5].name, type: Star, typeInfo: StarTypes[5] },
    {name: StarTypes[6].name, type: Star, typeInfo: StarTypes[6] },
    {name: StarTypes[7].name, type: Star, typeInfo: StarTypes[7] },
]