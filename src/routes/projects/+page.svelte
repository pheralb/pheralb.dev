<script lang="ts">
  import Badge from '@/ui/badge/badge.svelte';
  import type { PageData } from './$types';

  import Input from '@/ui/input/input.svelte';
  import { ArrowUpRight, GitForkIcon, SearchIcon, StarIcon } from 'lucide-svelte';

  export let data: PageData;

  const repos = data.repos;
  let searchTerm = '';

  $: filteredRepos = searchTerm
    ? repos.filter((repo) => repo.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : repos.sort((a, b) => b.stargazers_count - a.stargazers_count);

  const handleSearch = (e: Event) => {
    searchTerm = (e.target as HTMLInputElement).value.trim();
  };
</script>

<main class="duration-500 animate-in fade-in-5 slide-in-from-bottom-3">
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
      class="flex items-center space-x-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="font-mono text-xs"> View on GitHub </span>
      <ArrowUpRight size={14} strokeWidth={1.5} />
    </a>
  </div>
  <div class="flex flex-col space-y-3">
    {#each filteredRepos as item}
      <div
        class="flex flex-col space-y-2 rounded-md border border-neutral-300 p-3 dark:border-neutral-800"
      >
        <a
          href={item.html_url}
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-neutral-900 dark:text-neutral-100"
        >
          {item.name}
        </a>
        <p class="text-sm text-neutral-500 dark:text-neutral-400">{item.description}</p>
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center space-x-2">
            {#each item.topics as tag}
              <Badge>
                {tag}
              </Badge>
            {/each}
          </div>
          <div class="flex items-center space-x-2">
            <StarIcon size={14} strokeWidth={1.5} />
            <p class="font-mono text-sm">{item.stargazers_count}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</main>
