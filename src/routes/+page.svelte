<script lang="ts">
  import About from '@/components/about.svelte';
  import Experience from '@/components/experience.svelte';
  import Projects from '@/components/featuredProjects.svelte';
  import { routeAnimation } from '@/ui/shared';
  import { cn, formatDate } from '@/utils';

  export let data;
</script>

<svelte:head>
  <title>Pablo Hernández</title>
</svelte:head>

<div class={cn('grid items-center gap-12 py-4 md:py-4', routeAnimation)}>
  <About />
  <Projects />
  <Experience />
  <ul class="posts">
    {#each data.posts as post}
      <li class="post">
        <a href={`post/${post.slug}`} class="title">{post.title}</a>
        <p class="date">{formatDate(post.date)}</p>
        <p class="description">{post.description}</p>
      </li>
    {/each}
  </ul>
</div>
