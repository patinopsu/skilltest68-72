import { execSync } from 'node:child_process'
import path from 'node:path'

function getGitHash() {
  try {
    return execSync(
      'git rev-parse --short HEAD',
      {
        cwd: path.resolve(__dirname, '..'),
      }
    )
      .toString()
      .trim()
  } catch {
    return 'unknown'
  }
}

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({

 nitro: {
    compatibilityDate: '2025-10-12', // 🔥 วันที่ตามที่ Nuxt แนะนำใน warning
  },

  modules: ['@pinia/nuxt'],
   pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  devtools: { enabled: false },
 runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:7000',
      appVersion: process.env.npm_package_version,
      gitHash: getGitHash(),

    }
  },
  // ✅ ย้าย PostCSS มาตั้งค่าที่นี่
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      'autoprefixer': {},
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css', 
  ],

  build: { 
    transpile: ['vuetify'] 
  },
  vite: {
    ssr: { 
      noExternal: ['vuetify'] 
    },
    plugins: [
      vuetify(
        { autoImport: true 
    })],
    vue: { 
      template: { 
        transformAssetUrls 
      } }
  }
})
