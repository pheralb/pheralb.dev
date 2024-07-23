<script lang="ts">
  import { featuredProjects } from '@/data/featuredProjects';
  import { ArrowRight } from 'lucide-svelte';

  import ProjectCard from './featuredProjectCard.svelte';
</script>

<section class="flex flex-col space-y-4">
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
        icon={project.icon}
        websiteUrl={project.url}
        githubUrl={project.githubUrl}
        mainTechIcon={project.mainTech.svelteIcon}
        mainTechUrl={project.mainTech.url}
        mainTechName={project.mainTech.title}
        tags={project.tags}
        latest={project.latest}
      />
    {/each}
  </div>
</section>
