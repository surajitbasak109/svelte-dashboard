import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

const theme = 'catppuccin-mocha';
const highlighter = await createHighlighter({
  themes: [theme],
  langs: [
    'javascript',
    'typescript',
    'php',
    'html',
    'css',
    'c#',
    'c',
    'c++',
    'jsx',
    'tsx',
    'sql',
    'yaml',
    'yml',
    'json',
    'bash',
    'go'
  ]
});

/** @type {import('mdsvex').MdsvexConfig} */
const config = defineConfig({
  extensions: ['.svelte', '.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
      return `{@html \`${html}\` }`;
    }
  },
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
  rehypePlugins: [rehypeSlug]
});

export default config;
