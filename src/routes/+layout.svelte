<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import { Page, Button } from '#lib/components.ts';
	import { Home, Lock, MessageCircle, User } from '@lucide/svelte';

	let { children, data }: LayoutProps = $props();
	let user = $derived(data.user);
</script>

<nav class="p-2 flex gap-2">
  <a href="/">
    <Button variant="secondary">
      <Home />
    </Button>    
  </a>
  <a href="/app">
    <Button variant="secondary">
      <MessageCircle />
    </Button>
  </a>
  <a href="/auth">
    <Button variant="secondary">
      <Lock />
    </Button>
  </a>
	<Button variant="secondary" onclick={() => console.log(data.user)}>
		<User />
		{#if user}
			Logged in as: <span class="font-semibold">{user.name}</span>
		{:else}
			Not logged in
		{/if}
	</Button>
</nav>
<Page>
	{@render children()}
</Page>
