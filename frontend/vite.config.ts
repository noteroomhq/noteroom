import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@contexts": path.resolve(__dirname, "src/contexts"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@stypes": path.resolve(__dirname, "src/types"),
			"@images": path.resolve(__dirname, "src/assets/images"),
			"@shared-types": path.resolve(__dirname, "../types"),
		}
	},
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        }
    }
});
