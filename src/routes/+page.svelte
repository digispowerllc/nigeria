<script>
	import { onMount } from 'svelte';
	import CircularProgress from '$lib/store/components/CircularProgress.svelte';

	let year = new Date().getFullYear();

	export let stateCalls = 0;
	export let lgaCalls = 0;
	export let puCalls = 0;
	export let wardCalls = 0;

	async function fetchStats() {
		try {
			const res = await fetch('/api/v1/stats');
			const data = await res.json();
			stateCalls = data.stateCalls || 0;
			lgaCalls = data.lgaCalls || 0;
			puCalls = data.puCalls || 0;
			wardCalls = data.wardCalls || 0;
		} catch (err) {
			console.error('Stats fetch error:', err);

			// Simulated fallback random values (for development/demo)
			stateCalls = 5000 + Math.floor(Math.random() * 500); // 5000–5500
			lgaCalls = 40000 + Math.floor(Math.random() * 2000); // 40000–42000
			puCalls = 100000 + Math.floor(Math.random() * 10000); // 100000–110000
			wardCalls = 15000 + Math.floor(Math.random() * 3000); // 15000–18000
		}
	}

	onMount(() => {
		fetchStats(); // initial fetch
		const interval = setInterval(fetchStats, 5000); // refresh every 3 sec
		return () => clearInterval(interval);
	});
</script>

<head>
	<title>I3 Hub API Platform</title>
	<meta name="description" content="Open Access. Empowered Communities. Innovation-Driven." />
	<link rel="icon" href="/favicon.ico" />
	<!-- <link rel="stylesheet" href="/global.css" /> -->
</head>

<!-- Hero Section -->
<section
	class="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center sm:px-6"
>
	<img src="/logo.png" alt="I3 Hub Logo" class="fade-up mb-20 h-16 sm:h-20" />
	<h1 class="fade-up mb-8 text-3xl font-extrabold text-gray-500 sm:text-4xl">API Platform</h1>
	<p class="fade-up mb-6 max-w-md text-base text-gray-700 sm:max-w-2xl sm:text-xl">
		Open Access. Empowered Communities. Innovation-Driven.
	</p>
	<a
		href="/docs"
		class="cta-btn fade-up inline-flex items-center rounded-lg px-5 py-2 font-semibold text-white shadow-lg transition sm:px-6 sm:py-3"
	>
		Read the Docs
	</a>
</section>

<!-- API Call Stats Section -->
<section class="bg-white py-20 text-center text-gray-500">
	<h2 class="fade-up mb-8 text-3xl font-extrabold text-gray-500 sm:text-4xl">APIs in Number</h2>
	<div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
		<div
			class="fade-up transform rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105"
		>
			<CircularProgress value={stateCalls} label="States Endpoint" color="#2563eb" />
		</div>
		<div
			class="fade-up transform rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105"
		>
			<CircularProgress value={lgaCalls} label="LGA Endpoint" color="#16a34a" />
		</div>
		<div
			class="fade-up transform rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105"
		>
			<CircularProgress value={puCalls} label="Polling Units" color="#dc2626" />
		</div>
		<div
			class="fade-up transform rounded-xl bg-white p-6 shadow-lg transition duration-300 hover:scale-105"
		>
			<CircularProgress value={wardCalls} label="Wards Endpoint" color="#9333ea" />
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="select:none mt-28 bg-white py-16 text-center text-gray-500 sm:py-20">
	<div class="mx-auto max-w-6xl px-4">
		<h2 class="fade-up mb-8 text-3xl font-extrabold text-gray-500 sm:text-4xl">
			Why Choose I3 APIs?
		</h2>
		<div class="grid grid-cols-1 gap-8 text-left sm:grid-cols-2 md:grid-cols-3">
			<div class="fade-up">
				<h3 class="mb-2 text-lg font-semibold text-yellow-500">No Signup Barriers</h3>
				<p class="text-sm sm:text-base">
					Fast, secure access without onboarding headaches. Community-first always.
				</p>
			</div>
			<div class="fade-up">
				<h3 class="mb-2 text-lg font-semibold text-yellow-500">Built for Local Impact</h3>
				<p class="text-sm sm:text-base">
					Empowering developers to solve real problems in their communities—effectively.
				</p>
			</div>
			<div class="fade-up">
				<h3 class="mb-2 text-lg font-semibold text-yellow-500">Live Reporting</h3>
				<p class="text-sm sm:text-base">
					Capture and analyze data in real time for transparency and accessibility.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Call To Action -->
<section class="bg-gray-50 py-16 text-center sm:py-20">
	<div class="mx-auto max-w-xl px-4 sm:px-6">
		<h2 class="fade-up mb-8 text-3xl font-extrabold text-gray-500 sm:text-4xl">
			Get Started Instantly
		</h2>
		<p class="mb-6 text-base text-gray-700 sm:text-lg">
			No credit card. No paywall. Just powerful API access from the start.
		</p>
		<a
			href="/explore"
			class="cta-btn inline-flex items-center rounded-lg px-5 py-2 font-semibold text-white shadow-lg transition sm:px-6 sm:py-3"
		>
			Start Exploring
		</a>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-100 py-6 text-center text-sm text-gray-600">
	<p>&copy; {year} I3 Hub. All rights reserved.</p>
</footer>

<style>
	:global(:root) {
		--yellow: #facc15;
		--red: #ef4444;
		--blue: #3b82f6;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-up {
		animation: fadeUp 0.8s ease-out;
	}

	.cta-btn {
		background-color: var(--red);
	}

	.cta-btn:hover {
		background-color: #dc2626;
	}
</style>
