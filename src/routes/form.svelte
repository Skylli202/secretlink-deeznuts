<script lang="ts">
	import { page } from '$app/stores';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { formSchema, type FormSchema } from './schema';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { ClipboardPen, Minus, Plus } from 'lucide-svelte';

	let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

	// svelte-ignore non_reactive_update
	let keyPriPart = '';
	const form = superForm(data, {
		validators: zodClient(formSchema),
		// onChange(event) {
		// 	if (event.target) {
		// 		// Form input event
		// 		console.log(event.path, 'was changed with', event.target, 'in form', event.formElement);
		// 	} else {
		// 		// Programmatic event
		// 		console.log('Fields updated:', event.paths);
		// 	}
		// },
		onSubmit: async (input) => {
			// console.log('superForm::onSubmit');
			const encoder = new TextEncoder();

			// Generate AES-GCM key
			const key = await window.crypto.subtle.generateKey(
				{
					name: 'AES-GCM',
					length: 256
				},
				true,
				['encrypt', 'decrypt']
			);

			// Generate IV
			const iv = window.crypto.getRandomValues(new Uint8Array(12));

			// Encode secret
			const encoded = encoder.encode(secret);

			// Encrypt the encoded secret
			const data = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

			// Set formData
			//	Export the key & split it in half
			const exportedKey = await window.crypto.subtle.exportKey('raw', key);
			const b64ExportedKey = btoa(
				Array.from(new Uint8Array(exportedKey), (byte) => String.fromCharCode(byte)).join('')
			);
			const keyPubPart = b64ExportedKey.slice(0, 22);
			keyPriPart = b64ExportedKey.slice(22);
			// console.dir({ b64ExportedKey, keyPubPart, keyPriPart });

			input.formData.set('keyPubPart', keyPubPart);
			//	Encode the IV
			input.formData.set('iv', btoa(Array.from(iv, (byte) => String.fromCharCode(byte)).join('')));
			//	Decode data
			input.formData.set(
				'data',
				btoa(Array.from(new Uint8Array(data), (byte) => String.fromCharCode(byte)).join(''))
			);
			input.formData.set('maxViewCount', $formData.maxViewCount.toString());

			// console.log(input.formData.has('maxViewCount'), input.formData.get('maxViewCount'));
			// console.dir(input.formData.entries().toArray());
			// console.dir({ key, iv, data });
		}
	});

	const { form: formData, enhance, message } = form;

	let secret = $state('');
	let secretURL = $derived(
		`${$page.url.protocol}//${$page.url.host}/secrets/${$message?.secretId}#${keyPriPart}`
	);
</script>

{#if $message}
	<form class="flex w-full items-center space-x-0">
		<Input
			type="text"
			class="rounded-r-none focus-visible:ring-0 disabled:cursor-pointer"
			value={secretURL}
			disabled
			readonly
		/>
		<Button
			type="button"
			class="rounded-l-none"
			onclick={() => {
				navigator.clipboard.writeText(secretURL);
			}}
		>
			Copy
			<ClipboardPen class="ml-2"></ClipboardPen>
		</Button>
	</form>
{:else}
	<form method="POST" action="?/new" class="flex w-full flex-col space-y-6" use:enhance>
		<Form.Field {form} name="data">
			<Form.Control let:attrs>
				<Form.Label>Enter your secret</Form.Label>
				<Textarea {...attrs} class="resize-none" bind:value={secret} />
				<Form.Description>Enter a secret here like a password.</Form.Description>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="maxViewCount">
			<Form.Control let:attrs>
				<Form.Label>
					Expire secret after <span class="font-semibold">{$formData.maxViewCount}</span>
					view{$formData.maxViewCount > 1 ? '' : 's'}
				</Form.Label>
				<Input {...attrs} bind:value={$formData.maxViewCount} type="number" class="hidden" />
				<div class="flex flex-row justify-center gap-24">
					<Button
						class="w-32"
						onclick={() => {
							$formData.maxViewCount++;
						}}
					>
						<Plus />
					</Button>
					<Button
						class="w-32"
						onclick={() => {
							$formData.maxViewCount--;
						}}
						disabled={$formData.maxViewCount === 1}
					>
						<Minus />
					</Button>
				</div>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button class="mt-auto">Generate link</Form.Button>
	</form>
{/if}
