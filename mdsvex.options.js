import { escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';

// Rehype Plugins:
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import urls from 'rehype-urls';

function processUrl(url, node) {
  if (node.tagName === 'a') {
    node.properties.class = 'text-link';
    if (!url.href.startsWith('/')) {
      node.properties.target = '_blank';
      node.properties.rel = 'noopener';
    }
  }
}

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
  extensions: ['.md'],
  layout: {
    _: './src/components/mdsvex/md-components.svelte'
  },
  rehypePlugins: [[urls, processUrl], rehypeSlug, rehypeAutolinkHeadings],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter({
        themes: ['slack-ochin', 'poimandres'],
        langs: ['javascript', 'typescript', 'bash', 'json']
      });
      await highlighter.loadLanguage('javascript', 'typescript', 'bash', 'json');
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang,
          theme: 'poimandres'
        })
      );
      return `{@html \`${html}\` }`;
    }
  }
};
