<script lang="ts">
  import { cn } from '@/utils';
  import { routeAnimation } from '@/ui/shared';

  // Sections:
  import About from '@/components/about.svelte';
  import Experience from '@/components/experience.svelte';
  import Projects from '@/components/featuredProjects.svelte';
  import Posts from '@/components/posts.svelte';

  interface Props {
    data: any;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>Pablo Hernández - pheralb.dev</title>
  <meta property="og:title" content="Pablo Hernández" />
  <meta property="og:description" content="Building amazing things" />
  <meta name="image" property="og:image" content="https://pheralb.dev/images/readme_img.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<div class="grid items-center gap-14 py-4 md:py-4">
  <About />
  <Projects />
  <Experience />
  <Posts postData={data.posts} />
</div>
