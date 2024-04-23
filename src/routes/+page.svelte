<script lang="ts">
  import { cn } from '@/utils';
  import { routeAnimation } from '@/ui/shared';
  
  // Sections:
  import About from '@/components/about.svelte';
  import Experience from '@/components/experience.svelte';
  import Projects from '@/components/featuredProjects.svelte';
  import Posts from '@/components/posts.svelte';

  export let data;
</script>

<svelte:head>
  <title>Pablo Hernández</title>
</svelte:head>

<div class={cn('grid items-center gap-14 py-4 md:py-4', routeAnimation)}>
  <About />
  <Projects />
  <Experience />
  <Posts postData={data.posts} />
</div>
