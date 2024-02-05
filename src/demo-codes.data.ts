import fs from 'fs';
import { fileURLToPath } from 'node:url';
import path from 'path';

import type { SiteConfig } from 'vitepress';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: SiteConfig = (global as any).VITEPRESS_CONFIG;
const componentsPath = path.resolve(config.srcDir, './.vitepress/components');
const componentsGlob = path.resolve(componentsPath, '**/*.vue');

const cache = {};

export default {
  watch: [componentsGlob],
  async load(files) {
    const createMarkdownRenderer = await import('vitepress').then(
      (res) => res.createMarkdownRenderer,
    );
    const md = await createMarkdownRenderer(
      config.srcDir,
      config.markdown,
      config.site.base,
      config.logger,
    );

    files.map((file) => {
      const timestamp = fs.statSync(file).mtimeMs;
      const relative = path.relative(componentsPath, file);
      const name = relative.slice(0, -path.extname(relative).length);
      if (cache[name] === timestamp) {
        return;
      }
      cache[name] = timestamp;

      const content = fs.readFileSync(file).toString();
      const code = md.render(`\`\`\`vue\n${content}\n\`\`\``);

      const destFile = path.resolve(
        __dirname,
        `./demo-codes/${name.replaceAll('/', '_')}.html`,
      );
      fs.mkdirSync(path.dirname(destFile), { recursive: true });
      fs.writeFileSync(destFile, code);
    }, {});

    return cache;
  },
};
