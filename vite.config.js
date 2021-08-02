import { defineConfig } from "vite";
const path = require("path");
import reactRefresh from "@vitejs/plugin-react-refresh";
import { dependencies } from './package.json';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'history', 'react-dom', 'react-redux', '@reduxjs/toolkit', '@material-ui/core'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            {
                find: "@/features",
                replacement: path.resolve(__dirname, "src/features"),
            },
            {
                find: "@/hooks",
                replacement: path.resolve(__dirname, "src/hooks"),
            },
            {
                find: "@/screens",
                replacement: path.resolve(__dirname, "src/screens"),
            },
            {
                find: "@/utils",
                replacement: path.resolve(__dirname, "src/utils"),
            },
        ],
    },
    build: {
        sourcemap: false,
        rollupOptions: {
            output: {
              manualChunks: {
                vendor: ['react', 'react-router-dom', 'react-dom'],
                ...renderChunks(dependencies),
              },
            },
        },
    },
});
