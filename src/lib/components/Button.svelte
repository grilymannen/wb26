<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type VariantType = 'primary' | 'secondary' | 'outline' | 'ghost' | 'pill';

	type Props = Omit<HTMLButtonAttributes, 'class'> & {
		children?: Snippet;
		variant?: VariantType;
		class?: string;
	};

	let {
		children,
		variant = 'primary',
		class: className = '',
		type = 'button',
		...rest
	}: Props = $props();

	const styles: Record<VariantType, string> = {
		primary: 'bg-neutral-900 text-white px-4 py-2 rounded-md',
		secondary: 'bg-neutral-100 text-neutral-900 px-4 py-2 rounded-md',
		outline: 'border border-neutral-300 px-4 py-2 rounded-md',
		ghost: 'text-neutral-900 px-4 py-2 rounded-md',
		pill: 'bg-neutral-200 text-neutral-900 px-4 py-2 rounded-full'
	};
</script>

<button
	{...rest}
	{type}
	class="cursor-pointer disabled:cursor-not-allowed {styles[variant]} {className}"
>
	<div class="flex items-center gap-2">
		{@render children?.()}
	</div>
</button>
