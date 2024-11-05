<script lang="ts">
  import { mode } from 'mode-watcher';
  import type { ComponentType } from 'svelte';
  import { ArrowUpRight } from 'lucide-svelte';
  import Github from '@/icons/github.svelte';
  import Badge from '@/ui/badge/badge.svelte';
  import SpotlightBadge from '@/ui/badge/spotlight-badge.svelte';

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

  interface Props {
    title: string;
    description: string;
    icon: string | undefined;
    websiteUrl: string | undefined;
    githubUrl: string | undefined;
    mainTechIcon: ComponentType | null;
    mainTechUrl: string | null;
    mainTechName: string | null;
    tags: string[];
    latest: boolean | undefined;
  }

  let {
    title,
    description,
    icon,
    websiteUrl,
    githubUrl,
    mainTechIcon,
    mainTechUrl,
    mainTechName,
    tags,
    latest
  }: Props = $props();
  export const stars: number | undefined = 0;
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
        {#if latest}
          <SpotlightBadge>latest</SpotlightBadge>
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
    <div class="hidden items-center space-x-2 overflow-x-auto md:flex">
      {#if mainTechIcon}
        {@const SvelteComponent = mainTechIcon}
        <a href={mainTechUrl} target="_blank" rel="noopener" class="mr-1" title={mainTechName}>
          <SvelteComponent height={17} />
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
