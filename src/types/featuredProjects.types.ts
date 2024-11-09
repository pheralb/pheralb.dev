import type { Icon } from 'lucide-svelte';
import type { Component, ComponentType } from 'svelte';

export interface iProjects {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  githubUrl?: string;
  icon?: string;
  lucideIcon: ComponentType<Icon>;
  mainTech: iMainTech;
  latest?: boolean;
}

export interface iMainTech {
  title: string;
  url: string;
  svelteIcon: Component;
}
