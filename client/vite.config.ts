import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// React Compiler matches any file containing "use" (e.g. useMutation). Compiling custom
// hooks that wrap TanStack Query breaks hook dispatch and causes "Invalid hook call".
const reactCompiler = reactCompilerPreset()
reactCompiler.rolldown.filter = {
  code: reactCompiler.rolldown.filter.code,
  id: { exclude: ['**/hooks/**'] },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompiler] }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
