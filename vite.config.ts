import { resolve } from 'path'
import type { UserConfig, ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import styleImport, { ElementPlusResolve } from 'vite-plugin-style-import'
import PurgeIcons from 'vite-plugin-purge-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      styleImport({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/es/components/${name.substring(3)}/style/css`
            }
          }
        ]
      }),
      PurgeIcons(),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: './mock/',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'
          setupProdMockServer()
          `
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
            injectScript: `<script src="./inject.js"></script>`
          }
        }
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    server: {
      port: 4000,
      proxy: {
        // 选项写法
        // '/api': {
        //   target: 'http://127.0.0.1:8000',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // },
        '/v1': {
          target: 'http://10.102.221.169:10000',
          changeOrigin: true,
          rewrite: (path) => path.replace('/v1', '')
        }
      },
      hmr: {
        overlay: false
      },
      host: '0.0.0.0'
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        '@vueuse/core',
        'axios',
        'echarts',
        'echarts-wordcloud',
        'qrcode'
      ]
    }
  }
}
