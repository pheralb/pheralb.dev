import { escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';

// Rehype Plugins:
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from '@jsdevtools/rehype-toc';
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

const customizeTOC = (toc) => {
  try {
    const { children } = toc;
    const childrenOfChildren = children?.[0]?.children;
    if (!children?.length || !childrenOfChildren?.length) return null;
  } catch (e) { /* empty */ }
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: 'mb-4 border-b border-neutral-300 dark:border-neutral-800' },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: 'mt-0 mb-0 font-medium tracking-tight' },
        children: [
          {
            type: 'text',
            value: 'Table of Contents:',
          },
        ],
      },
      ...(toc.children || []),
    ],
  };
};


/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
  extensions: ['.md'],
  layout: {
    _: './src/components/mdsvex/md-components.svelte'
  },
  rehypePlugins: [[urls, processUrl], rehypeSlug, rehypeAutolinkHeadings, [rehypeToc, { customizeTOC }]],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter({
        themes: ['slack-ochin', 'poimandres'],
        langs: ['javascript', 'typescript', 'bash', 'json', 'jsx', 'css', 'tsx']
      });
      await highlighter.loadLanguage('javascript', 'typescript', 'bash', 'json', 'jsx', 'css', 'tsx');
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
