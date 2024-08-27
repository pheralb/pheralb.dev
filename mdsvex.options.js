import { escapeSvelte } from 'mdsvex';

// Rehype Plugins:
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from '@jsdevtools/rehype-toc';
import urls from 'rehype-urls';

// Shiki Highlighter:
import { createHighlighter, makeSingletonHighlighter } from 'shiki/bundle/web';
const getHighlighter = makeSingletonHighlighter(createHighlighter);

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
  } catch (e) {
    return null;
  }
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
            value: 'Table of Contents:'
          }
        ]
      },
      ...(toc.children || [])
    ]
  };
};

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
  extensions: ['.md'],
  layout: {
    _: './src/components/mdsvex/md-components.svelte'
  },
  rehypePlugins: [
    [urls, processUrl],
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: `before:content-['#'] before:absolute before:-ml-[1em] before:text-neutral-100/0 dark:hover:before:text-neutral-200/50 hover:before:text-neutral-900/50 pl-[1em] -ml-[1em]`
        }
      }
    ],
    [rehypeToc, { customizeTOC }]
  ],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await getHighlighter({
        themes: ['min-light', 'vesper'],
        langs: ['javascript', 'typescript', 'bash', 'json', 'jsx', 'css', 'tsx']
      });
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang,
          themes: {
            light: 'min-light',
            dark: 'vesper'
          }
        })
      );
      return `{@html \`${html}\` }`;
    }
  }
};
