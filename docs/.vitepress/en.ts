import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const en = defineConfig({
  lang: 'en-US',
  description: 'Ratel',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/index' },
      { text: 'Document', link: '/about' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'About Ratel', link: '/about' },
          { text: 'Quick guide', link: '/quick-guide' },
        ],
      },
      {
        text: 'Usage',
        items: [
          { text: 'Start', link: '/usage' },
          { text: 'Editor Usage', link: '/usage-editor' },
          { text: 'Advanced Usage', link: '/usage-management' },
          { text: 'Administration', link: '/usage-admin' },
        ],
      },
      {
        text: 'Installation',
        items: [{ text: 'Installation', link: '/installation' }],
      },
      {
        text: 'Build',
        items: [{ text: 'Build', link: '/build' }],
      },
    ],

    footer: {
      message: '',
      copyright: `Copyright © 2024-${new Date().getFullYear()} Ivipa`,
    },
  },
})
