import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Pour les plugins Club GSAP (SplitText, DrawSVG, etc.)
    // Note: Bien que non inclus dans les dépendances par défaut pour cet exemple,
    // ces définitions sont essentielles si vous utilisez des plugins du Club GSAP.
    "process.env": {},
    global: {},
  },
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger', 'gsap/Flip'], // Inclure Flip pour l'optimisation
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          react: ['react', 'react-dom']
        }
      }
    }
  }
});