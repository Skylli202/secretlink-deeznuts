<script lang="ts">
	import Form from './form.svelte';

	let { data } = $props();
</script>

<div class="container mt-8">
	<Form data={data.form} />
</div>
