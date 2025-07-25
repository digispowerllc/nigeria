<script lang="ts">
	import { onMount } from 'svelte';

	export let value = 0;
	export let max = 1000;
	export let label = '';
	export let color = '#3b82f6'; // blue-500
	export let duration = 1000;

	let progress = 0;
	const radius = 45;
	const stroke = 8;
	const normalizedRadius = radius - stroke * 0.5;
	const circumference = 2 * Math.PI * normalizedRadius;

	$: offset = circumference - (progress / max) * circumference;

	function animateProgress() {
		let start = 0;
		const step = duration / 60;
		const increment = value / (duration / step);

		const animation = setInterval(() => {
			start += increment;
			if (start >= value) {
				progress = value;
				clearInterval(animation);
			} else {
				progress = start;
			}
		}, step);
	}

	onMount(() => {
		animateProgress();
	});
</script>

<svg height="100" width="100" class="mx-auto">
	<circle
		stroke="#eee"
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
		fill="#333"
		font-size="16"
		font-weight="bold"
		dominant-baseline="middle"
	>
		{value.toLocaleString()}
	</text>
</svg>

<p class="mt-2 text-center text-sm text-gray-500">{label}</p>
