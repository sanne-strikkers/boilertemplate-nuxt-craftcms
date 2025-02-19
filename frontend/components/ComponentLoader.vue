<template>
  <component :is="`elements-${section.typeHandle}`" v-for="(section, index) in data" :key="`${section.id}${index}`"
    :data="section" :number="section.id" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: Array<{
    id: number;
    typeHandle: string;
    title: string;
  }>;
}>();
</script>

<style>

</style>