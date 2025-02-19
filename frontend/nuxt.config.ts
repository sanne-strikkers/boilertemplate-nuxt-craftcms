// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

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
  devServer: {
    host: process.env.PRIMARY_SITE_URL,
    port: 3000,
  },
  components: {
		global: true,
		dirs: ["~/components"],
	},
  typescript: {
		shim: false,
	},
  nitro: {
    devServer: {
      watch: ['./server']
    }
  },
  experimental: {
    payloadExtraction: false
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
