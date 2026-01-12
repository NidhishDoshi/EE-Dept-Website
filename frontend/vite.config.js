import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		visualizer({
			filename: "dist/stats.html",
			open: true,
			gzipSize: true, // Show gzipped sizes
		}),
	],
	server: {
		host: '0.0.0.0', // Bind to all interfaces for external access
		port: 5173,
	},
	css: {
		transformer: "lightningcss",
	},
	build: {
		cssMinify: "lightningcss",
	},
});
