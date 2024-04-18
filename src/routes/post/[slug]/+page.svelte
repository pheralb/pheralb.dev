<script lang="ts">
  import { cn } from '@/utils';

  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="flex flex-col space-y-6 duration-500 animate-in fade-in-5 slide-in-from-bottom-3">
  <div class="flex flex-col space-y-2 py-6">
    <h2 class="text-3xl font-medium tracking-tighter">
      {data.meta.title}
    </h2>
    <p class="dark:text-neutral-400 text-neutral-800">{data.meta.description}</p>
  </div>
  <div class={cn('prose-quoteless prose w-full max-w-full text-pretty dark:prose-invert')}>
    <svelte:component this={data.content} />
  </div>
</article>
