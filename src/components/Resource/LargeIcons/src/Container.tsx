import { SVGProps } from "react";

export function Container(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M2 20V4h20v16H2Zm2-2h16V6H4v12Zm0 0V6v12Z"></path></svg>
  )
}
