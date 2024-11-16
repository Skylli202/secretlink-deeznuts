<script lang="ts">
	import Form from './form.svelte';

	let { data } = $props();
</script>

<div class="container mt-8 flex flex-col items-center">
	<Form data={data.form} />
</div>
