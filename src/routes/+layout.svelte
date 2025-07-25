<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>I3 Hub API Platform</title>
	<meta name="description" content="Open Access. Empowered Communities. Innovation-Driven." />
	<link rel="icon" href="/favicon.ico" />
	<!-- <link rel="stylesheet" href="/global.css" /> -->
</svelte:head>

{@render children()}
