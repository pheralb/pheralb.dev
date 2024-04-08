<script>
  import { buttonVariants } from '@/ui/button';

  import Github from '@/icons/github.svelte';
  import Linkedin from '@/icons/linkedin.svelte';
  import X from '@/icons/x.svelte';
  import ModdeToggle from './modde-toggle.svelte';

  const SocialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pheralb',
      icon: Linkedin
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/pheralb_',
      icon: X
    },
    {
      name: 'GitHub',
      url: 'https://github.com/pheralb/pheralb.dev',
      icon: Github
    }
  ];
</script>

<nav class="container mb-5 flex w-full max-w-4xl items-center justify-between">
  <a
    href="/"
    class="text-md font-medium tracking-tight opacity-80 transition-opacity duration-150 hover:opacity-100"
  >
    pheralb.dev
  </a>
  <div class="flex items-center space-x-1">
    {#each SocialLinks as { name, url, icon }, i}
      <a
        href={url}
        title={name}
        target="_blank"
        rel="noopener noreferrer"
        class={buttonVariants({
          variant: 'ghost',
          size: 'icon',
          class: 'opacity-80 transition-opacity duration-150 hover:opacity-100'
        })}
      >
        <svelte:component this={icon} height={18} />
      </a>
    {/each}
    <ModdeToggle />
  </div>
</nav>
