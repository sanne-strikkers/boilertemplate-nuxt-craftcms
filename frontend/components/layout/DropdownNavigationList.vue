<template>
  <div class="lg:absolute left-0 lg:w-[250px] lg:bg-white/95 lg:backdrop-blur-sm lg:rounded lg:shadow-md" @mouseleave="$emit('update:isOpen', false)">
    <div class="hidden lg:block absolute -top-2 left-5 w-4 h-4 rotate-45 bg-white/95 backdrop-blur-sm -z-1"></div>
    <ul>
      <li v-for="option in options" :key="option.id" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        <LayoutCta v-if="option.cta" :data="option.cta" type="link" />
        <span v-else @click="selectOption(option)">{{ option.item?.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({ options: Array });
const emit = defineEmits(['select', 'update:isOpen']);
const selectOption = option => {
  emit('select', option);
  emit('update:isOpen', false);
};
</script>