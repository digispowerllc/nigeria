<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>I3 Hub API Platform – Empowering Local Innovation</title>
		<meta
			name="description"
			content="I3 Hub offers open, secure API access designed for developers solving real community problems. No signup needed. Fast, transparent, and impactful."
		/>
		<meta
			name="keywords"
			content="I3 Hub, API platform, local innovation, developer tools, open access APIs, live reporting, no signup API, community tech, Nigeria developer tools, open API"
		/>
		<meta name="author" content="I3 Hub Team" />
		<meta name="robots" content="index, follow" />
		<meta property="og:title" content="I3 Hub API Platform – Open Access. Empowered Communities." />
		<meta
			property="og:description"
			content="Use powerful APIs without signup barriers. Built for developers making a difference in their communities."
		/>
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://i3hub.example.com/" />
		<meta property="og:image" content="https://i3hub.example.com/thumbnail.png" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="I3 Hub API Platform – Built for Local Impact" />
		<meta
			name="twitter:description"
			content="Secure and open API access for developers. No credit card, no barriers—just innovation."
		/>
		<meta name="twitter:image" content="https://i3hub.example.com/twitter-card.png" />

		<link
			href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
			rel="stylesheet"
		/>
		<style>
			:root {
				--yellow: #facc15;
				--red: #ef4444;
				--blue: #3b82f6;
			}

			.fade-up {
				animation: fadeUp 1s ease-out forwards;
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

			.cta-btn {
				background-color: var(--red);
			}
			.cta-btn:hover {
				background-color: #dc2626;
			}
		</style>
	</head>

	<body class="bg-white text-gray-800">
		<!-- Hero Section -->
		<section
			class="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-white to-blue-50"
		>
			<img src="/logo.png" alt="I3 Hub Logo" class="h-20 mb-6 fade-up" />
			<h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-blue-600 fade-up">
				API Platform
			</h1>
			<p class="text-xl md:text-2xl text-gray-700 mb-6 fade-up max-w-2xl">
				Open Access. Empowered Communities. Innovation-Driven.
			</p>
			<a
				href="/docs"
				class="cta-btn text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg fade-up inline-flex items-center"
			>
				Read the Docs
			</a>
		</section>

		<!-- Features Section -->
		<section class="py-20 bg-white text-center">
			<div class="max-w-6xl mx-auto px-4">
				<h2 class="text-3xl font-bold mb-12 text-blue-600">Why Choose I3 APIs?</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
					<div class="fade-up">
						<h3 class="text-xl font-semibold text-yellow-500 mb-2">No Signup Barriers</h3>
						<p>Fast, secure access without onboarding headaches. Community-first always.</p>
					</div>
					<div class="fade-up">
						<h3 class="text-xl font-semibold text-yellow-500 mb-2">Built for Local Impact</h3>
						<p>
							Empowering developers to solve real problems within their communities—quickly and
							effectively.
						</p>
					</div>
					<div class="fade-up">
						<h3 class="text-xl font-semibold text-yellow-500 mb-2">Live Reporting</h3>
						<p>
							Capture and analyze data in real time for transparency, accessibility, and
							decision-making.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Call To Action -->
		<section class="py-20 bg-blue-50 text-center">
			<div class="max-w-4xl mx-auto px-6">
				<h2 class="text-4xl font-bold mb-4 text-blue-700">Get Started Instantly</h2>
				<p class="text-gray-700 text-lg mb-6">
					No credit card. No paywall. Just powerful API access from the start.
				</p>
				<a
					href="/explore"
					class="cta-btn text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg inline-flex items-center"
				>
					Start Exploring
				</a>
			</div>
		</section>

		<!-- Footer -->
		<footer class="bg-gray-100 text-center py-8 text-gray-600 text-sm">
			<p>&copy; <span id="year"></span> I3 Hub. All rights reserved.</p>
		</footer>

		<script>
			document.getElementById('year').textContent = new Date().getFullYear();
		</script>
	</body>
</html>
