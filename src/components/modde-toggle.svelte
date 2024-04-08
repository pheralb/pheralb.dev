<script lang="ts">
  import Button from '@/ui/button/button.svelte';
  import * as Tooltip from '@/ui/tooltip';

  import { Sun, Moon } from 'lucide-svelte';
  import { mode, toggleMode } from 'mode-watcher';

  export let iconSize = 20;
  export let strokeWidth = 1.8;
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild let:builder>
    <Button
      on:click={toggleMode}
      builders={[builder]}
      variant="ghost"
      size="icon"
      class="opacity-80 transition-opacity duration-150 hover:opacity-100"
    >
      {#if $mode === 'dark'}
        <Sun size={iconSize} {strokeWidth} />
      {:else}
        <Moon size={iconSize} {strokeWidth} />
      {/if}
      <span class="sr-only">Toggle theme</span>
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="bottom">
    <p>Change theme</p>
  </Tooltip.Content>
</Tooltip.Root>
