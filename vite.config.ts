import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      react(),
      isLib && dts({ 
        include: ['src'],
        exclude: ['src/main.tsx', 'src/vite-env.d.ts'] 
      })
    ].filter(Boolean),
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'RealtimeGlobe',
        fileName: 'realtime-globe',
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'three'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            three: 'THREE'
          },
        },
      },
    } : {
      outDir: 'dist'
    },
  }
})
