import DefaultTheme from 'vitepress/theme';

import type { Theme } from 'vitepress';

import { enhanceApp } from '../../src';

export default {
  extends: DefaultTheme,
  async enhanceApp(context) {
    await enhanceApp({
      ...context,
      components: import.meta.glob('../components/**/*.vue'),
    });
  },
} satisfies Theme;
