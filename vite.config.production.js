import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dayjs from 'dayjs'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const CurrentDate = dayjs().format('DD-MM-YYYY');
const CurrentYear = dayjs().format('YYYY');
export default defineConfig({
  build: {
    outDir: '//10.10.7.48/backup/SOURCE/' + CurrentYear + '/' + CurrentDate + '/FE_QTTS',
    emptyOutDir: true,
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