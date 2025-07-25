import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		host: true, // or use a specific IP like '192.168.0.14'
		port: 5173, // optional
	},
	plugins: [tailwindcss(), sveltekit()]
});
