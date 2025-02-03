import type { Component } from 'svelte';
import type { Stack } from '@/types/featuredProjects.types';

import Remix from '@/icons/remix.svelte';
import Svelteicon from '@/icons/svelteicon.svelte';
import T3 from '@/icons/t3.svelte';
import Tauri from '@/icons/tauri.svelte';
import Trpc from '@/icons/trpc.svelte';
import Astro from '@/icons/astro.svelte';
import Nextjs from '@/icons/nextjs.svelte';
import Tailwindcss from '@/icons/tailwindcss.svelte';
import React from '@/icons/react.svelte';
import Prisma from '@/icons/prisma.svelte';
import Turborepo from '@/icons/turborepo.svelte';
import Shadcnui from '@/icons/shadcnui.svelte';
import Hono from '@/icons/hono.svelte';
import Upstash from '@/icons/upstash.svelte';

interface Technologies {
  stack: Stack;
  icon: Component;
}

export const technologies: Technologies[] = [
  {
    stack: 'Turborepo',
    icon: Turborepo
  },
  {
    stack: 'Hono',
    icon: Hono
  },
  {
    stack: 'Upstash',
    icon: Upstash
  },
  {
    stack: 'Next.js',
    icon: Nextjs
  },
  {
    stack: 'Tailwind CSS',
    icon: Tailwindcss
  },
  {
    stack: 'Remix',
    icon: Remix
  },
  {
    stack: 'Svelte',
    icon: Svelteicon
  },
  {
    stack: 'Tauri',
    icon: Tauri
  },
  {
    stack: 'T3 Stack',
    icon: T3
  },
  {
    stack: 'Astro',
    icon: Astro
  },
  {
    stack: 'Trpc',
    icon: Trpc
  },
  {
    stack: 'React',
    icon: React
  },
  {
    stack: 'Prisma',
    icon: Prisma
  },
  {
    stack: 'shadcn/ui',
    icon: Shadcnui
  }
];
