<script>
	import * as Card from '$lib/components/ui/card';
</script>

<div class="space-y-2">
	<Card.Root>
		<Card.Content class="space-y-4">
			<Card.Title tag="h1">About the app</Card.Title>
			<Card.Description>
				<p>
					This web application is built with <a
						class="underline hover:text-blue-600 dark:hover:text-blue-400"
						href="https://svelte.dev">SvelteKit</a
					>. Its source code is publicly available on
					<a
						class="underline hover:text-blue-600 dark:hover:text-blue-400"
						href="https://github.com/Skylli202/secretlink-deeznuts">GitHub</a
					>. Feel free to raise an issue over there, or shoot me an email, if you have any bugs, or
					have any feature request.
				</p>
			</Card.Description>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Content class="space-y-4">
			<Card.Title tag="h1">How does it works</Card.Title>
			<Card.Description class="space-y-2">
				<p>
					Your secret is encrypted by your browser prior to be sent to the server. It does it using
					the AES-GCM-256 algorithm. The browser generate a new key for each new secret submitted.
					It split it in half and send only one half to the server.
				</p>

				<p>
					The server will store the encrypted secret alongside the partial key and the amount of
					view the secret can be viewed.
				</p>

				<p>
					Once the client receive the confirmation from the server that the secret has properly
					being stored. It shares the link, appending it with the secret part that is not sent to
					the server.
				</p>

				<p>
					A secret can only be retrieved and viewed if the link to access it contain that second
					part of the key that was not sent to the server. Only you, who created the secret, can
					share this unique link to your recipient.
				</p>
			</Card.Description>
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Content class="space-y-4">
			<Card.Title tag="h1">About me</Card.Title>
			<Card.Description class="space-y-2">
				<p>
					My name is Elouan GOUINGUENET. I'm a French software engineer now living in North america.
					I've been building all sort of application for the past few years using many programming
					languages and frameworks.
				</p>
				<p>
					I always like cryptography and wanted to explore it to have a better understanding of it,
					so I build this webapp. I also was never really sure what the back-end of similar app were
					doing with the data sent, so I build my own!
				</p>
			</Card.Description>
		</Card.Content>
	</Card.Root>
</div>
