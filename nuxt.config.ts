import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const projectRoot = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-12-31',
  modules: ['@nuxthub/core', '@nuxtjs/sitemap'],
  site: {
    url: 'https://example.test',
    name: 'Hub + sitemap isolation',
  },
  hub: {
    blob: true,
    cache: true,
    db: { dialect: 'sqlite' },
    kv: true,
  },
  nitro: {
    preset: 'cloudflare-module',
    alias: {
      '~/server': resolve(projectRoot, 'server'),
    },
  },
})
