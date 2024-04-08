<script>
  import { projects } from '@/data/projects';
  import Github from '@/icons/github.svelte';
  import { ArrowUpRight } from 'lucide-svelte';

  import * as Tooltip from '@/ui/tooltip';
</script>

<div class="flex flex-col space-y-4">
  <h2 class="text-xl font-medium">Projects</h2>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
    {#each projects as project}
      <div
        class="flex flex-col space-y-3 rounded-md border border-neutral-200 px-3 py-4 dark:border-neutral-800"
      >
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center space-x-2">
            {#if project.url}
              <img src={project.icon} alt={project.title} class="h-6 w-6" />
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                class="group flex items-center gap-2 font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] hover:underline"
              >
                <span>{project.title}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  class="opacity-70 group-hover:opacity-100 group-hover:duration-75"
                />
              </a>
            {:else}
              <img src={project.icon} alt={project.title} class="h-6 w-6" />
              <p class="font-medium">{project.title}</p>
            {/if}
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener"
            class="opacity-75 transition-opacity duration-100 hover:opacity-100"
          >
            <Github height={16} />
          </a>
        </div>
        <p class="truncate text-sm dark:text-neutral-400">{project.description}</p>
        <div class="flex items-center">
          <a
            href={project.mainTech.url}
            target="_blank"
            rel="noopener"
            class="mr-1"
            title={project.mainTech.title}
          >
            <svelte:component this={project.mainTech.svelteIcon} height={17} />
          </a>
          <div class="flex items-center space-x-1">
            {#each project.tags as tag}
              <span
                class="ml-1 rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs font-medium text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-300"
              >
                {tag}
              </span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
