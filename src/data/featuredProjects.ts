import type { iProjects } from '@/types/featuredProjects.types';

export const featuredProjects: iProjects[] = [
  {
    title: 'toast',
    description: '🍞 A beautiful notification library for React.',
    tags: ['Turborepo', 'Next.js', 'Tailwind CSS'],
    updated: true,
    url: 'https://toast.pheralb.dev',
    githubUrl: 'https://github.com/pheralb/toast',
    icon: 'https://raw.githubusercontent.com/pheralb/toast/refs/heads/main/website/public/images/logo_svg.svg'
  },
  {
    title: 'svgl',
    description: '🧩 A beautiful library with SVG logos.',
    tags: ['Svelte', 'Hono', 'Upstash', 'shadcn/ui'],
    url: 'https://svgl.app/',
    githubUrl: 'https://github.com/pheralb/svgl',
    icon: 'https://raw.githubusercontent.com/pheralb/svgl/main/static/images/logo.svg'
  },
  {
    title: 'react-symbols',
    description: '✨ Symbols Icons for React.',
    tags: ['Turborepo', 'Remix', 'Tailwind CSS'],
    url: 'https://react-symbols.vercel.app/',
    githubUrl: 'https://github.com/pheralb/react-symbols',
    icon: 'https://raw.githubusercontent.com/pheralb/react-symbols/main/website/public/images/logo_svg.svg'
  },
  {
    title: 'slug',
    description: '🌱 An open-source URL shortener.',
    tags: ['Next.js', 'T3 Stack', 'Prisma'],
    url: 'https://slug.vercel.app/',
    githubUrl: 'https://github.com/pheralb/slug',
    icon: 'https://raw.githubusercontent.com/pheralb/slug/main/public/images/logo_svg.svg'
  },

  {
    title: 'typethings',
    description: '✍️ A modern, minimal markdown editor.',
    tags: ['Turborepo', 'Tauri', 'React'],
    githubUrl: 'https://github.com/pheralb/typethings',
    icon: 'https://raw.githubusercontent.com/pheralb/typethings/main/app/public/images/logo.svg'
  },
  {
    title: 'project-hackathon',
    description: '🌻 An open-source hackathon management.',
    tags: ['Next.js', 'T3 Stack', 'Trpc', 'Prisma'],
    url: 'https://phck.vercel.app/',
    githubUrl: 'https://github.com/pheralb/project-hackathon',
    icon: 'https://raw.githubusercontent.com/pheralb/project-hackathon/main/public/images/phck.png'
  }
];
