import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ratel",
  description: "Ratel",
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: 'Chinese',
      lang: 'zh',
    },
  },
  themeConfig: {
    logo: {
      src: '/images/favicon-128.png',
      alt: 'logo'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/index' },
      { text: 'Document', link: '/about' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'About Ratel', link: '/about' },
          { text: 'Quck guide', link: '/quick-guide' },
        ]
      },
      {
        text: 'Usage',
        items: [
          { text: 'About Ratel', link: '/about' },
          { text: 'Quck guide', link: '/quick-guide' },
        ]
      },
      {
        text: 'Installation',
        items: [
          { text: 'Installation', link: '/installation' },
        ]
      },
      {
        text: 'Build',
        items: [
          { text: 'Build', link: '/build' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/iapoo/ratel-web' }
    ],

    footer: {
      message: '',
      copyright: `Copyright © 2024-${new Date().getFullYear()} Ivipa`
    },
  }
})
