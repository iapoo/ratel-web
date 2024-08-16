import { defineConfig } from "umi";
const CompressionPlugin = require("compression-webpack-plugin");
//import { ThemeUtils, } from './src/utils/ThemeUtils'
import { theme } from 'antd'

export default defineConfig({
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: "en-US", //zh-CN 'en-US'
    baseSeparator: "-",
  },
  theme: {
    //'@primary-color': '#1DA57A',
    //'@table-header-bg': ThemeUtils.tableHeaderBg, // 表头背景
    //'@border-radius-base': ThemeUtils.borderRadiusBase, // '4px', // 组件/浮层圆角
    //'@font-size-base': '12px',
    // 'algorithm': theme.darkAlgorithm
  },
  antd: {
    compact: true,
    dark: true,
  },
  // 使用hash解决框架打包后浏览器不刷新问题
  hash: true,
  publicPath: "/",
  outputPath: './app/dist',
  history: {
    type: "memory",
  },
  icons: {
    entry: "./src/icons",
  },
  plugins: [
    './plugins/buildMonitor.js'
  ],
  define: {
    "process.env.PUBLIC_PATH": "",
    "process.env.PRODUCTION": "false",
    "process.env.SYSTEM_WEB_HTTP": "http://",
    "process.env.SYSTEM_WEB_SERVER": "192.168.1.215",
    "process.env.SYSTEM_WEB_PORT": "8080",
    "process.env.SYSTEM_WEB_PATH": "",
    "process.env.ROCKIE_WEB_HTTP": "http://",
    "process.env.ROCKIE_WEB_SERVER": "192.168.1.215",
    "process.env.ROCKIE_WEB_PORT": "8081",
    "process.env.ROCKIE_WEB_PATH": "",
  },
  title: "Ratel",
});
