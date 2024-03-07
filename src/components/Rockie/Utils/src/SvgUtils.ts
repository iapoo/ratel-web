import { Circle, Ellipse, G, Gradient, Line, Marker, Path, Pattern, Polyline, Rect, SVG, Stop, Style, Text } from "@svgdotjs/svg.js";

export class SvgUtils {

    public static parse(svgContent: string) {
        const content = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="90" height="90"><rect width="20" height="20"></rect><path d="M0 0 "></path></svg>`
        const svg = SVG().svg(svgContent)
        const children =  svg.children()
        children.forEach((element, index, array) => {
            if(element instanceof Path) {
                
            } else if(element instanceof Rect) {

            } else if(element instanceof Circle) {

            } else if (element instanceof Ellipse) {

            } else if (element instanceof Line) {
                
            } else if (element instanceof Polyline) {
                
            } else if (element instanceof Gradient) {
                
            } else if (element instanceof Stop) {
                
            } else if (element instanceof Pattern) {
                
            } else if (element instanceof Style) {
                
            } else if (element instanceof Marker) {
                
            }
        })
    }

}