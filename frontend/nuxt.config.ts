// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s | ' + process.env.PRIMARY_SITE_NAME,
      title: process.env.PRIMARY_SITE_NAME
    }
  },
  runtimeConfig: {
    public: {
      CRAFT_GRAPHQL_TOKEN: process.env.CRAFT_GRAPHQL_TOKEN,
      CRAFT_SITE_URL: process.env.CRAFT_SITE_URL,
      PRIMARY_SITE_URL: process.env.PRIMARY_SITE_URL,
      PRIMARY_SITE_NAME: process.env.PRIMARY_SITE_NAME,
    }
  },
  nitro: {
    devServer: {
      watch: ['./server']
    }
  },
  experimental: {
    payloadExtraction: false
  }
})
