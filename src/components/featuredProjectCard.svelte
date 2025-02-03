<script lang="ts">
  import type { iProjects } from '@/types/featuredProjects.types';

  import { mode } from 'mode-watcher';
  import { ArrowUpRight } from 'lucide-svelte';

  import Github from '@/icons/github.svelte';
  import Badge from '@/ui/badge/badge.svelte';
  import SpotlightBadge from '@/ui/badge/spotlight-badge.svelte';
  import { technologies } from '@/data/technologies';

  let div: HTMLDivElement | undefined = $state();
  let focused = false;
  let position = $state({ x: 0, y: 0 });
  let opacity = $state(0);
  let i: number = 0;
  let positions: { x: number; y: number }[] = [{ x: 0, y: 0 }];

  const handleMouseMove = (e: MouseEvent) => {
    if (!div || focused) return;
    const rect = div.getBoundingClientRect();
    position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    positions[i] = position;
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

  let { title, description, icon, url, githubUrl, tags, latest, updated }: iProjects = $props();
</script>

<div
  role="contentinfo"
  bind:this={div}
  onmousemove={handleMouseMove}
  onfocus={handleFocus}
  onblur={handleBlur}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  class="relative flex flex-col rounded-md border-[1px] border-neutral-300 px-3 py-4 shadow-sm dark:border-neutral-800"
>
  <input
    aria-hidden="true"
    class="pointer-events-none absolute left-0 top-0 z-10 h-full w-full cursor-default rounded-[0.310rem] border transition-opacity duration-500 placeholder:select-none
    {$mode === 'dark' ? 'border-white/50' : 'border-black/50'}
    "
    style="
      opacity: {opacity};
      -webkit-mask-image: radial-gradient(30% 30px at {position.x}px {position.y}px, black 45%, transparent);
      background-color: transparent;
    "
  />
  <div
    class="pointer-events-none absolute -inset-px rounded-md opacity-0 transition duration-300"
    style="
      opacity: {opacity};
      background: radial-gradient(600px circle at {position.x}px {position.y}px, rgba(97, 97, 97, 0.1), transparent 60%);
    "
  ></div>
  <div class="flex flex-col space-y-3">
    <div class="flex w-full items-center justify-between">
      <div class="flex items-center space-x-[10px]">
        {#if url}
          {#if icon}
            <img src={icon} alt={title} class="h-6 w-6" />
          {/if}
          <a
            href={url}
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-[6px] font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] hover:underline"
          >
            <span>{title}</span>
            <ArrowUpRight
              size={13}
              strokeWidth={2}
              class="opacity-50 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100"
            />
          </a>
        {:else}
          {#if icon}
            <img src={icon} alt={title} class="h-6 w-6" />
          {/if}
          <p class="font-medium">{title}</p>
        {/if}
      </div>
      <div class="flex items-center gap-2">
        {#if latest || updated}
          <SpotlightBadge>
            {latest ? 'latest' : 'updated'}
          </SpotlightBadge>
        {/if}
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
    </div>
    <p class="truncate text-sm dark:text-neutral-400">{description}</p>
    <div class="flex items-center space-x-1 overflow-y-auto">
      {#each tags as tag}
        {#each technologies.filter((s) => s.stack === tag) as { icon: Icon }}
          <Badge>
            <Icon width={14} height={14} class="flex-shrink-0" />
            <span>{tag}</span>
          </Badge>
        {/each}
      {/each}
    </div>
  </div>
</div>
