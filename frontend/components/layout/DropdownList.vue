<template>
  <div class="absolute left-0 mt-2 w-[250px] bg-white/95 backdrop-blur-sm rounded shadow-md">
    <ul>
      <li v-for="option in options" :key="option.id" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        <LayoutCta v-if="option.cta" :data="option.cta" type="link" />
        <span v-else @click="selectOption(option)" class="w-full block">{{ option.item?.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({ options: Array });
const emit = defineEmits(['select']);
const selectOption = option => emit('select', option);
</script>