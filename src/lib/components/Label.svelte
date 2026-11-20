<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	type Props = HTMLLabelAttributes & {
		children?: Snippet;
	};
	let { children, ...props }: Props = $props();
</script>

<label class="flex flex-col gap-1 text-sm text-gray-700" {...props}>
	{@render children?.()}
</label>
