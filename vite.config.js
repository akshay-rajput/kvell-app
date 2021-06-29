import { defineConfig } from 'vite';
const path = require('path');
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
        alias: [
          {find: "@", replacement: path.resolve(__dirname, 'src')},
          {find: "@/features", replacement: path.resolve(__dirname, 'src/features')},
          {find: "@/hooks", replacement: path.resolve(__dirname, 'src/hooks')},
          {find: "@/screens", replacement: path.resolve(__dirname, 'src/screens')}
        ],
  }
})
