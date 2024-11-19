import { Colors, Matrix, Rectangle, RoundRectangle, Scale, Shape } from '@ratel-web/engine'
import {
  Circle,
  Container,
  Element,
  Ellipse,
  G,
  Gradient,
  Line,
  Marker,
  Path,
  Pattern,
  PointArray,
  Polyline,
  Rect,
  SVG,
  Stop,
  Style,
  Svg,
} from '@svgdotjs/svg.js'
import { CustomSvgShape } from '../../Shapes'
import { CommonUtils } from './CommonUtils'

export class SvgShape extends Shape {
  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height)
    this.clipped = false
    this.stroke.setColor(Colors.Black)
    this.fill.setColor(Colors.White)
  }
}

export class SvgRootShape extends Shape {
  public constructor(left: number, top: number, width: number, height: number) {
    super(left, top, width, height)
    this.clipped = false
    this.stroke.setColor(Colors.Black)
    this.fill.setColor(Colors.White)
  }
}

export class SvgUtils {
  public static parse(svgContent: string, shape: CustomSvgShape) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const content = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" 
            width="90" height="90">
            <rect width="20" height="20"></rect>
            <circle cx="90" cy="50" r="15"/>
            <ellipse cx="115" cy="50" rx="15" ry="15"/>
            <line x1="70" y1="40" x2="90" y2="30" />
            <polyline points="15,15 80,80 65,40" />
            <circle cx="125" cy="95" r="23" stroke="#FF00FF" stroke-width="8"/>
            <path d="M20 20 L20 50 L50 50 L50 20 Z" fill="#F9F919" transform2="rotate(10, 10, 15)"></path>
            </svg>`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const content2 = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="296.000000" height="242.138062" viewBox="0 0 296 242.138"><path d="M26.2412 226.181C26.5761 226.181 26.8017 226.14 26.9829 226.068L26.8017 225.091C26.6616 225.118 26.6069 225.118 26.5351 225.118C26.3403 225.118 26.1728 224.964 26.1728 224.571L26.1728 214.857L24.8979 214.857L24.8979 224.489C24.8979 225.566 25.291 226.181 26.2412 226.181ZM28.8879 226L30.1628 226L30.1628 218.398L28.8879 218.398L28.8879 226ZM29.5305 216.83C30.0363 216.83 30.4123 216.481 30.4123 216.002C30.4123 215.486 30.0363 215.179 29.5305 215.179C29.028 215.179 28.6486 215.486 28.6486 216.002C28.6486 216.481 29.028 216.83 29.5305 216.83ZM32.7379 226L34.0128 226L34.0128 220.483C34.7818 219.714 35.3116 219.321 36.0977 219.321C37.106 219.321 37.5401 219.923 37.5401 221.352L37.5401 226L38.8116 226L38.8116 221.184C38.8116 219.239 38.087 218.204 36.4908 218.204C35.4517 218.204 34.669 218.774 33.941 219.489L33.9 219.489L33.7872 218.398L32.7379 218.398L32.7379 226ZM41.2918 226L42.5497 226L42.5497 223.997L43.9784 222.333L46.2069 226L47.5912 226L44.7064 221.451L47.2562 218.398L45.8412 218.398L42.5804 222.415L42.5497 222.415L42.5497 214.857L41.2918 214.857L41.2918 226ZM50.2229 226L51.72 226L52.7864 221.926C52.9812 221.198 53.135 220.483 53.3025 219.714L53.3743 219.714C53.5555 220.483 53.6956 221.184 53.8904 221.898L54.9978 226L56.5359 226L58.5799 218.398L57.3767 218.398L56.2557 222.794C56.0882 223.522 55.948 224.209 55.7806 224.923L55.7259 224.923C55.5447 224.209 55.3738 223.522 55.1927 222.794L54.0032 218.398L52.7557 218.398L51.5799 222.794C51.385 223.508 51.2312 224.209 51.0638 224.923L50.992 224.923C50.8518 224.209 50.698 223.522 50.5442 222.794L49.4129 218.398L48.1106 218.398L50.2229 226ZM61.8438 226.181C62.7803 226.181 63.6348 225.692 64.3628 225.091L64.4038 225.091L64.5166 226L65.5659 226L65.5659 221.324C65.5659 219.448 64.7832 218.204 62.9341 218.204C61.7173 218.204 60.6406 218.747 59.9399 219.195L60.4424 220.077C61.044 219.673 61.8438 219.267 62.7256 219.267C63.9697 219.267 64.2944 220.203 64.2944 221.184C61.0576 221.546 59.6187 222.374 59.6187 224.024C59.6187 225.398 60.5689 226.181 61.8438 226.181ZM62.2061 225.159C61.4507 225.159 60.8628 224.811 60.8628 223.942C60.8628 222.961 61.731 222.333 64.2944 222.025L64.2944 224.151C63.5527 224.811 62.9478 225.159 62.2061 225.159ZM67.9897 226L69.2646 226L69.2646 220.483C70.0337 219.714 70.5635 219.321 71.3496 219.321C72.3579 219.321 72.792 219.923 72.792 221.352L72.792 226L74.0635 226L74.0635 221.184C74.0635 219.239 73.3388 218.204 71.7427 218.204C70.7036 218.204 69.9209 218.774 69.1928 219.489L69.1518 219.489L69.039 218.398L67.9897 218.398L67.9897 226Z" fill="#19191A" fill-opacity="1.000000" transform="matrix(1 0 0 1 48 7.13806)"/><path d="M84.2563 221.423L84.1162 220.497L82.4927 221.003L82.4927 218.146L83.9351 218.146L83.9351 217.137L82.4927 217.137L82.4927 214.297L81.5288 214.297L81.5288 217.137L80.4487 217.137C80.5478 216.522 80.6435 215.879 80.7153 215.247L79.8061 215.093C79.6387 216.802 79.3721 218.566 78.8389 219.755C79.0644 219.841 79.4541 220.09 79.6387 220.217C79.8882 219.643 80.0864 218.932 80.2539 218.146L81.5288 218.146L81.5288 221.27C80.5478 221.577 79.6523 221.813 78.938 222.011L79.2183 223.002C79.9018 222.794 80.7017 222.541 81.5288 222.292L81.5288 227.077L82.4927 227.077L82.4927 221.98L84.2563 221.423ZM90.6685 216.621L90.6685 216.635L86.1875 216.635C86.4404 215.948 86.6523 215.22 86.8198 214.478L85.8662 214.283C85.4048 216.396 84.564 218.412 83.4155 219.66C83.6274 219.796 84.0478 220.09 84.2153 220.261C84.8169 219.547 85.3501 218.621 85.8115 217.599L87.0146 217.599C86.3721 219.841 85.1245 222.179 83.6411 223.341C83.9351 223.495 84.27 223.73 84.4683 223.942C85.9927 222.613 87.2812 219.995 87.9101 217.599L89.0586 217.599C88.3306 221.112 86.8198 224.558 84.5229 226.208C84.8306 226.362 85.1963 226.615 85.3911 226.841C87.7153 224.992 89.2534 221.27 89.9541 217.599L90.6274 217.599C90.3472 223.143 90.0396 225.217 89.5918 225.706C89.438 225.887 89.2979 225.945 89.0723 225.945C88.792 225.945 88.2314 225.932 87.6025 225.874C87.7837 226.154 87.8828 226.588 87.8965 226.896C88.5117 226.937 89.1167 226.954 89.4927 226.896C89.9131 226.854 90.1934 226.728 90.46 226.362C91.0205 225.665 91.3281 223.495 91.6357 217.151C91.6494 217.024 91.6494 216.635 91.6494 216.635L90.6685 216.621ZM101.435 216.635C101.182 216.033 100.581 215.151 100.02 214.519L99.1962 214.926C99.7397 215.585 100.314 216.495 100.553 217.096L101.435 216.635ZM94.7836 221.563L96.8002 221.563L96.8002 223.522C96.0995 223.635 95.416 223.748 94.7836 223.843L94.7836 221.563ZM96.8002 215.835L96.8002 217.797L94.7836 217.797L94.7836 215.835L96.8002 215.835ZM94.7836 218.679L96.8002 218.679L96.8002 220.682L94.7836 220.682L94.7836 218.679ZM98.8715 224.096L98.8032 223.201L97.7094 223.368L97.7094 215.835L98.3281 215.835L98.3281 214.885L93.0917 214.885L93.0917 215.835L93.8608 215.835L93.8608 223.983C93.5395 224.024 93.2455 224.055 92.9653 224.096L93.1874 225.077L96.8002 224.458L96.8002 227.077L97.7094 227.077L97.7094 224.291L98.8715 224.096ZM105.704 221.632L105.704 220.682L102.289 220.682C102.317 220.371 102.317 220.107 102.317 219.827L102.317 218.146L105.188 218.146L105.188 217.182L103.298 217.182C103.773 216.495 104.292 215.626 104.74 214.827L103.705 214.533C103.352 215.333 102.724 216.454 102.19 217.182L98.7314 217.182L98.7314 218.146L101.281 218.146L101.281 219.813C101.281 220.09 101.281 220.371 101.254 220.682L98.3828 220.682L98.3828 221.632L101.155 221.632C100.915 223.214 100.16 225.005 97.894 226.461C98.1606 226.643 98.4955 226.967 98.663 227.203C100.44 225.986 101.38 224.558 101.842 223.187C102.57 224.923 103.66 226.294 105.174 227.063C105.328 226.783 105.622 226.407 105.858 226.195C104.094 225.412 102.864 223.717 102.248 221.632L105.704 221.632ZM113.476 223.102C113.138 222.5 112.649 221.745 112.102 220.958C112.482 219.813 112.776 218.539 112.998 217.182L112.048 217.083C111.88 218.118 111.682 219.085 111.415 220.008C110.886 219.294 110.325 218.566 109.778 217.937L109.136 218.511C109.765 219.28 110.452 220.189 111.067 221.071C110.534 222.555 109.792 223.802 108.828 224.739C109.05 224.879 109.484 225.173 109.638 225.313C110.479 224.417 111.166 223.313 111.726 221.998C112.143 222.654 112.523 223.269 112.789 223.775L113.476 223.102ZM117.551 223.59C117.212 222.849 116.682 221.926 116.064 220.989C116.443 219.841 116.724 218.58 116.932 217.209L115.995 217.11C115.842 218.132 115.661 219.099 115.394 220.008C114.888 219.308 114.358 218.607 113.825 217.992L113.152 218.511C113.784 219.294 114.454 220.203 115.056 221.085C114.498 222.626 113.753 223.915 112.718 224.852C112.957 224.978 113.364 225.272 113.545 225.426C114.427 224.517 115.114 223.396 115.674 222.066C116.149 222.849 116.542 223.59 116.823 224.195L117.551 223.59ZM119.143 215.138L107.68 215.138L107.68 227.049L108.715 227.049L108.715 216.115L118.121 216.115L118.121 225.692C118.121 225.932 118.012 226.014 117.759 226.027C117.493 226.027 116.583 226.041 115.661 226C115.801 226.294 115.995 226.742 116.05 227.036C117.311 227.049 118.067 227.022 118.515 226.854C118.962 226.673 119.143 226.349 119.143 225.692L119.143 215.138ZM124.031 216.214C124.325 216.73 124.633 217.335 124.759 217.752L125.641 217.431C125.528 217.11 125.292 216.648 125.026 216.214L127.152 216.214L127.152 215.432L123.416 215.432C123.556 215.093 123.665 214.772 123.764 214.423L122.756 214.252C122.421 215.459 121.806 216.635 121.051 217.417C121.3 217.53 121.734 217.77 121.932 217.893C122.349 217.445 122.729 216.871 123.064 216.214L124.031 216.214ZM131.158 224.445L131.158 225.792L124.424 225.792L124.424 224.445L131.158 224.445ZM130.43 220.682L130.43 221.871L124.424 221.871L124.424 220.682L130.43 220.682ZM124.424 222.667L131.451 222.667L131.451 219.882L123.388 219.882L123.388 227.077L124.424 227.077L124.424 226.602L131.158 226.602L131.158 227.049L132.18 227.049L132.18 223.635L124.424 223.635L124.424 222.667ZM126.564 217.318C126.718 217.585 126.858 217.91 126.984 218.204L121.847 218.204L121.847 220.483L122.855 220.483L122.855 219.027L132.108 219.027L132.108 220.483L133.143 220.483L133.143 218.204L128.051 218.204C127.924 217.865 127.685 217.445 127.49 217.124L126.564 217.318ZM129.308 215.445C129.435 215.107 129.548 214.786 129.643 214.437L128.638 214.27C128.386 215.274 127.91 216.269 127.278 216.929C127.531 217.042 127.951 217.264 128.133 217.417C128.427 217.096 128.707 216.676 128.96 216.214L129.937 216.214C130.344 216.73 130.751 217.363 130.932 217.797L131.773 217.404C131.619 217.083 131.325 216.635 131.004 216.214L133.495 216.214L133.495 215.445L129.308 215.445ZM139.333 223.187L137.805 223.689L137.805 220.23L139.22 220.23L139.22 219.253L137.805 219.253L137.805 216.214L139.415 216.214L139.415 215.233L135.078 215.233L135.078 216.214L136.814 216.214L136.814 219.253L135.218 219.253L135.218 220.23L136.814 220.23L136.814 223.997C136.1 224.236 135.454 224.431 134.938 224.585L135.174 225.638C136.421 225.231 138.017 224.684 139.514 224.182L139.333 223.187ZM141.056 218.453L143.182 218.453L143.182 220.248L141.056 220.248L141.056 218.453ZM141.056 215.835L143.182 215.835L143.182 217.599L141.056 217.599L141.056 215.835ZM146.22 217.599L144.077 217.599L144.077 215.835L146.22 215.835L146.22 217.599ZM146.22 220.248L144.077 220.248L144.077 218.453L146.22 218.453L146.22 220.248ZM144.163 225.665L144.163 223.748L147.424 223.748L147.424 222.794L144.163 222.794L144.163 221.157L147.215 221.157L147.215 214.926L140.102 214.926L140.102 221.157L143.114 221.157L143.114 222.794L139.935 222.794L139.935 223.748L143.114 223.748L143.114 225.665L138.858 225.665L138.858 226.615L147.871 226.615L147.871 225.665L144.163 225.665ZM161.635 221.143L155.893 221.143L155.893 216.255L160.849 216.255L160.849 215.233L149.902 215.233L149.902 216.255L154.83 216.255L154.83 221.143L149.174 221.143L149.174 222.165L154.83 222.165L154.83 227.063L155.893 227.063L155.893 222.165L161.635 222.165L161.635 221.143ZM150.883 217.223C151.416 218.245 151.945 219.602 152.144 220.429L153.121 220.09C152.94 219.267 152.366 217.951 151.792 216.942L150.883 217.223ZM158.303 220.47C158.85 219.629 159.52 218.299 160.026 217.182L158.932 216.871C158.583 217.879 157.937 219.308 157.421 220.176L158.303 220.47ZM172.751 222.206L172.751 225.299L165.99 225.299L165.99 222.206L172.751 222.206ZM164.937 227.063L165.99 227.063L165.99 226.308L172.751 226.308L172.751 227.036L173.844 227.036L173.844 221.211L164.937 221.211L164.937 227.063ZM170.761 216.409C171.435 217.011 172.149 217.739 172.792 218.467L165.651 218.819C166.885 217.657 168.13 216.214 169.237 214.704L168.215 214.239C167.121 215.975 165.498 217.739 164.995 218.187C164.534 218.651 164.168 218.959 163.86 219.014C163.973 219.294 164.154 219.813 164.195 220.036C164.742 219.841 165.556 219.813 173.55 219.362C173.899 219.796 174.193 220.203 174.401 220.569L175.283 219.937C174.555 218.774 172.945 217.069 171.589 215.879L170.761 216.409Z" fill="#19191A" fill-opacity="1.000000" transform="matrix(1 0 0 1 48 7.13806)"/><path d="M24.2 35.8C20 40 20 46.6 24.2 50.8C26.3 52.9 28.8 53.7 31.7 53.7C34.6 53.7 37.1 52.5 39.2 50.8C43.4 46.6 43.4 40 39.2 35.8C35.5 31.6 28.4 31.6 24.2 35.8L24.2 35.8L24.2 35.8ZM54.2 6.2C48.4 2.9 42.1 0.800002 35.4 0L28.3 0C21.6 0.399995 15 2.5 9.5 6.2C6.6 7.9 3.70001 10.4 1.2 12.4L0 13.6L12.9 26.5L14.1 25.3C17.9 21.5 22 19.5 27 18.2C29.9 17.8 33.2 17.8 36.2 18.2C41.2 19 45.8 21.5 49.1 25.3L50.3 26.5L63.2 13.6L62 12.3C60 9.9 57.5 7.9 54.2 6.2L54.2 6.2L54.2 6.2Z" fill="#FF6A00" fill-opacity="1.000000" transform="matrix(1 0 0 1 116.7 108.038)"/><path d="M111.2 22.75C102 13.55 90.8 6.95 78.3 3.15C64.1 -1.05 48.7 -1.05 34.1 3.15C21.6 6.84999 10.4 13.55 1.2 22.75L0 23.95L12.9 36.85L14.1 35.65C22 27.75 31.6 22.35 42.4 19.85C51.6 17.75 60.3 17.75 69.5 19.85C80.3 22.35 90.3 27.75 97.8 35.65L99.1 36.85L112 23.95L111.2 22.75L111.2 22.75L111.2 22.75Z" fill="#FF6A00" fill-opacity="1.000000" transform="matrix(1 0 0 1 92.2 73.5881)"/><path d="M14.8 110C14 106.2 14 102.1 14 97.9C14 84.6 17.8 72.1 24 61.2C32.3 46.7 45.7 35.5 61.5 29.2C64 28.4 66.9 27.5 69.4 26.7C72.3 33.8 79.4 38.4 87.3 38.4C95.2 38.4 102.3 33.4 105.2 26.7C106 24.2 106.9 21.7 106.9 19.2C106.9 17.5 106.9 16.3 106.5 15C104 6.7 96.5 0 86.9 0C77.7 0 69.8 6.7 68.1 15L59.4 17.5C39.8 24.2 23.6 37.9 13.6 55.4C6.50001 67.9 1.90001 82.5 1.90001 97.9C1.90001 103.3 2.30001 108.7 3.60001 114.1C6.90001 112.1 10.7 110.9 14.8 110L14.8 110L14.8 110ZM82.7 13.4C83.9 12.6 85.2 12.2 86.9 12.2C88.6 12.2 89.8 12.6 91.1 13.4C93.2 14.7 94.4 17.2 94.4 19.6C94.4 21.7 93.6 23.8 91.9 25.4C90.6 26.6 89 27.5 86.9 27.5C84.8 27.5 83.1 26.7 81.9 25.4C80.2 24.2 79.4 22.1 79.4 19.6C79.4 16.7 80.7 14.6 82.7 13.4L82.7 13.4L82.7 13.4ZM133.6 154.6C121.1 165 104.8 171.3 87.4 171.3C70 171.3 53.6 165.1 41.2 154.6C39.1 152.9 37 150.8 35 148.8C37.5 145.5 39.2 141.7 39.2 137.1C39.2 126.3 30.4 117.5 19.6 117.5C18.8 117.5 17.9 117.5 17.1 117.9C12.9 118.3 9.2 120.4 6.3 122.9C2.5 126.7 0 131.7 0 137.1C0 147.9 8.7 156.7 19.6 156.7C21.7 156.7 23.4 156.3 25 155.9C27.1 158 29.2 160.1 31.7 162.1C46.7 175 66.3 182.9 87.5 182.9C108.7 182.9 128.3 175 143.3 161.6C139.4 160.5 136.1 157.9 133.6 154.6L133.6 154.6L133.6 154.6ZM26.5 139.2C25.7 142.5 22.7 145 19 145C17.8 145 16.5 144.6 15.2 144.2C13.1 143 11.4 140.4 11.4 137.5C11.4 133.3 14.7 130 18.9 130C19.7 130 20.6 130 21 130.4C23.9 131.2 26.4 134.2 26.4 137.5L26.4 139.2L26.5 139.2L26.5 139.2L26.5 139.2ZM168.2 123.4C169 120.5 169.9 117.6 170.3 114.6C171.1 109.2 172 103.8 172 98.4C172 83 167.8 68.4 160.3 55.9C150.3 38.4 133.6 24.7 114.5 18L114.5 19.7C114.5 23.5 113.7 26.8 112.4 30.1C128.2 35.9 141.6 47.6 149.9 62.2C156.1 73 159.9 85.5 159.9 98.9C159.9 103.1 159.5 106.8 159.1 110.6C158.7 113.5 157.9 116 157.4 118.9C156.6 118.9 155.7 118.5 154.9 118.5C144.1 118.5 135.3 127.2 135.3 138.1C135.3 142.3 137 146.4 139.1 149.8C141.6 153.1 144.9 155.6 148.7 156.9C150.4 157.3 152.5 157.7 154.5 157.7C165.3 157.7 174.1 148.9 174.1 138.1C174.8 131.7 172.3 126.7 168.2 123.4L168.2 123.4L168.2 123.4ZM158.6 144.2C157.8 144.6 156.5 145 155.3 145C151.5 145 148.6 142.5 147.8 139.2L147.8 137.5C147.8 134.2 149.9 131.3 152.8 130.4C153.6 130 154.5 130 155.3 130C159.5 130 162.8 133.3 162.8 137.1L162.8 137.5C162.7 140.5 161.1 142.9 158.6 144.2L158.6 144.2L158.6 144.2Z" fill="#FF6A00" fill-opacity="1.000000" transform="matrix(1 0 0 1 61.5 15.438)"/></svg>        
        `
    const svg = SVG().svg(svgContent)
    shape.clear()
    shape.path.reset()
    const svgRootShape = new SvgRootShape(0, 0, shape.width, shape.height)
    shape.addNode(svgRootShape)
    SvgUtils.parseContainer(svg, shape, svgRootShape)
    //Make shape can't be clicked
    shape.path.addRectangle(Rectangle.makeLTWH(0, 0, shape.width, shape.height))
    shape.filled = false
    shape.stroked = false
  }

  /**
   *
   * @param container
   * @param shape it is use to force update stroke or fill for all children in editor
   * @param svgRootShape
   * @private
   */
  private static parseContainer(container: Container, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const children = container.children()
    svgRootShape.path.reset()
    children.forEach((element) => {
      if (element instanceof Path) {
        SvgUtils.parsePath(element, shape, svgRootShape)
      } else if (element instanceof Rect) {
        SvgUtils.parseRect(element, shape, svgRootShape)
      } else if (element instanceof Circle) {
        SvgUtils.parseCircle(element, shape, svgRootShape)
      } else if (element instanceof Ellipse) {
        SvgUtils.parseEllipse(element, shape, svgRootShape)
      } else if (element instanceof Line) {
        SvgUtils.parseLine(element, shape, svgRootShape)
      } else if (element instanceof Polyline) {
        SvgUtils.parsePolyline(element, shape, svgRootShape)
      } else if (element instanceof G) {
        SvgUtils.parseG(element, shape, svgRootShape)
      } else if (element instanceof Gradient) {
      } else if (element instanceof Stop) {
      } else if (element instanceof Pattern) {
      } else if (element instanceof Style) {
      } else if (element instanceof Marker) {
      } else if (element instanceof Svg) {
        SvgUtils.parseSvg(element, shape, svgRootShape)
      }
    })
  }
  private static parseSvg(svg: Svg, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const viewbox = svg.viewbox()
    const width = viewbox.width
    const height = viewbox.height
    SvgUtils.parseCommon(svg, shape, svgRootShape, svgRootShape)
    svgRootShape.scale = new Scale(shape.width / width, shape.height / height)
    SvgUtils.parseContainer(svg, shape, svgRootShape)
  }

  private static parseG(svg: G, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const x = 0 //svg.x()
    const y = 0 //svg.y()
    const width = svg.width()
    const height = svg.height()
    // @ts-ignore
    const gShape = new SvgShape(x, y, width, height)
    svgRootShape.addNode(gShape)
    SvgUtils.parseCommon(svg, shape, svgRootShape, gShape)
    SvgUtils.parseContainer(svg, shape, gShape)
  }

  private static parseAttrs(attrs: any, shape: CustomSvgShape, svgRootShape: SvgRootShape, svgShape: SvgShape) {
    if (attrs) {
      if (attrs['fill']) {
        if (attrs['fill'].toLowerCase() === 'none') {
          svgShape.filled = false
        } else {
          const color = CommonUtils.parseColorString(attrs[`fill`])
          if (color) {
            svgShape.fill.setColor(color)
          }
        }
      }
      if (attrs['stroke']) {
        if (attrs['stroke'].toLowerCase() === 'none') {
          svgShape.stroked = false
        } else {
          const color = CommonUtils.parseColorString(attrs[`stroke`])
          if (color) {
            svgShape.stroke.setColor(color)
          }
        }
      }
      if (attrs['stroke-width']) {
        const strokeWidth = parseFloat(attrs[`stroke-width`])
        svgShape.stroke.setStrokeWidth(strokeWidth)
      }
      if (attrs['fill-opacity']) {
        const opacity = parseFloat(attrs[`fill-opacity`])
        svgShape.fill.setAlpha(opacity)
      }
      if (attrs['stroke-opacity']) {
        const opacity = parseFloat(attrs[`stroke-opacity`])
        svgShape.fill.setAlpha(opacity)
      }
    }
    if (shape.enableFillColor) {
      svgShape.fill.setColor(shape.fill.getColor())
    }
    if (shape.enableStrokeColor) {
      svgShape.stroke.setColor(shape.stroke.getColor())
    }
  }

  private static parseCircle(circle: Circle, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const cx = circle.cx()
    const cy = circle.cy()
    // @ts-ignore
    const radius = circle.radius()
    const circleShape = new SvgShape(0, 0, shape.width, shape.height)
    svgRootShape.addNode(circleShape)
    SvgUtils.parseCommon(circle, shape, svgRootShape, circleShape)
    // @ts-ignore
    circleShape.path.addOval(Rectangle.makeLTWH(cx - radius, cy - radius, radius * 2, radius * 2))
  }

  private static parseEllipse(ellipse: Ellipse, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const cx = ellipse.cx()
    const cy = ellipse.cy()
    const rx = ellipse.rx()
    const ry = ellipse.ry()
    const ellipseShape = new SvgShape(0, 0, shape.width, shape.height)
    svgRootShape.addNode(ellipseShape)
    SvgUtils.parseCommon(ellipse, shape, svgRootShape, ellipseShape)
    // @ts-ignore
    ellipseShape.path.addOval(Rectangle.makeLTWH(cx, cy, rx * 2, ry * 2))
  }

  private static parseLine(line: Line, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const linetShape = new SvgShape(0, 0, shape.width, shape.height)
    svgRootShape.addNode(linetShape)
    SvgUtils.parseCommon(line, shape, svgRootShape, linetShape)
    const pointArray = line.array()
    SvgUtils.parsePointArray(pointArray, linetShape)
  }

  private static parsePolyline(polyline: Polyline, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const polylineShape = new SvgShape(0, 0, shape.width, shape.height)
    svgRootShape.addNode(polylineShape)
    SvgUtils.parseCommon(polyline, shape, svgRootShape, polylineShape)
    const pointArray = polyline.array()
    SvgUtils.parsePointArray(pointArray, polylineShape)
  }

  private static parsePointArray(pointArray: PointArray, svgShape: SvgShape) {
    const count = pointArray.length
    for (let i = 0; i < count; i++) {
      const point = pointArray[i]
      if (i === 0) {
        svgShape.path.moveTo(point[0], point[1])
      } else {
        svgShape.path.lineTo(point[0], point[1])
      }
    }
    //To avoid path become closed.
    for (let i = count - 1; i >= 0; i--) {
      const point = pointArray[i]
      svgShape.path.lineTo(point[0], point[1])
    }
  }

  private static parseRect(rect: Rect, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const width = rect.width()
    const x = rect.x()
    const y = rect.y()
    const height = rect.height()
    // @ts-ignore
    const rx = rect.rx()
    // @ts-ignore
    const ry = rect.ry()
    const rectShape = new SvgShape(0, 0, shape.width, shape.height)
    svgRootShape.addNode(rectShape)
    SvgUtils.parseCommon(rect, shape, svgRootShape, rectShape)
    // @ts-ignore
    rectShape.path.addRRect(new RoundRectangle(x, y, width, height, rx, ry))
  }

  private static parseCommon(element: Element, shape: CustomSvgShape, svgRootShape: SvgRootShape, svgShape: SvgShape) {
    const attrs = element.attr()
    const transform = element.transform()
    const matrix = Matrix.make([transform.a!, transform.c!, transform.e!, transform.b!, transform.d!, transform.f!, 0, 0, 1])
    svgShape.transform = matrix
    SvgUtils.parseAttrs(attrs, shape, svgRootShape, svgShape)
  }

  private static parsePath(path: Path, shape: CustomSvgShape, svgRootShape: SvgRootShape) {
    const pathShape = new SvgShape(0, 0, shape.width, shape.height)
    svgRootShape.addNode(pathShape)
    SvgUtils.parseCommon(path, shape, svgRootShape, pathShape)
    SvgUtils.parsePathCommand(path, pathShape)
  }

  private static parsePathCommand(path: Path, shape: SvgShape) {
    const pathArray = path.array()
    let x = 0
    let y = 0
    let controlPointX = 0
    let controlPointY = 0
    let controlPointCExists = false
    let controlPointQExists = false
    pathArray.forEach((pathCommand) => {
      switch (pathCommand[0]) {
        case 'M':
          shape.path.moveTo(pathCommand[1], pathCommand[2])
          x = pathCommand[1]
          y = pathCommand[2]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'm':
          shape.path.moveTo(x + pathCommand[1], y + pathCommand[2])
          x = x + pathCommand[1]
          y = y + pathCommand[2]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'L':
          shape.path.lineTo(pathCommand[1], pathCommand[2])
          x = pathCommand[1]
          y = pathCommand[2]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'l':
          shape.path.lineTo(x + pathCommand[1], y + pathCommand[2])
          x = x + pathCommand[1]
          y = y + pathCommand[2]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'H':
          shape.path.lineTo(pathCommand[1], y)
          x = pathCommand[1]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'h':
          shape.path.lineTo(x + pathCommand[1], y)
          x = x + pathCommand[1]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'V':
          shape.path.lineTo(x, pathCommand[1])
          y = pathCommand[1]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'v':
          shape.path.lineTo(x, y + pathCommand[1])
          y = y + pathCommand[1]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'C':
          shape.path.cubicTo(pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4], pathCommand[5], pathCommand[6])
          x = pathCommand[5]
          y = pathCommand[6]
          controlPointCExists = true
          controlPointQExists = false
          controlPointX = pathCommand[5] + (pathCommand[5] - pathCommand[3])
          controlPointY = pathCommand[6] + (pathCommand[6] - pathCommand[4])
          break
        case 'c':
          shape.path.cubicTo(x + pathCommand[1], y + pathCommand[2], x + pathCommand[3], y + pathCommand[4], x + pathCommand[5], y + pathCommand[6])
          x = x + pathCommand[5]
          y = y + pathCommand[6]
          controlPointCExists = true
          controlPointQExists = false
          controlPointX = x + pathCommand[5] + (pathCommand[5] - pathCommand[3])
          controlPointY = y + pathCommand[6] + (pathCommand[6] - pathCommand[4])
          break
        case 'S':
          if (controlPointCExists) {
            shape.path.cubicTo(controlPointX, controlPointY, pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4])
          } else {
            shape.path.cubicTo(x, y, pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4])
          }
          x = pathCommand[3]
          y = pathCommand[4]
          controlPointCExists = true
          controlPointQExists = false
          controlPointX = pathCommand[3] + (pathCommand[3] - pathCommand[1])
          controlPointY = pathCommand[4] + (pathCommand[4] - pathCommand[2])
          break
        case 's':
          if (controlPointCExists) {
            shape.path.cubicTo(controlPointX, controlPointY, x + pathCommand[1], y + pathCommand[2], x + pathCommand[3], y + pathCommand[4])
          } else {
            shape.path.cubicTo(x, y, x + pathCommand[1], y + pathCommand[2], x + pathCommand[3], y + pathCommand[4])
          }
          x = x + pathCommand[3]
          y = y + pathCommand[4]
          controlPointCExists = true
          controlPointQExists = false
          controlPointX = x + pathCommand[3] + (pathCommand[3] - pathCommand[1])
          controlPointY = y + pathCommand[4] + (pathCommand[4] - pathCommand[2])
          break
        case 'Q':
          shape.path.quadTo(pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4])
          x = pathCommand[3]
          y = pathCommand[4]
          controlPointCExists = false
          controlPointQExists = true
          controlPointX = pathCommand[3] + (pathCommand[3] - pathCommand[1])
          controlPointY = pathCommand[4] + (pathCommand[4] - pathCommand[2])
          break
        case 'q':
          shape.path.quadTo(x + pathCommand[1], y + pathCommand[2], x + pathCommand[3], y + pathCommand[4])
          x = pathCommand[3]
          y = pathCommand[4]
          controlPointCExists = false
          controlPointQExists = true
          controlPointX = x + pathCommand[3] + (pathCommand[3] - pathCommand[1])
          controlPointY = y + pathCommand[4] + (pathCommand[4] - pathCommand[2])
          break
        case 'T':
          if (controlPointQExists) {
            shape.path.quadTo(controlPointX, controlPointY, pathCommand[1], pathCommand[2])
            controlPointX = pathCommand[1] + (pathCommand[1] - controlPointX)
            controlPointY = pathCommand[2] + (pathCommand[2] - controlPointY)
          } else {
            shape.path.quadTo(x, y, pathCommand[1], pathCommand[2])
            controlPointX = pathCommand[1] + (pathCommand[1] - x)
            controlPointY = pathCommand[2] + (pathCommand[2] - y)
          }
          x = pathCommand[1]
          y = pathCommand[2]
          controlPointCExists = false
          controlPointQExists = true
          break
        case 't':
          if (controlPointQExists) {
            shape.path.quadTo(controlPointX, controlPointY, x + pathCommand[1], y + pathCommand[2])
            controlPointX = x + pathCommand[1] + (pathCommand[1] - controlPointX)
            controlPointY = y + pathCommand[2] + (pathCommand[2] - controlPointY)
          } else {
            shape.path.quadTo(x, y, x + pathCommand[1], y + pathCommand[2])
            controlPointX = x + pathCommand[1] + (x + pathCommand[1] - x)
            controlPointY = y + pathCommand[2] + (y + pathCommand[2] - y)
          }
          x = x + pathCommand[1]
          y = y + pathCommand[2]
          controlPointCExists = false
          controlPointQExists = true
          break
        case 'A':
          shape.path.arcToRotated(
            pathCommand[1],
            pathCommand[2],
            pathCommand[3],
            pathCommand[4] === 1 ? false : true,
            pathCommand[5] === 1 ? false : true,
            pathCommand[6],
            pathCommand[7],
          )
          x = pathCommand[6]
          y = pathCommand[7]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'a':
          shape.path.arcToRotated(
            pathCommand[1],
            pathCommand[2],
            pathCommand[3],
            pathCommand[4] === 1 ? false : true,
            pathCommand[5] === 1 ? false : true,
            x + pathCommand[6],
            y + pathCommand[7],
          )
          x = x + pathCommand[6]
          y = y + pathCommand[7]
          controlPointCExists = false
          controlPointQExists = false
          break
        case 'Z':
        case 'z':
          shape.path.close()
          controlPointCExists = false
          controlPointQExists = false
          break
        default:
          controlPointCExists = false
          controlPointQExists = false
          break
      }
    })
  }
}
