<template>
    <img
        :src="`${data?.url}`"
        :alt="data?.alt ?? 'Image'"
        :loading="loading ?? 'lazy'"
        :width="data?.width"
        :height="data?.height"
        decoding="async"
        :class="cssClass"
    />
</template>

<script setup lang="ts">

const props = defineProps<{
    data?: {
        title?: string;
        filename?: string;
        url?: string;
        extension?: string;
        focalPoint?: { x: number; y: number };
        width?: number;
        height?: number;
        alt?: string;
    }
    loading?: 'lazy' | 'eager';
    mode?: "crop" | "fit" | "stretch";
    cssClass?: string;
}>();

</script>