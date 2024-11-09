import type { RequestHandler } from './$types';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { read } from '$app/server';
import { render } from 'svelte/server';
import { error } from '@sveltejs/kit';
import { html as toReactNode } from 'satori-html';
import { getSinglePost } from '@/server';

// Components & Fonts:
import geistFont from './Geist-Medium.ttf?url';
import Card from './og-card.svelte';

// OG Size:
const height = 630;
const width = 1200;

export const GET = async ({ params }: RequestHandler) => {
  const fontSans = await read(geistFont).arrayBuffer();
  const post = await getSinglePost(params.slug as string);

  if (!post) error(404);

  const result = render(Card, {
    props: {
      title: post.title,
      description: post.description,
      date: post.date
    }
  });
  const element = toReactNode(`<head>${result.head}</head>${result.body}`);

  const svg = await satori(element, {
    fonts: [
      {
        name: 'Geist-Medium',
        data: fontSans,
        style: 'normal',
        weight: 600
      }
    ],
    height,
    width
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width
    }
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=600' // cache for 10 minutes
    }
  });
};
