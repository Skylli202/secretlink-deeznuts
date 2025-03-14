<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { Textarea } from '$lib/components/ui/textarea';
	import Button from '$lib/components/ui/button/button.svelte';
	import { ClipboardPen, Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { Skeleton } from '$lib/components/ui/skeleton';

	let { data }: { data: PageData } = $props();

	const priKeyPart = $page.url.hash.slice(1);
	const promise = async (): Promise<string> => {
		if (data.secret === null || data.secret === undefined) {
			console.dir(data);
			return Promise.reject('too bad');
		}
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

	// let textarea: HTMLTextAreaElement | undefined = $state();
	// let height = $derived(textarea ? textarea.scrollHeight : 0);
</script>

{#if $page.form?.deleted}
	<div class="container ml-[10%]">
		<h1>Success</h1>
		<p>Secret successfully deleted.</p>
	</div>
{:else}
	{#await promise()}
		<Skeleton class="h-[20px] max-w-[80%] justify-self-center" />
	{:then value}
		<div class="flex flex-col">
			<div class="m-auto w-full max-w-[80%] space-y-2">
				<Textarea
					class="h-fit resize-none focus:border-none focus-visible:ring-0 disabled:cursor-pointer"
					{value}
					disabled
				/>
				<div class="flex w-full flex-row gap-2">
					<Button
						type="button"
						class="flex-auto"
						onclick={() => {
							navigator.clipboard.writeText(value);
						}}
					>
						Copy
						<ClipboardPen class="ml-2"></ClipboardPen>
					</Button>
					<form method="POST" class="flex w-3/12 flex-col" use:enhance>
						<input name="secretId" type="text" value={$page.params.id} hidden />
						<Button variant="destructive" type="submit">
							<Trash2 />
						</Button>
					</form>
				</div>
			</div>
		</div>
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
{/if}
