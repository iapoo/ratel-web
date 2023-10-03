import { SVGProps } from "react";

export function Note(props: SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M208 28H48a20 20 0 0 0-20 20v160a20 20 0 0 0 20 20h108.69a19.86 19.86 0 0 0 14.14-5.86l51.31-51.31a19.86 19.86 0 0 0 5.86-14.14V48a20 20 0 0 0-20-20ZM52 52h152v92h-48a12 12 0 0 0-12 12v48H52Zm116 139v-23h23Z"></path></svg>
      )
}
