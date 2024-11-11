import { escapeSvelte } from 'mdsvex';
import { h } from 'hastscript';

// Rehype Plugins:
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from '@jsdevtools/rehype-toc';
import urls from 'rehype-urls';

// Shiki Highlighter:
import { createHighlighter, makeSingletonHighlighter } from 'shiki/bundle/web';

// Highlighter Singleton:
const getHighlighter = makeSingletonHighlighter(createHighlighter);

// Open external links in new tab:
function processUrl(url, node) {
  if (node.tagName === 'a') {
    node.properties.class = 'text-link';
    if (!url.href.startsWith('/')) {
      node.properties.target = '_blank';
      node.properties.rel = 'noopener';
    }
  }
}

// Customize TOC:
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

// Copy to cliboard button:
function addCopyButton(options = {}) {
  const toggleMs = options.toggle || 2000;
  return {
    name: 'shiki-copy-button',
    pre(node) {
      node.properties = node.properties || {};
      let iconSize = 14;
      let iconStrokeSize = 1.95;

      const button = h(
        'button',
        {
          class: 'shiki-copy-button-styles',
          title: 'Copy code',
          'data-code': this.source,
          onclick: `
            navigator.clipboard.writeText(this.dataset.code);
            this.classList.add('copied');
            setTimeout(() => this.classList.remove('copied'), ${toggleMs});
          `
        },
        [
          h('span', { class: 'icon-copy-container' }, [
            h(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: iconSize,
                height: iconSize,
                viewBox: '0 0 24 24',
                fill: 'none',
                title: 'Copy code',
                stroke: 'currentColor',
                'stroke-width': iconStrokeSize,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                class: 'icon-copy shiki-copy-icon-colors'
              },
              [
                h('rect', {
                  width: '14',
                  height: '14',
                  x: '8',
                  y: '8',
                  rx: '2',
                  ry: '2'
                }),
                h('path', {
                  d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'
                })
              ]
            )
          ]),
          h('span', { class: 'icon-copied-container' }, [
            h(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: iconSize,
                height: iconSize,
                viewBox: '0 0 24 24',
                title: 'Copied!',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': iconStrokeSize,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                class: 'icon-copied shiki-copy-icon-colors'
              },
              [h('path', { d: 'M18 6 7 17l-5-5' }), h('path', { d: 'm22 10-7.5 7.5L13 16' })]
            )
          ])
        ]
      );

      const wrapper = h('div', { class: 'code-container', style: 'position: relative;' }, [
        node,
        button
      ]);

      return wrapper;
    }
  };
}

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
        themes: ['github-light', 'github-dark'],
        langs: ['javascript', 'typescript', 'bash', 'json', 'jsx', 'css', 'tsx']
      });
      const html = escapeSvelte(
        highlighter.codeToHtml(code, {
          lang,
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          },
          transformers: [addCopyButton()]
        })
      );
      return `{@html \`${html}\` }`;
    }
  }
};
