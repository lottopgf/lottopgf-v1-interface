import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@common': path.resolve(__dirname, '../common/src'),
        },
    },
})
