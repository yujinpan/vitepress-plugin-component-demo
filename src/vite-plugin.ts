import fs from 'fs';
import glob from 'glob';
import path from 'path';
import { createMarkdownRenderer } from 'vitepress';

import type { Plugin } from 'vite';
import type { SiteConfig } from 'vitepress';

import { filePathToName, getDemoCodeName, getDemoComponentName } from './utils';

/**
 * get demo components and codes
 * 1. use virtual module lazy load all components and codes
 * 2. use .vue?raw&code load markdown codes
 */
const vitePlugin = (options?: { componentsDir: string }): Plugin => {
  options = {
    componentsDir: '.vitepress/components',
    ...options,
  };

  let config: SiteConfig;
  let componentsPath: string;
  let md;

  const getModuleNameFromPath = (absolutePath: string) => {
    const relative = path.relative(componentsPath, absolutePath);
    return filePathToName(relative.slice(0, -path.extname(relative).length));
  };

  const virtualModuleId = 'virtual:demo';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  const codeSuffix = '?raw&code';

  return {
    name: 'vitepress-plugin-component-demo:demo',
    configResolved() {
      config = (global as any).VITEPRESS_CONFIG;
      componentsPath = path.resolve(config.srcDir, options.componentsDir);
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        let codes = '';

        const files = glob.sync(path.resolve(componentsPath, '**/*.vue'));
        files.forEach((file) => {
          const name = getModuleNameFromPath(file);
          codes += `export const ${getDemoComponentName(
            name,
          )} = () => import('${file}')\n`;
          codes += `export const ${getDemoCodeName(name)} = () => import('${
            file + codeSuffix
          }')\n`;
        });

        return codes;
      }
    },
    async transform(code, id) {
      if (id.endsWith(codeSuffix)) {
        md =
          md ||
          (await createMarkdownRenderer(
            config.srcDir,
            config.markdown,
            config.site.base,
            config.logger,
          ));
        const file = id.replace(codeSuffix, '');
        const content = fs.readFileSync(file).toString();
        const code = md.render(`\`\`\`vue\n${content}\n\`\`\``);

        return `export default ${JSON.stringify(code)}`;
      }
    },
  };
};

export default vitePlugin;
