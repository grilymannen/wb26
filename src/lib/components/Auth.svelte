<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		title,
		dir,
		children
	}: {
		title: string;
		dir: 1 | -1;
		children: Snippet;
	} = $props();
</script>

<div
	class="absolute w-full {dir === -1 ? 'left-0' : 'right-0'}"
	in:slide={{ axis: 'x' }}
	out:fly={{ x: dir * 700, opacity: 1 }}
>
	<h2 class="mb-4 text-xl font-semibold">{title}</h2>
	{@render children()}
</div>
