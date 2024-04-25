import type { RequestHandler } from './$types';

import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

// Main Svelte component:
import OgCard from '@/components/ogCard.svelte';
import { error } from '@sveltejs/kit';
import { getSinglePost } from '@/server';

// Size:
const width = 1200;
const height = 630;

export const GET = (async ({ fetch, params }) => {
  const post = await getSinglePost(params.slug);

  if (!post) {
    return error(404, 'Post not found');
  }

  const title = post.title;
  const description = post.description;

  // Fonts:
  const interFontData = await fetch('/fonts/InterDisplay-Medium.ttf').then((res) =>
    res.arrayBuffer()
  );

  //@ts-expect-error - ✨ Svelte component:
  const result = OgCard.render({ title, description });
  const markup = toReactNode(`${result.html}<style>${result.css.code}</style>`);

  const svg = await satori(markup, {
    width,
    height,
    fonts: [{ name: 'InterMedium', data: interFontData, weight: 400, style: 'normal' }]
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: +width
    }
  });

  const png = resvg.render();

  return new Response(png.asPng(), {
    headers: {
      'Content-Type': 'image/png',
      //'Cache-Control': 'public, max-age=604800, immutable'
    }
  });
}) satisfies RequestHandler;
