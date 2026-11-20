<script lang="ts">
	import './layout.css';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/light-border.css';
	import tippy from 'tippy.js';
	import { goto } from '$app/navigation';
	import type { LayoutProps } from './$types';
	import type { Attachment } from 'svelte/attachments';

	function tooltip(content: string): Attachment {
		return (element) => {
			const tooltip = tippy(element, { content, theme: 'light-border' });
			return tooltip.destroy;
		};
	}

	import { Page, Button } from '#lib/components.ts';
	import { House, Lock, LogOut, MessageCircle, User } from '@lucide/svelte';
	import { logout } from './remote';

	let { children, data }: LayoutProps = $props();
	let user = $derived(data.user);
</script>

<nav class="flex gap-2 p-2">
	<a href="/" {@attach tooltip('Home')}>
		<Button variant="secondary">
			<House />
		</Button>
	</a>
	<a href="/app" {@attach tooltip('App')}>
		<Button variant="secondary">
			<MessageCircle />
		</Button>
	</a>
	<a href="/auth" {@attach tooltip('Auth')}>
		<Button variant="secondary">
			<Lock />
		</Button>
	</a>
	<Button variant="secondary" onclick={() => console.log(data.user)} {@attach tooltip('Log user')}>
		<User />
		{#if user}
			Logged in as: <span class="font-semibold">{user.name}</span>
		{:else}
			Not logged in
		{/if}
	</Button>
	<Button
		variant="secondary"
		{@attach tooltip('Log out')}
		onclick={async () => {
			await logout();
			goto('/auth');
		}}
	>
		<LogOut />
	</Button>
</nav>
<Page>
	{@render children()}
</Page>
