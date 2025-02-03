<script lang="ts">
  import type { IconProps } from '@/types/icons.type';

  let { width = 24, height = 24, styles = '' }: IconProps = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {width} {height} class={styles}>
  <path fill="none" d="M0 0h256v256H0z" />
  <path
    fill="none"
    stroke="currentColor"
    stroke-width="25"
    stroke-linecap="round"
    d="M208 128l-80 80M192 40L40 192"
  />
</svg>
