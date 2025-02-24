<template>
  <component 
      :is="`elements-${section.typeHandle}`" 
      v-for="(section, index) in data" 
      :key="`${section.id}${index}`"
      :data="section" :number="section.id" 
      class="not-last:mb-20"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  data: Array<{
    id: number;
    typeHandle: string;
    title: string;
  }> | undefined;
}>();
</script>

<style></style>