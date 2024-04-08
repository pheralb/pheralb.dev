<script lang="ts">
  // Styles:
  import '@/styles/globals.css';

  // Light/Dark mode:
  import { ModeWatcher } from 'mode-watcher';

  // Layout:
  import Header from '@/components/header.svelte';
</script>

<ModeWatcher />

<div class="relative flex min-h-screen flex-col py-10 md:pb-12">
  <Header />
  <main class="container max-w-4xl flex-1">
    <slot />
  </main>
</div>
