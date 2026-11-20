<script lang="ts">
	import { Button, Card, Input } from '#lib/components.ts';
	import type { PageProps } from './$types';
	import { createMessage, getForum, getMessages } from './remote';

	let { params, data }: PageProps = $props();
	let forum = $derived(await getForum(params.id));
</script>

<Card>
	{#if forum}
		<h1 class="text-xl font-semibold">{forum.text}</h1>
		<p>ID: <span class="text-gray-600">{params.id}</span></p>
		<a href="/app" class="underline">Back to app</a>
		<div class="flex flex-col gap-4 p-4">
			{#each await getMessages(params.id) as message}
				<div class="rounded border border-gray-300 p-2">
					{message.user?.name ?? 'User'} at {message.created_at}
					<p>{message.text}</p>
				</div>
			{:else}
				<p>No messages yet :(</p>
			{/each}
		</div>
		<form {...createMessage}>
			{let { text, forumid, userid } = createMessage.fields}
			<div class="flex gap-2">
				<Input class="flex-1" placeholder="Post to '{forum.text}'" {...text.as('text')} />
				<Button type="submit">Send</Button>
				<input {...forumid.as('hidden', params.id)} />
				<input {...userid.as('hidden', data.user!.id)} />
			</div>
		</form>
	{/if}
</Card>
