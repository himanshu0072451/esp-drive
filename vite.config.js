import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/DriftX/', // Replace with your repo name
  plugins: [react()],
});
