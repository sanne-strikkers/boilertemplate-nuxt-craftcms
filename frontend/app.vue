<template>
  <main>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
import { useGraphQL } from '~/composables/useGraphQL'
import { GLOBALS_QUERY } from '@/queries/globals.mjs'

const graphql = useGraphQL()

// Fetch globals data
const { data: globalsData } = await useAsyncData('globals', async () => {
  try {
    const result = await graphql.query(GLOBALS_QUERY)
    return {
      global: result?.globalSets?.[0] || {},
      pages: result?.pagesEntries || []
    }
  } catch (err) {
    console.error('Error fetching globals:', err)
    throw err
  }
})

console.log(globalsData.value);


</script>