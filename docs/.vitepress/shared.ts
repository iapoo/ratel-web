import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
  base: '/ratel-web/',
  title: 'Ratel',
  head: [['link', { rel: 'icon', href: './favicon.png' }]],
  themeConfig: {
    logo: {
      src: '/images/favicon-128.png',
      alt: 'logo',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/iapoo/ratel-web' }],
  },
})
