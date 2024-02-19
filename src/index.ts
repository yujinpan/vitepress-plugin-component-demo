import type { EnhanceAppContext } from 'vitepress';

import demo from './demo';

export const enhanceApp = ({ app }: EnhanceAppContext) => {
  app.component('demo', demo);
};
