import { Point2 } from "@/components/Engine";

export class OrthogonalHelper {

    public static cleanOrthogonalPoints(points: Point2[]) {
        const count = points.length
        let index = count - 2
        while(index > 0) {
            if(index > 2 && points[index].x == points[index -1].x && points[index].x == points[index - 2].x) {
                points.splice(index - 1,1)
            } else if(index > 2 && points[index].y == points[index -1].y && points[index].y == points[index - 2].y) {
                points.splice(index - 1,1)
            }
            index --
        }
    }
}