import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  build: {
    outDir: '//10.10.81.131/deloy/FE_QTTS',
    emptyOutDir: false,
  },
  server: {
    host: 'thaco_amc_fe_agent.dev.io',
  },
  resolve: {
    alias: {
      '@Admin': '/src/views/admin',
      '@Store': '/src/store',
      '@Helpers': './src/helpers'
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})