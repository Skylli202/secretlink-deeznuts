<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	let { data }: { data: PageData } = $props();

	const priKeyPart = $page.url.hash.slice(1);
	const promise = async (): Promise<string> => {
		console.log(1, data, priKeyPart);
		// Decode shit
		const rawKey = new Uint8Array(
			[...atob(data.secret.keyPubPart + priKeyPart)].map((char) => char.charCodeAt(0))
		);
		const iv = new Uint8Array([...atob(data.secret.iv)].map((char) => char.charCodeAt(0)));
		const _data = new Uint8Array([...atob(data.secret.data)].map((char) => char.charCodeAt(0)));

		const key = await window.crypto.subtle.importKey(
			'raw',
			rawKey,
			{
				name: 'AES-GCM',
				length: 256
			},
			true,
			['decrypt']
		);

		const decoder = new TextDecoder();
		const secret = decoder.decode(
			await window.crypto.subtle.decrypt(
				{
					name: 'AES-GCM',
					iv
				},
				key,
				_data
			)
		);

		return secret;
	};
</script>

{#if !priKeyPart}
	<div>Your link is incomplete :(</div>
	<div>Unable to decypher :(</div>
{:else}
	{#await promise()}
		<!-- promise is pending -->
		<p>waiting for the promise to resolve...</p>
	{:then value}
		<!-- promise was fulfilled or not a Promise -->
		<p>The value is {value}</p>
	{:catch error}
		<!-- promise was rejected -->
		<p>Something went wrong: {error.message}</p>
	{/await}
{/if}
