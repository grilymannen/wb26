<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import Page from '#lib/components/Page.svelte';

	let { children, data }: LayoutProps = $props();
</script>

<Page>
	{@render children()}
</Page>
