<template>
  <div></div>
</template>

<script setup lang="ts">
export interface MetaTag {
  name?: string
  content?: string
  property?: string
  [key: string]: string | undefined
}

const props = defineProps<{
  data: {
    metaTitleContainer?: string;
    metaTagContainer?: string;
    metaLinkContainer?: string;
    metaScriptContainer?: string;
    metaJsonLdContainer?: string;
    metaSiteVarsContainer?: string;
    frontendTemplateContainer?: string;
  };
}>();

/**
 * Parses raw HTML title tags into a string.
 * @param metaTitleContainer - The raw string containing `<title>` tags.
 * @returns The extracted title.
 */
const extractTitle = (metaTitleContainer: string | undefined): string => {
  if (!metaTitleContainer) return useRuntimeConfig().public.PRIMARY_SITE_NAME;
  
  const match = metaTitleContainer.match(/<title>(.*?)<\/title>/i);
  return match ? match[1] : useRuntimeConfig().public.PRIMARY_SITE_NAME;
};

/**
 * Parses raw HTML meta tags into an array of structured objects.
 * @param metaTagContainer - The raw string containing `<meta>` tags.
 * @returns An array of meta tag objects.
 */
const parseMetaTags = (metaTagContainer: string | undefined): MetaTag[] => {
  if (!metaTagContainer) return []

  return (
    metaTagContainer.match(/<meta [^>]+>/g)?.map((tag) => {
      const attributes = [...tag.matchAll(/(\w+)="([^"]+)"/g)]
      return Object.fromEntries(attributes.map(([_, key, val]) => [key, val])) as MetaTag
    }) || []
  )
}

useHead({
  title: extractTitle(props.data.metaTitleContainer),
  meta: parseMetaTags(props.data.metaTagContainer)
});
</script>