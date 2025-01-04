import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const zh = defineConfig({
  lang: 'zh-cn',
  description: 'Ratel',

  themeConfig: {
    nav: [
      { text: '首页', link: '/zh/index' },
      { text: '文档', link: '/zh/about' },
    ],
    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '关于Ratel', link: '/zh/about' },
          { text: '快速指南', link: '/zh/quick-guide' },
        ],
      },
      {
        text: '使用',
        items: [
          { text: '开始使用', link: '/zh/usage' },
          { text: '图形编辑指南', link: '/zh/usage-editor' },
          { text: '高级用法', link: '/zh/usage-management' },
          { text: '系统管理功能', link: '/zh/usage-admin' },
        ],
      },
      {
        text: '安装指南',
        items: [{ text: '安装指南', link: '/zh/installation' }],
      },
      {
        text: '构建',
        items: [{ text: '构建', link: '/zh/build' }],
      },
    ],

    footer: {
      message: '',
      copyright: `Copyright © 2024-${new Date().getFullYear()} Ivipa`,
    },
  },
})
