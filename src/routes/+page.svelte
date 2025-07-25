<script>
	import { onMount } from 'svelte';
	let year = new Date().getFullYear();
</script>

<!-- Hero Section -->
<section
	class="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 bg-white"
>
	<img src="/logo.png" alt="I3 Hub Logo" class="h-16 sm:h-20 mb-6 fade-up" />
	<h1 class="text-3xl sm:text-5xl font-extrabold text-blue-600 leading-tight mb-4 fade-up">
		API Platform
	</h1>
	<p class="text-base sm:text-xl text-gray-700 mb-6 fade-up max-w-md sm:max-w-2xl">
		Open Access. Empowered Communities. Innovation-Driven.
	</p>
	<a
		href="/docs"
		class="cta-btn text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition shadow-lg fade-up inline-flex items-center"
	>
		Read the Docs
	</a>
</section>

<!-- Features Section -->
<section class="py-16 sm:py-20 bg-white text-center">
	<div class="max-w-6xl mx-auto px-4">
		<h2 class="text-2xl sm:text-3xl font-bold mb-10 text-blue-600">Why Choose I3 APIs?</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
			<div class="fade-up">
				<h3 class="text-lg font-semibold text-yellow-500 mb-2">No Signup Barriers</h3>
				<p class="text-sm sm:text-base">
					Fast, secure access without onboarding headaches. Community-first always.
				</p>
			</div>
			<div class="fade-up">
				<h3 class="text-lg font-semibold text-yellow-500 mb-2">Built for Local Impact</h3>
				<p class="text-sm sm:text-base">
					Empowering developers to solve real problems in their communities—effectively.
				</p>
			</div>
			<div class="fade-up">
				<h3 class="text-lg font-semibold text-yellow-500 mb-2">Live Reporting</h3>
				<p class="text-sm sm:text-base">
					Capture and analyze data in real time for transparency and accessibility.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Call To Action -->
<section class="py-16 sm:py-20 bg-blue-50 text-center">
	<div class="max-w-xl mx-auto px-4 sm:px-6">
		<h2 class="text-2xl sm:text-4xl font-bold mb-4 text-blue-700">Get Started Instantly</h2>
		<p class="text-gray-700 text-base sm:text-lg mb-6">
			No credit card. No paywall. Just powerful API access from the start.
		</p>
		<a
			href="/explore"
			class="cta-btn text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold transition shadow-lg inline-flex items-center"
		>
			Start Exploring
		</a>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-100 text-center py-6 text-sm text-gray-600">
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
