<script lang="ts">
  import type { Post } from '@/types/post.type';
  import Badge from '@/ui/badge/badge.svelte';
  import { formatDate } from '@/utils';

  export let postData: Post[] = [];
</script>

<section class="flex flex-col space-y-4">
  <h2 class="text-xl font-medium">Posts</h2>
  {#each postData as post}
    <div class="w-full rounded-md border border-neutral-300 p-3 dark:border-neutral-800">
      <div class="mb-3 flex flex-col space-y-1">
        <a
          href={`/post/${post.slug}`}
          class="text-md md:text-lg font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] duration-150 hover:underline hover:opacity-80"
        >
          {post.title}
        </a>
        <p class="text-pretty text-sm dark:text-neutral-400">
          {post.description}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <Badge>{post.category}</Badge>
        <p class="font-mono text-sm text-neutral-500 dark:text-neutral-400">
          {formatDate(post.date)}
        </p>
      </div>
    </div>
  {/each}
</section>
