<template>
    <div class="generic page" v-if="pageContent" :key="previewTimestamp">
        <GlobalSeo :data="pageContent.seomatic" v-if="pageContent.seomatic" />

        <div class="container">
            <div class="text-center">
                <LayoutImage v-if="pageContent.media && pageContent.media.length > 0" :data="pageContent.media[0]" :cssClass="'mx-auto max-w-full mb-12'"/>
                <span class="subtitle" v-if="pageContent.subtitle">{{ pageContent.subtitle }}</span>
                <h1 v-if="pageContent.title">{{ pageContent.title }}</h1>
                <p v-if="pageContent.paragraph" v-html="pageContent.paragraph"></p>
            </div>
        </div>
        
        <div class="generic__contentBlocks" v-if="pageContent.contentBlock">
            <ComponentLoader :data="pageContent.contentBlock" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePreview } from '@/composables/usePreview'
import { useGraphQLQuery } from '~/composables/useGraphQL'
import { GENERIC_QUERY } from '@/queries/sections/generic.mjs'

const { isPreview, previewToken, previewTimestamp } = usePreview()
const route = useRoute()

if (isPreview.value) {
    definePageMeta({ ssr: false })
}

// get the current slug from the route
const slug = computed(() => {
  const slugParam = route.params.generic;
  if (!slugParam) return ''
  return Array.isArray(slugParam) ? slugParam.join('/') : slugParam
})

const { data, refresh, error, pending } = useGraphQLQuery(`page-${slug.value}`, GENERIC_QUERY, { uri: slug.value }, [slug])
const pageContent = computed(() => data.value?.genericEntries ? data.value?.genericEntries[0] : {})

watch([isPreview, previewToken], () => {
    if (isPreview.value && previewToken.value) {
        refresh()
    }
})

</script>
