<script lang="ts">
	import { signup, login } from './remote';
	import { ArrowLeftRightIcon } from '@lucide/svelte';
	import { Button, Card, Input, Label } from '#lib/components.ts';
	import { fly } from 'svelte/transition';
	let signingup = $state(true);
	
	const toggle = () => (signingup = !signingup)
</script>

{#snippet authForm(action: typeof signup, title: string, other: string)}
	<form {...action}>
		<h2 class="font-semibold text-xl mb-2">{title}</h2>

		<Label label="Username"><Input {...action.fields.name.as('text')} /></Label>
		<Label label="Password"><Input {...action.fields.pass.as('password')} /></Label>

		{#if action.result}
			<p class:text-red-500={!action.result.success}>{action.result.message}</p>
		{/if}
		{#each action.fields.allIssues() ?? [] as issue}
			<p>{issue.message}</p>
		{/each}

		<div>
			<Button type="submit" disabled={!!action.pending}>{title}</Button>
			<Button type="button" variant="secondary" onclick={toggle}>
				<div class="flex items-center gap-2">
					{other} instead? <ArrowLeftRightIcon size={20} />
				</div>
			</Button>
		</div>
	</form>
{/snippet}

<Card>
	<div class="relative h-75 overflow-hidden text-nowrap">
		{#if signingup}
		  <div class="absolute inset-0" transition:fly={{ x: 300 }}>
		    {@render authForm(signup, "Sign up", "Log in")}
			</div>
		{:else}
  		<div class="absolute inset-0" transition:fly={{ x: -300 }}>
  			{@render authForm(login, "Log in", "Sign up")}
  		</div>
		{/if}
	</div>
</Card>