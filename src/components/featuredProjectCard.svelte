<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { ArrowUpRight } from 'lucide-svelte';
  import Github from '@/icons/github.svelte';
  import Badge from '@/ui/badge/badge.svelte';

  let div: HTMLDivElement;
  let focused = false;
  let position = { x: 0, y: 0 };
  let opacity = 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!div || focused) return;
    const rect = div.getBoundingClientRect();
    position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleFocus = () => {
    focused = true;
    opacity = 1;
  };

  const handleBlur = () => {
    focused = false;
    opacity = 0;
  };

  const handleMouseEnter = () => {
    opacity = 1;
  };

  const handleMouseLeave = () => {
    opacity = 0;
  };

  export let title: string;
  export let description: string;
  export let icon: string | undefined;
  export let websiteUrl: string | undefined;
  export let githubUrl: string | undefined;
  export let mainTechIcon: ComponentType | null;
  export let mainTechUrl: string | null;
  export let mainTechName: string | null;
  export let tags: string[];
  export const stars: number | undefined = 0;
</script>

<div
  role="contentinfo"
  bind:this={div}
  on:mousemove={handleMouseMove}
  on:focus={handleFocus}
  on:blur={handleBlur}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  class="relative flex flex-col rounded-md border border-neutral-300 px-3 py-4 shadow-sm dark:border-neutral-800"
>
  <div
    class="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
    style={`
			opacity: ${opacity};
			background: radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(97, 97, 97, 0.1), transparent 60%);
		`}
  />
  <div class="flex flex-col space-y-3">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center space-x-[10px]">
        {#if websiteUrl}
          {#if icon}
            <img src={icon} alt={title} class="h-6 w-6" />
          {/if}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-[6px] font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] hover:underline"
          >
            <span>{title}</span>
            <ArrowUpRight
              size={13}
              strokeWidth={2}
              class="opacity-50 group-hover:opacity-100 group-hover:translate-x-[1.5px] duration-200"
            />
          </a>
        {:else}
          {#if icon}
            <img src={icon} alt={title} class="h-6 w-6" />
          {/if}
          <p class="font-medium">{title}</p>
        {/if}
      </div>
      <a
        href={githubUrl}
        title={`View ${title} repository on GitHub`}
        target="_blank"
        rel="noopener"
        class="opacity-75 transition-opacity duration-100 hover:opacity-100"
      >
        <Github height={16} />
      </a>
    </div>
    <p class="truncate text-sm dark:text-neutral-400">{description}</p>
    <div class="hidden items-center space-x-2 overflow-x-auto md:flex">
      {#if mainTechIcon}
        <a href={mainTechUrl} target="_blank" rel="noopener" class="mr-1" title={mainTechName}>
          <svelte:component this={mainTechIcon} height={17} />
        </a>
      {/if}
      <div class="flex items-center space-x-1">
        {#each tags as tag}
          <Badge>
            {tag}
          </Badge>
        {/each}
      </div>
    </div>
  </div>
</div>
