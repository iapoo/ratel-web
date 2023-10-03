import { defineConfig } from 'umi'
const CompressionPlugin = require("compression-webpack-plugin")
//import { ThemeUtils, } from './src/utils/ThemeUtils'

export default defineConfig({
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'en-US', //zh-CN 'en-US'
    baseSeparator: '-',
  },
  theme: {
    //'@primary-color': '#1DA57A',
    //'@table-header-bg': ThemeUtils.tableHeaderBg, // 表头背景
    //'@border-radius-base': ThemeUtils.borderRadiusBase, // '4px', // 组件/浮层圆角
    //'@font-size-base': '12px',
  },
  antd: {
    compact: true
  },
  // 使用hash解决框架打包后浏览器不刷新问题
  hash: true,  
  history: {
    type: 'memory'
  },
  icons: {
    entry: './src/icons',
  },
  define: {
    'process.env.WEB_HTTP': 'http://',
    'process.env.WEB_SERVER': '47.101.177.108',
    'process.env.WEB_PORT': '8001',
    'process.env.WEB_PATH': '',
  },
  title: 'Ratel',
})
