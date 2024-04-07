<script lang="ts">
  // Styles:
  import '@/styles/globals.css';

  // Light/Dark mode:
  import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<slot />
