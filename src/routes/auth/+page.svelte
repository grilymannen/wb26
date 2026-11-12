<script lang="ts">
	import { signup, login } from './remote';
	import { ArrowLeftRightIcon } from '@lucide/svelte';
	import { Button, Card, Input, Label, Auth } from '#lib/components.ts';

	let signingup = $state(true);

	let { name: nameS, pass: passS } = signup.fields;
	let { name: nameL, pass: passL } = login.fields;

	const signupFields = [
		{ label: 'Username', props: () => nameS.as('text') },
		{ label: 'Password', props: () => passS.as('password') }
	];
	const loginFields = [
		{ label: 'Username', props: () => nameL.as('text') },
		{ label: 'Password', props: () => passL.as('password') }
	];
</script>

<Card>
	<div class="relative h-75 overflow-hidden text-nowrap">
		{#if signingup}
			<Auth title="Sign up" dir={-1}>
				{#each signupFields as { label, props } (label)}
					<Label {label}>
						<Input {...props()} />
					</Label>
				{/each}
			</Auth>
		{:else}
			<Auth title="Log in" dir={1}>
				{#each loginFields as { label, props } (label)}
					<Label {label}>
						<Input {...props()} />
					</Label>
				{/each}
				
			</Auth>
		{/if}
	</div>

	<div>
		<Button type="submit" form={signingup ? 'Sign up' : 'Log in'}>
			<div class="flex items-center gap-2">
				{signingup ? 'Sign up' : 'Log in'}
			</div>
		</Button>
		<Button onclick={() => (signingup = !signingup)} variant="secondary">
			<div class="flex items-center gap-2">
				{!signingup ? 'Sign up' : 'Log in'} instead?
				<ArrowLeftRightIcon size={20} />
			</div>
		</Button>
	</div>
</Card>
