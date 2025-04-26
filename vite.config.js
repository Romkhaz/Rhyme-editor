// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    // указываем, что исходники лежат в папке public
    root: 'public',
    publicDir: false,           // чтобы public не копировался внутрь себя
    build: {
        outDir: '../build',       // куда складывать собранные файлы; относительный путь от public
        rollupOptions: {
            input: 'public/index.html'
        }
    },
    plugins: [react()]
})