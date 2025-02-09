import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/esp-drive/', // Replace with your repo name
  plugins: [react()],
server: {
    proxy: {
      '/control': {
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
