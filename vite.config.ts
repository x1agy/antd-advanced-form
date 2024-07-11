import { defineConfig, loadEnv } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    server: {
      proxy: {
        '/commonTask': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
      port: 3000,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        components: `${path.resolve(__dirname, './src/components/')}`,
        types: `${path.resolve(__dirname, './src/types')}`,
      },
    },
  };
});
