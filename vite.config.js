import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct routing
  server: {
    historyApiFallback: true, // Fix 404 on refresh
  }
})
