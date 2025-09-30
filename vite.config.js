// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react-swc";
// // import path from "path";
// // import { componentTagger } from "lovable-tagger";

// // export default defineConfig(({ mode }) => ({
// //   server: {
// //     host: "0.0.0.0",
// //     port: 8081,
// //     proxy: {
// //       '/api': {
// //         target: 'http://127.0.0.1:8084', // use IPv4 to avoid ::1 issues
// //         changeOrigin: true,
// //         secure: false,
// //         rewrite: (path) => path, // keep /api prefix; remove if backend doesn't need it
// //         configure: (proxy) => {
// //           proxy.on('proxyReq', (req) => console.log('[Proxy] Requesting:', req.path));
// //           proxy.on('proxyRes', (res, req) =>
// //             console.log('[Proxy] Response from backend:', req.path, res.statusCode)
// //           );
// //           proxy.on('error', (err, req) =>
// //             console.error('[Proxy] Error on request', req.path, err)
// //           );
// //         },
// //       },
// //     },
// //   },
// //   plugins: [
// //     react(),
// //     mode === 'development' && componentTagger(),
// //   ].filter(Boolean),
// //   resolve: {
// //     alias: {
// //       "@": path.resolve(__dirname, "./src"),
// //     },
// //   },
// // })); 







import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8081,
    proxy: {
      // Specific Bulk Sync API → hit 8085
      "/api/v1/repo-itpedia/bulk-sync": {
        target: "http://127.0.0.1:8085",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, ""), // remove /api/v1 for backend
        configure: (proxy) => {
          proxy.on("proxyReq", (req) =>
            console.log("[Proxy-8085] Requesting:", req.method, req.path)
          );
          proxy.on("proxyRes", (res, req) =>
            console.log("[Proxy-8085] Response:", req.path, res.statusCode)
          );
          proxy.on("error", (err, req, res) =>
            console.error("[Proxy-8085] Error:", err)
          );
        },
      },

      // Special APIs → hit 8085
      "/abacus": {
        target: "http://127.0.0.1:8085",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // keep path as-is
        configure: (proxy) => {
          proxy.on("proxyReq", (req) =>
            console.log("[Proxy-8085] Requesting:", req.method, req.path)
          );
          proxy.on("proxyRes", (res, req) =>
            console.log("[Proxy-8085] Response:", req.path, res.statusCode)
          );
          proxy.on("error", (err, req, res) =>
            console.error("[Proxy-8085] Error:", err)
          );
        },
      },

      // Normal APIs → default backend (8084)
      "/api": {
        target: "http://127.0.0.1:8084",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // keep /api prefix
        configure: (proxy) => {
          proxy.on("proxyReq", (req) =>
            console.log("[Proxy-8084] Requesting:", req.method, req.path)
          );
          proxy.on("proxyRes", (res, req) =>
            console.log("[Proxy-8084] Response:", req.path, res.statusCode)
          );
          proxy.on("error", (err, req, res) =>
            console.error("[Proxy-8084] Error:", err)
          );
        },
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
