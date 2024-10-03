<script lang="ts">
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';

	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	//export let data: SuperValidated<Infer<FormSchema>>;
	let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onChange(event) {
			if (event.target) {
				// Form input event
				console.log(event.path, 'was changed with', event.target, 'in form', event.formElement);
			} else {
				// Programmatic event
				console.log('Fields updated:', event.paths);
			}
		},
		onSubmit: async ({ formData }) => {
			console.log('superForm::onSubmit');
			const enc = new TextEncoder();
			const dec = new TextDecoder();

			// Generate AES-GCM key
			const key = await window.crypto.subtle.generateKey(
				{
					name: 'AES-GCM',
					length: 256
				},
				true,
				['encrypt', 'decrypt']
			);
			console.log(`Key generated`, key);

			// Generate IV
			const iv = window.crypto.getRandomValues(new Uint8Array(12));
			console.log('iv', iv);

			// Encode secret
			const encoded = enc.encode(secret);

			// Encrypt the encoded secret
			const data = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);

			// Set formData
			//	Export the key & split it in half
			formData.set('keyPubPart', 'TODO');
			//	Encode the IV
			formData.set('iv', dec.decode(iv));
			//	Decode data
			formData.set('data', dec.decode(data));
		},
		onUpdate: () => {
			console.log('superForm::onUpdate');
		},
		onResult: ({ result, formElement }) => {
			console.log('superForm::onResult', result, formElement);
		},
		onError: (e) => {
			console.log('ERROR:', e);
		}
	});

	const { form: formData, enhance } = form;

	let secret = $state('');
	//$effect(() => {
	//	$formData.data = secret;
	//});
</script>

<form method="POST" action="?/new" use:enhance>
	<Form.Field {form} name="data">
		<Form.Control let:attrs>
			<Form.Label>Your secret</Form.Label>
			<Textarea
				{...attrs}
				placeholder="What's your secret?"
				class="resize-none"
				bind:value={secret}
			/>
			<Input {...attrs} bind:value={$formData.data} />
			<Input {...attrs} bind:value={$formData.keyPubPart} />
			<Input {...attrs} bind:value={$formData.iv} />
			<Form.Description>This is a sample description.</Form.Description>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
