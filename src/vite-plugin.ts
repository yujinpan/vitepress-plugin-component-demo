import type { Plugin } from 'vite';

const vitePlugin: Plugin = {
  name: 'vitepress-plugin-component-demo:data',
  async load(id) {
    if (
      /vitepress-plugin-component-demo\/(es|cjs|src)\/demo-codes\.(js|ts)/.test(
        id,
      )
    ) {
      const { config } = await import('vite').then((res) =>
        res.loadConfigFromFile({} as any, id.replace(/\?.*$/, '')),
      );
      const data = await (config as { load: () => any }).load();

      return `export const data = JSON.parse(${JSON.stringify(
        JSON.stringify(data),
      )})`;
    }
  },
};

export default vitePlugin;
