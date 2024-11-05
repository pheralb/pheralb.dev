<script lang="ts">
  import type { Post } from '@/types/post.type';
  import Badge from '@/ui/badge/badge.svelte';
  import { formatDate } from '@/utils';

  import { CalendarIcon, TagIcon, ChevronRightIcon } from 'lucide-svelte';

  interface Props {
    postData?: Post[];
  }

  let { postData = [] }: Props = $props();
</script>

<section class="flex flex-col space-y-4">
  <h2 class="text-xl font-medium">Posts</h2>
  {#each postData as post}
    <div class="w-full rounded-md border border-neutral-300 p-3 dark:border-neutral-800">
      <div class="mb-3 flex flex-col space-y-1">
        <a
          href={`/post/${post.slug}`}
          class="text-md font-medium decoration-neutral-500 decoration-dotted underline-offset-[5px] duration-150 hover:underline hover:opacity-80 md:text-lg"
        >
          {post.title}
        </a>
        <p class="text-pretty text-sm dark:text-neutral-400">
          {post.description}
        </p>
      </div>
      <div class="flex w-full items-center justify-between">
        <div class="flex items-center space-x-1">
          <Badge>
            <TagIcon size={12} />
            <span>{post.category}</span>
          </Badge>
          <Badge>
            <CalendarIcon size={12} />
            <time datetime={formatDate(post.date)}>
              {formatDate(post.date)}
            </time>
          </Badge>
        </div>
        <a
          href={`/post/${post.slug}`}
          class="group flex items-center space-x-[4px] font-mono text-sm tracking-tight opacity-70 transition-opacity duration-100 hover:opacity-100"
        >
          <span>Read more</span>
          <ChevronRightIcon size={16} class="group-hover:translate-x-[2px] duration-150" />
        </a>
      </div>
    </div>
  {/each}
</section>
