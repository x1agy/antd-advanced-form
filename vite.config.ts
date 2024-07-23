import { defineConfig, loadEnv } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    server: {
      proxy: {
        '/ant-forms': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
      port: 3000,
    },
    plugins: [
      eslintPlugin({
        cache: false,
        include: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
        exclude: ['vite.config.ts'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        components: `${path.resolve(__dirname, './src/components/')}`,
        types: `${path.resolve(__dirname, './src/types')}`,
        utils: `${path.resolve(__dirname, './src/utils')}`,
      },
    },
  };
});
