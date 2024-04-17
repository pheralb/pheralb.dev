<script lang="ts">
  import Button from '@/ui/button/button.svelte';

  import { Sun, Moon } from 'lucide-svelte';
  import { mode, toggleMode } from 'mode-watcher';

  export let iconSize = 20;
  export let strokeWidth = 1.8;
</script>

<Button
  on:click={toggleMode}
  title="Change theme"
  variant="ghost"
  size="icon"
  class="group opacity-80 transition-opacity duration-150 hover:opacity-100"
>
  {#if $mode === 'dark'}
    <Sun size={iconSize} {strokeWidth} class="duration-500 group-hover:rotate-12" />
  {:else}
    <Moon size={iconSize} {strokeWidth} class="duration-500 group-hover:-rotate-12" />
  {/if}
  <span class="sr-only">Toggle theme</span>
</Button>
