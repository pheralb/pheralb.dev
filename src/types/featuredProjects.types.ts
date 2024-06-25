import type { ComponentType } from 'svelte';

export interface iProjects {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  githubUrl?: string;
  icon?: string;
  lucideIcon: ComponentType;
  mainTech: iMainTech;
  latest?: boolean;
}

export interface iMainTech {
  title: string;
  url: string;
  svelteIcon: ComponentType;
}
