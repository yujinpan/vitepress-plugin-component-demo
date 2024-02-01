import { defineAsyncComponent } from 'vue';

import type { EnhanceAppContext } from 'vitepress-v2';

import demo from './demo.vue';

const enhanceApp = async ({
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

export default enhanceApp;
