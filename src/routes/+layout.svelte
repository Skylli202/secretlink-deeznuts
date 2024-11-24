<script>
	import { ModeWatcher, toggleMode, resetMode, setMode, mode } from 'mode-watcher';
	import '../app.css';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon } from 'lucide-svelte';
</script>

<ModeWatcher defaultMode={'dark'} />
<nav class="mb-8 mt-4 flex flex-row items-center justify-between space-x-4 px-4 lg:space-x-6">
	<div class=""></div>
	<div class="flex flex-grow justify-center space-x-4">
		<a href="/">Secret-DeezNuts</a>
		<a href="/about">About</a>
	</div>
	<Button onclick={toggleMode} variant="ghost">
		<Sun
			class="dark:-roate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
	</Button>
</nav>
<div class="container">
	<slot />
</div>
