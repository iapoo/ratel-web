import { SVGProps } from "react";

export function Square(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M3 21V3h18v18H3Zm2-2h14V5H5v14Zm0 0V5v14Z"></path></svg>
  )
}
