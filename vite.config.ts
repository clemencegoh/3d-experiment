import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3010, // just personal preference for all my own projects 
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
})
