<template>
    <section class="text-block container" v-if="data">
        <h4 v-if="data.subtitle">{{ data.subtitle }}</h4>
        <h2>{{ data.title }}</h2>
        <p v-if="data.paragraph" v-html="data.paragraph"></p>
    </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: {
    uid: string;
    typeHandle: string;
    title: string;
    subtitle?: string;
    paragraph?: string;
  };
}>();
</script>
