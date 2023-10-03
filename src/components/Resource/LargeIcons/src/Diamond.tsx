import { SVGProps } from "react";

export function Diamond(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 2L5 12l7 10l7-10M7.44 12L12 5.5l4.56 6.5L12 18.5"></path></svg>
  )
}

