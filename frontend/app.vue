<template>
  <div class="" v-if="content">
    <GlobalNavigation :data="content.navigation" :logo="content.media[0]" v-if="content.navigation"/>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { usePreview } from '@/composables/usePreview'
import { useGraphQLQuery } from '~/composables/useGraphQL'
import { GLOBALS_QUERY } from '@/queries/globals.mjs'

const { isPreview, previewToken, previewTimestamp } = usePreview()

if (isPreview.value) {
    definePageMeta({ ssr: false })
}

const { data, refresh, error, pending } = useGraphQLQuery('globals', GLOBALS_QUERY)
const content = computed(() => data.value?.globalSets[0] || {})

watch([isPreview, previewToken], () => {
    if (isPreview.value && previewToken.value) {
        refresh()
    }
})
</script>

<style>
main {
  min-height: calc(100vh + 100rem);
}
</style>