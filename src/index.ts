import { defineAsyncComponent } from 'vue';

import type { EnhanceAppContext } from 'vitepress';

import demo from './demo.vue';

export const enhanceApp = async ({
  app,
  components,
}: EnhanceAppContext & { components }) => {
  app.component('demo', demo);

  Object.keys(components).forEach((item) => {
    const relative = item.replace(/.*components\//, '');
    const name = relative.replace(/\.vue$/, '');

    app.component(
      name,
      defineAsyncComponent(() => components[item]()),
    );
  });
};
