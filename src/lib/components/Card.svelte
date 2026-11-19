<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";
  
	let { children, class: className = '' }: SvelteHTMLElements['div'] = $props();
</script>

<div class={`rounded-md border border-gray-300 p-4 ${className}`}>
	{@render children?.()}
</div>
