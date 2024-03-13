import fg from 'fast-glob';
import fs from 'fs';
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

  const fileChangeMap: Record<string, 'update' | 'create' | 'delete'> = {};

  const getComponentCode = async (id: string) => {
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
    return md.render(`\`\`\`vue\n${content}\n\`\`\``);
  };

  return {
    name: 'vitepress-plugin-component-demo:demo',
    config: () => {
      return {
        optimizeDeps: { exclude: [virtualModuleId] },
        ssr: { noExternal: ['vitepress-plugin-component-demo'] },
      };
    },
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

        const files = fg.globSync(path.resolve(componentsPath, '**/*.vue'));
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
        return `export default ${JSON.stringify(await getComponentCode(id))}`;
      }
    },
    watchChange(id, { event }) {
      fileChangeMap[id] = event;
    },
    async handleHotUpdate(ctx) {
      if (ctx.file.startsWith(componentsPath)) {
        // Reload virtual:demo module on file creation/deletion
        if (fileChangeMap[ctx.file] !== 'update') {
          ctx.modules.push(
            ctx.server.moduleGraph.getModuleById(resolvedVirtualModuleId),
          );
        }
        // trigger client hot change
        else {
          ctx.server.ws.send('update:demo-code', {
            componentName: getModuleNameFromPath(ctx.file),
            code: await getComponentCode(ctx.file),
          });
        }
      }
    },
  };
};

export default vitePlugin;
