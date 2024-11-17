<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import SuperDebug from 'sveltekit-superforms';
</script>

<div class="container">
	{#if $page.status === 404}
		<Card.Root>
			<Card.Header>
				<Card.Title>Secret not found</Card.Title>
				<Card.Description
					>Your secret is probably already deleted (most likely view count reached or expire date).</Card.Description
				>
			</Card.Header>
			<Card.Content>
				<Button variant="link">
					<a href="/"> Go back to the home page </a>
				</Button>
			</Card.Content>
		</Card.Root>
	{:else}
		<div></div>
	{/if}
</div>

