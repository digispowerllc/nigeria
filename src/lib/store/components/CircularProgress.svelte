<script lang="ts">
	import { onMount } from 'svelte';
	import { tick } from 'svelte';

	export let value: number | null = null;
	export let label = '';
	export let color = '#3b82f6';
	export let duration = 1000;

	let progress = 0;
	const radius = 45;
	const stroke = 8;
	const normalizedRadius = radius - stroke * 0.5;
	const circumference = 2 * Math.PI * normalizedRadius;

	// Smart max and animation offset
	$: max = value !== null ? getSmartMax(value) : 100;
	$: offset = circumference - (progress / max) * circumference;

	function animateProgress() {
		if (value === null) return;
		let start = 0;
		const step = duration / 60;
		const increment = value / (duration / step);

		const interval = setInterval(() => {
			start += increment;
			if (start >= value) {
				progress = value;
				clearInterval(interval);
			} else {
				progress = start;
			}
		}, step);
	}

	function getSmartMax(val: number): number {
		const base = [
			10, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000,
			2500000, 5000000, 10000000, 25000000, 50000000, 100000000, 250000000, 500000000, 1000000000
		];
		for (const b of base) {
			if (val < b) return b;
		}
		return Math.pow(10, Math.ceil(Math.log10(val)));
	}

	function formatNumber(val: number): string {
		if (val >= 100000) return `${val}+`;
		return `${val}`;
	}

	onMount(async () => {
		await tick();
		if (value !== null) animateProgress();
	});
</script>

{#if value === null}
	<!-- Fallback Spinner -->
	<div class="flex h-[100px] items-center justify-center">
		<svg class="h-8 w-8 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
			></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			></path>
		</svg>
	</div>
{:else}
	<!-- Progress Circle -->
	<svg height="100" width="100" class="mx-auto block">
		<circle
			stroke="#e5e7eb"
			fill="transparent"
			stroke-width={stroke}
			r={normalizedRadius}
			cx="50"
			cy="50"
		/>
		<circle
			stroke={color}
			fill="transparent"
			stroke-width={stroke}
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={offset}
			r={normalizedRadius}
			cx="50"
			cy="50"
			style="transition: stroke-dashoffset 0.5s ease"
		/>
		<text
			x="50%"
			y="52%"
			text-anchor="middle"
			fill="#111827"
			font-size="16"
			font-weight="bold"
			dominant-baseline="middle"
		>
			{formatNumber(value)}
		</text>
	</svg>
{/if}

<p class="mt-2 text-center text-sm text-gray-600">{label}</p>

<style>
	svg {
		display: block;
		margin: auto;
	}
	.animate-spin {
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
