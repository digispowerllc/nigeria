<!-- src/routes/test-db-->
<script lang="ts">
	export let data: {
		status: string;
		timestamp?: string;
		message?: string;
	};
</script>

<section class="mx-auto max-w-xl rounded bg-white p-6 text-center shadow">
	<h1 class="mb-4 text-2xl font-bold">Database Connection Test</h1>

	{#if data.status === 'connected'}
		<p class="font-semibold text-green-600">✅ Connected successfully!</p>
		<p class="mt-2">Server time: <strong>{data.timestamp}</strong></p>
	{:else}
		<p class="font-semibold text-red-600">❌ Connection failed</p>
		<p class="mt-2 text-sm text-gray-500">{data.message}</p>
	{/if}
</section>
