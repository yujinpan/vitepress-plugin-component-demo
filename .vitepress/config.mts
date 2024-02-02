import { defineConfig } from 'vitepress';
import vitePlugin from '../src/vite-plugin';

export default defineConfig({
  appearance: true,
  base: '/vitepress-plugin-component-demo/',
  title: 'vitepress-plugin-component-demo',
  description: 'vitepress-plugin-component-demo.',
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    nav: [{text: 'Guide', link: '/'}],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/yujinpan/vitepress-plugin-component-demo'
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present yujinpan'
    },
    lastUpdated: {
      text: 'Last Updated'
    }
  },

  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-xxx' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-xxx');`
    ]
  ],

  vite: {
    plugins: [vitePlugin]
  }
});
