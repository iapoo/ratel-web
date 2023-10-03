import { SVGProps } from "react";

export function Hexagon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7.95 21q-.55 0-1-.263T6.225 20l-4.05-7q-.275-.475-.275-1t.275-1l4.05-7q.275-.475.725-.738t1-.262h8.1q.55 0 1 .263t.725.737l4.05 7q.275.475.275 1t-.275 1l-4.05 7q-.275.475-.725.738t-1 .262h-8.1Zm0-2h8.1l4.025-7l-4.025-7h-8.1L3.9 12l4.05 7ZM12 12Z"></path></svg>
      )
  }
