import { createHighlighter } from 'shiki/bundle/web';

let highlighter;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['vitesse-light', 'vesper'],
      langs: ['javascript', 'typescript', 'bash', 'json', 'jsx', 'css', 'tsx']
    });
  }
  return highlighter;
}

export function disposeHighlighter() {
  if (highlighter) {
    highlighter.dispose();
    highlighter = null;
  }
}
