<template>
    <section class="text-block container" v-if="data">
        <span class="subtitle" v-if="data.subtitle">{{ data.subtitle }}</span>
        <h2>{{ data.title }}</h2>
        <p v-if="data.paragraph" v-html="data.paragraph"></p>
    </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: {
    id?: number;
    uid?: string;
    typeHandle?: string;
    title: string;
    subtitle?: string;
    paragraph?: string;
  };
}>();
</script>
