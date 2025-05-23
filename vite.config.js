import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'bhargavor2qcrjsivddczf.drops.nxtwave.tech',
      'localhost',
      '127.0.0.1',
    ],
    // Optional: specify port if needed
    port: 3000,
  },
})
