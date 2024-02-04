import { defineAsyncComponent } from 'vue';

import type { EnhanceAppContext } from 'vitepress';

import demo from './demo';

export const enhanceApp = async ({
  app,
  components,
}: EnhanceAppContext & { components }) => {
  app.component('demo', demo);

  Object.keys(components).forEach((item) => {
    const relative = item.replace(/.*components\//, '');
    const name = relative.replace(/\.vue$/, '').replaceAll('/', '-');

    app.component(
      name,
      defineAsyncComponent(() => components[item]()),
    );
  });
};
