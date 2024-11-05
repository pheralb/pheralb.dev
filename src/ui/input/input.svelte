<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { InputEvents } from './index.js';
  import { cn } from '@/utils';

  type $$Props = HTMLInputAttributes;
  type $$Events = InputEvents;

  

  interface Props {
    class?: $$Props['class'];
    value?: $$Props['value'];
    readonly?: $$Props['readonly'];
    [key: string]: any
  }

  let { class: className = undefined, value = $bindable(undefined), readonly = undefined, ...rest }: Props = $props();
</script>

<input
  class={cn(
    'flex h-9 w-full rounded-md border border-neutral-300 bg-transparent px-4 py-1 text-sm shadow-sm transition-colors duration-150 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:focus-visible:ring-neutral-700',
    className
  )}
  bind:value
  {readonly}
  onblur={bubble('blur')}
  onchange={bubble('change')}
  onclick={bubble('click')}
  onfocus={bubble('focus')}
  onfocusin={bubble('focusin')}
  onfocusout={bubble('focusout')}
  onkeydown={bubble('keydown')}
  onkeypress={bubble('keypress')}
  onkeyup={bubble('keyup')}
  onmouseover={bubble('mouseover')}
  onmouseenter={bubble('mouseenter')}
  onmouseleave={bubble('mouseleave')}
  onpaste={bubble('paste')}
  oninput={bubble('input')}
  onwheel={bubble('wheel')}
  {...rest}
/>
