<script lang="ts">
  import About from '@/components/about.svelte';
  import Experience from '@/components/experience.svelte';
  import Projects from '@/components/featuredProjects.svelte';
  import { formatDate } from '@/utils';

  export let data;
</script>

<div class="grid items-center gap-12 py-4 md:py-4">
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
