export type Stack =
  | 'Next.js'
  | 'Tailwind CSS'
  | 'React'
  | 'Remix'
  | 'Svelte'
  | 'Tauri'
  | 'Turborepo'
  | 'T3 Stack'
  | 'Hono'
  | 'Upstash'
  | 'Astro'
  | 'Trpc'
  | 'Prisma'
  | 'shadcn/ui';

export interface iProjects {
  title: string;
  description: string;
  tags: Stack[];
  url?: string;
  githubUrl?: string;
  icon?: string;
  latest?: boolean;
  updated?: boolean;
}
