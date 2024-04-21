<script lang="ts">
  import Badge from '@/ui/badge/badge.svelte';
  import { routeAnimation } from '@/ui/shared';
  import { cn, formatDate } from '@/utils';
  import { ArrowUpRight, ClockIcon } from 'lucide-svelte';

  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<main class={cn('flex flex-col space-y-5', routeAnimation)}>
  <div class="mt-7 flex flex-col space-y-2">
    <h2 class="text-4xl font-medium tracking-tighter">
      {data.meta.title}
    </h2>
    <p class="text-neutral-800 dark:text-neutral-400">{data.meta.description}</p>
  </div>
  <div
    class="flex items-center justify-between border-b border-neutral-300 py-4 text-sm dark:border-neutral-800"
  >
    <div class="flex items-center space-x-3">
      <Badge>{data.meta.category}</Badge>
      <time
        class="flex items-center space-x-2 text-neutral-800 dark:text-neutral-400"
        datetime={data.meta.date}
      >
        <ClockIcon size="14" />
        <span class="font-mono">{formatDate(data.meta.date)}</span>
      </time>
    </div>
    <a
      href={`https://github.com/pheralb/pheralb.dev/blob/main/src/posts/${data.slug}.md`}
      class="flex items-center space-x-1 text-neutral-800 transition-colors duration-200 ease-in-out hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Edit on GitHub</span>
      <ArrowUpRight size="14" />
    </a>
  </div>
  {#if data.meta.writing}
    <div class="flex flex-col space-y-2 border-l border-neutral-300 pl-4 dark:border-neutral-800">
      <p class="text-pretty text-sm text-neutral-700 dark:text-neutral-400">
        🚧 This post is a work in progress. It may be incomplete, contain errors, or be subject to
        breaking changes.
      </p>
    </div>
  {/if}
  <article
    class={cn(
      'py-5',
      'prose prose-quoteless w-full max-w-full text-pretty dark:prose-invert',
      'prose-headings:font-medium'
    )}
  >
    <svelte:component this={data.content} />
  </article>
</main>
