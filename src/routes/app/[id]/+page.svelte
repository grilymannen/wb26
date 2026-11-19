<script lang="ts">
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();
</script>

<p>Room</p>
<p>ID: {params.id}</p>
<a href="/app" class="underline">Back to app</a>
