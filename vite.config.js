import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import os from 'os' // Importer os directement

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Ajouter l'analyseur de bundle en mode production
    ...(process.env.ANALYZE ? [visualizer({
      filename: './stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })] : [])
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    
    // Optimisations de performance
    cache: {
      dir: './node_modules/.vitest-cache'
    },
    
    // Limiter le nombre de threads
    threads: {
      // Utiliser le nombre de cœurs moins 1
      count: Math.max(1, os.cpus().length - 1)
    },
    
    // Configuration de la couverture
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      include: ['src/**/*.{js,jsx}'],
      // Désactiver la génération de rapport HTML par défaut
      reportOnFailure: true
    },
    
    // Exclure les fichiers non pertinents
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**'
    ],
    
    // Limiter les tests à exécuter
    maxConcurrency: 5,
    
    // Temps de timeout
    testTimeout: 5000
  },
  build: {
    // Réduire la taille du bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        // Supprimer les console.log en production
        drop_console: true,
        drop_debugger: true
      }
    },
    // Diviser le code pour améliorer les performances
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Séparer les dépendances tierces
            return 'vendor';
          }
        }
      }
    },
    // Activer la compression
    chunkSizeWarningLimit: 1000,
    sourcemap: false // Désactiver les sourcemaps en production
  },
  // Optimiser les imports
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'firebase']
  }
})
