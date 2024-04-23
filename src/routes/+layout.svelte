<script lang="ts">
  // Styles:
  import '@/styles/globals.css';

  // Light/Dark mode:
  import { ModeWatcher } from 'mode-watcher';

  // Layout:
  import Header from '@/components/header.svelte';

  // Current year:
  const currentYear = new Date().getFullYear();
</script>

<ModeWatcher />

<main class="relative flex min-h-screen flex-col py-4 md:py-6">
  <Header />
  <div class="container max-w-4xl flex-1">
    <slot />
  </div>
  <footer class="container mt-10 flex max-w-4xl items-center justify-between">
    <p class="font-gambarino">✨ Building amazing things</p>
    <div class="flex items-center space-x-1">
      <h2>Pablo Hernández</h2>
      <span class="text-gray-500 dark:text-gray-400">-</span>
      <p>{currentYear}</p>
    </div>
  </footer>
</main>
