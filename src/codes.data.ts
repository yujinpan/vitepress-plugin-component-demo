import fs from 'fs';
import * as glob from 'glob';
import path from 'path';

import type { SiteConfig } from 'vitepress-v2';

export default {
  async load() {
    const config: SiteConfig = (global as any).VITEPRESS_CONFIG;
    const createMarkdownRenderer = await import('vitepress-v2').then(
      (res) => res.createMarkdownRenderer,
    );
    const md = await createMarkdownRenderer(
      config.srcDir,
      config.markdown,
      config.site.base,
      config.logger,
    );

    const componentsPath = path.resolve(
      config.srcDir,
      './.vitepress/components',
    );

    return glob
      .sync(path.resolve(componentsPath, '**/*.vue'))
      .reduce((prev, next) => {
        const relative = path.relative(componentsPath, next);
        const name = relative.slice(0, -path.extname(relative).length);
        const content = fs.readFileSync(next).toString();
        const code = md.render(`\`\`\`vue\n${content}\n\`\`\``);

        return {
          ...prev,
          [name]: code,
        };
      }, {});
  },
};
