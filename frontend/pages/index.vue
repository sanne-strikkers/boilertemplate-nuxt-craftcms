<template>
    <div class="home page">
        <div :key="previewTimestamp" v-if="pageContent">
            <ComponentLoader :data="pageContent.contentBlock" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePreview } from '@/composables/usePreview'
import { useGraphQLQuery } from '~/composables/useGraphQL'
import { HOME_QUERY } from '@/queries/sections/home.mjs'

const { isPreview, previewToken, previewTimestamp } = usePreview()

if (isPreview.value) {
    definePageMeta({ ssr: false })
}

const { data, refresh, error, pending } = useGraphQLQuery('homepage', HOME_QUERY)
const pageContent = computed(() => data.value?.entry || {})

watch([isPreview, previewToken], () => {
    if (isPreview.value && previewToken.value) {
        refresh()
    }
})
</script>
