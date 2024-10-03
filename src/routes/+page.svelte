<script lang="ts">
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import SuperDebug from 'sveltekit-superforms';
	import Form from './form.svelte';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();
	let secret = $state('');
</script>

<div class="container mt-8">
	<div class="">
		<Form data={data.form} />
	</div>
</div>
