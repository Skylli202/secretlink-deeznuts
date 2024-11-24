<script lang="ts">
	import Form from './form.svelte';

	let { data } = $props();
</script>

<div class="m-auto flex w-4/5">
	<Form data={data.form} />
</div>
