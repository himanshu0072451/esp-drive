import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/esp-drive/', // Replace with your repo name
  plugins: [react()],
server: {
    proxy: {
      '/control': {
        target: 'http://192.168.147.74', // Your ESP8266 IP
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
