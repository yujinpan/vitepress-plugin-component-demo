import DefaultTheme from 'vitepress/theme';

import type { Theme } from 'vitepress';

import { enhanceApp } from '../../src';

export default {
  extends: DefaultTheme,
  enhanceApp(context) {
    enhanceApp({
      ...context,
      components: import.meta.glob('../components/**/*.vue'),
    });
  },
} satisfies Theme;
