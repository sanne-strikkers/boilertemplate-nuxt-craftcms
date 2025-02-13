<template>
    <div :key="previewTimestamp">
        <header class="container mx-auto pt-12 pb-6 px-2 text-2xl">
            <h1 class="font-bold text-4xl sm:text-6xl lg:text-9xl">
                <!-- {{ data.title }} -->
                Homepage
            </h1>
        </header>
    </div>
</template>

<script setup>
import { usePreview } from '@/composables/usePreview'
import { useGraphQL } from '~/composables/useGraphQL'
// import { HOME_QUERY } from '@/queries/home.mjs'
import { useAsyncData } from '#app'

const { isPreview, previewToken, previewTimestamp } = usePreview()
const graphql = useGraphQL()

// Disable SSR for preview mode
if (isPreview.value) {
    definePageMeta({ ssr: false })
}

// Fetch data function
const { data, refresh } = await useAsyncData(
    'homepage',
    async () => {
        try {
            // const result = await graphql.query(HOME_QUERY, {}, {
            //     previewToken: previewToken.value
            // })
            // return result.entry
            return
        } catch (error) {
            console.error('Failed to fetch homepage data:', error)
            throw createError({
                statusCode: 404,
                message: 'Homepage not found'
            })
        }
    },
    {
        watch: [previewToken]
    }
)

watch([isPreview, previewToken], () => {
    if (isPreview.value && previewToken.value) {
        refresh()
    }
})
</script>
