import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8084', // use IPv4 to avoid ::1 issues
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // keep /api prefix; remove if backend doesn't need it
        configure: (proxy) => {
          proxy.on('proxyReq', (req) => console.log('[Proxy] Requesting:', req.path));
          proxy.on('proxyRes', (res, req) =>
            console.log('[Proxy] Response from backend:', req.path, res.statusCode)
          );
          proxy.on('error', (err, req) =>
            console.error('[Proxy] Error on request', req.path, err)
          );
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
