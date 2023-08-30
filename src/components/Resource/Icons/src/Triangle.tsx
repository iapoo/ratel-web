import { SVGProps } from "react";

export function Triangle(props: SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 2L1 21h22M12 6l7.53 13H4.47"></path></svg>
      )
}
