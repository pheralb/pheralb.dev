<script lang="ts">
  import { cn, formatDate } from '@/utils';
  import { ArrowUpRight, ClockIcon, TagIcon, TriangleAlertIcon } from 'lucide-svelte';

  import Badge from '@/ui/badge/badge.svelte';
  import { routeAnimation } from '@/ui/shared';

  export let data;
</script>

<svelte:head>
  <title>{data.meta.title} - Pablo Hernández</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${data.meta.title} - Pablo Hernández`} />
  <meta property="og:description" content={data.meta.description} />
</svelte:head>

<main class={cn('flex flex-col space-y-5', routeAnimation)}>
  <div class="mt-7 flex flex-col space-y-2">
    <h2 class="text-3xl font-medium tracking-tighter md:text-4xl">
      {data.meta.title}
    </h2>
    <p class="text-neutral-800 dark:text-neutral-400">{data.meta.description}</p>
  </div>
  <div class="flex flex-col space-y-2 border-b border-neutral-300 py-5 dark:border-neutral-800">
    <div class="flex items-center justify-between text-sm">
      <div class="flex items-center space-x-[6px]">
        <Badge>
          <TagIcon size={12} />
          <span>{data.meta.category}</span>
        </Badge>
        <Badge>
          <ClockIcon size={12} />
          <time datetime={data.meta.date}>
            {formatDate(data.meta.date)}
          </time>
        </Badge>
      </div>
      <a
        href={`https://github.com/pheralb/pheralb.dev/blob/main/src/posts/${data.slug}.md`}
        class="flex items-center space-x-1 text-sm tracking-tight text-neutral-600 transition-colors duration-200 ease-in-out hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Edit on GitHub</span>
        <ArrowUpRight size="12" />
      </a>
    </div>
    {#if data.meta.writing}
      <div
        class="flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-200/40 p-2 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-300"
      >
        <TriangleAlertIcon size={16} />
        <p class="text-pretty">
          This post is a work in progress. It may be incomplete, contain errors, or be subject to
          breaking changes.
        </p>
      </div>
    {/if}
  </div>

  <article
    class={cn(
      'pb-5',
      'prose prose-neutral prose-quoteless w-full max-w-full text-pretty dark:prose-invert',
      'prose-headings:font-medium prose-h2:tracking-tight',
      'prose-a:decoration-neutral-400 prose-a:decoration-dotted prose-a:decoration-[1.5px] prose-a:underline-offset-[6px] hover:prose-a:opacity-80 dark:prose-a:decoration-neutral-400',
      'prose-pre:my-3',
      'prose-ol:mb-3 prose-ul:mb-3',
      'prose-inline-code:rounded prose-inline-code:border prose-inline-code:border-neutral-300 prose-inline-code:bg-neutral-200/50 prose-inline-code:p-[2px] prose-inline-code:font-mono prose-inline-code:dark:border-neutral-800 prose-inline-code:dark:bg-neutral-800/50',
      'prose-pre:rounded prose-pre:border prose-pre:border-neutral-300 prose-pre:dark:border-neutral-800 prose-pre:dark:bg-neutral-800/50'
    )}
  >
    <svelte:component this={data.content} />
  </article>
</main>
