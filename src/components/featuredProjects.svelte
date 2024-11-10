<script lang="ts">
  import { featuredProjects } from '@/data/featuredProjects';
  import { ArrowRight } from 'lucide-svelte';

  import ProjectCard from './featuredProjectCard.svelte';
  import { cn } from '@/utils';
</script>

<section
  class={cn(
    'flex flex-col space-y-4',
    'delay-100 duration-500 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards'
  )}
>
  <div class="flex w-full items-center justify-between">
    <h2 class="text-xl font-medium">Projects</h2>
    <a
      href="/projects"
      class="group flex items-center space-x-2 text-sm font-medium text-neutral-500 duration-100 hover:text-black dark:text-neutral-400 dark:hover:text-white"
    >
      <span>More</span>
      <ArrowRight
        size={14}
        strokeWidth={2}
        class="opacity-70 duration-200 group-hover:translate-x-[2px] group-hover:opacity-100"
      />
    </a>
  </div>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
    {#each featuredProjects as project}
      <ProjectCard
        title={project.title}
        description={project.description}
        url={project.url}
        githubUrl={project.githubUrl}
        icon={project.icon}
        tags={project.tags}
        mainTech={project.mainTech}
        latest={project.latest}
        updated={project.updated}
        lucideIcon={project.lucideIcon}
      />
    {/each}
  </div>
</section>
