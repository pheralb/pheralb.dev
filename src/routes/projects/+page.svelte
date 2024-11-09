<script lang="ts">
  import Badge from '@/ui/badge/badge.svelte';
  import type { PageData } from './$types';

  import Input from '@/ui/input/input.svelte';
  import { ArrowRight, ArrowUpRight, GitForkIcon, SearchIcon, StarIcon } from 'lucide-svelte';
  import { routeAnimation } from '@/ui/shared';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const repos = data.repos;
  let searchTerm = $state('');

  let filteredRepos = $derived(
    searchTerm
      ? repos.filter((repo) => repo.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
  );

  const handleSearch = (e: Event) => {
    searchTerm = (e.target as HTMLInputElement).value.trim();
  };
</script>

<svelte:head>
  <title>Projects - Pablo Hernández</title>
  <meta property="og:title" content="Pablo Hernández" />
  <meta property="og:description" content="Building amazing things" />
  <meta
    name="image"
    property="og:image"
    content="https://pheralb.dev/images/readme_img.png"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<main class={routeAnimation}>
  <div class="relative mb-5">
    <SearchIcon
      class="absolute left-3 top-1/2 -translate-y-1/2 transform text-neutral-500 dark:text-neutral-400"
      size={18}
      strokeWidth={1.5}
    />
    <Input
      type="search"
      autocomplete="off"
      autofocus
      class="h-10 pl-10 shadow-sm"
      placeholder="Search Repositories"
      on:input={handleSearch}
    />
  </div>
  <div
    class="mb-4 flex w-full items-center justify-between space-x-2 text-neutral-600 dark:text-neutral-400"
  >
    <div class="flex items-center space-x-2">
      <GitForkIcon size={14} strokeWidth={1.5} />
      <p class="font-mono text-xs">
        {repos.length}
        {repos.length > 1 ? 'repositories' : 'repository'}
      </p>
    </div>
    <a
      href="https://github.com/pheralb?tab=repositories"
      class="group flex items-center space-x-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="font-mono text-xs"> View on GitHub </span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.5}
        class="opacity-70 duration-200 group-hover:translate-x-[1.3px] group-hover:opacity-100"
      />
    </a>
  </div>
  <div class="flex flex-col space-y-3">
    {#each filteredRepos as item}
      <div
        class="flex flex-col space-y-2 rounded-md border border-neutral-300 p-3 dark:border-neutral-800"
      >
        <div class="flex w-full items-center justify-between">
          <a
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center space-x-2 font-medium duration-100 hover:opacity-80"
          >
            <span>{item.name}</span>
            <ArrowUpRight
              size={12}
              strokeWidth={1.5}
              class="opacity-70 duration-200 group-hover:translate-x-[1.3px] group-hover:opacity-100"
            />
          </a>
          <span
            class="group flex cursor-default items-center space-x-2 text-neutral-600 dark:text-neutral-400"
          >
            <StarIcon
              size={14}
              strokeWidth={1.5}
              class="duration-200 group-hover:text-yellow-600"
            />
            <p class="font-mono text-xs">{item.stargazers_count}</p>
          </span>
        </div>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">{item.description}</p>
        <div class="flex items-center space-x-2 overflow-y-auto">
          {#each item.topics as tag}
            <Badge>
              {tag}
            </Badge>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</main>
