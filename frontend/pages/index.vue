<template>
    <div :key="previewTimestamp" v-if="pageContent">
        <ComponentLoader :data="pageContent.contentBlock" />
    </div>
</template>

<script setup lang="ts">
import { usePreview } from '@/composables/usePreview'
import { useGraphQLQuery } from '~/composables/useGraphQL'
import { HOME_QUERY } from '@/queries/sections/home.mjs'

const { isPreview, previewToken, previewTimestamp } = usePreview()

// Disable SSR for preview mode
if (isPreview.value) {
    definePageMeta({ ssr: false })
}

const { data: pageContent, refresh, error, pending } = useGraphQLQuery('homepage', HOME_QUERY)

watch([isPreview, previewToken], () => {
    if (isPreview.value && previewToken.value) {
        refresh()
    }
})
</script>
