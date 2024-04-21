import { escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
  extensions: ['.md'],
  layout: {
    _: './src/components/mdsvex/md-components.svelte'
  },
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter({
        themes: ['slack-ochin', 'poimandres'],
        langs: ['javascript', 'typescript', 'bash', 'json'],
      });
      await highlighter.loadLanguage('javascript', 'typescript', 'bash', 'json');
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang,
          theme: 'poimandres',
        })
      );
      return `{@html \`${html}\` }`;
    }
  }
};
