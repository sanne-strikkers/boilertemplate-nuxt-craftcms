<template>
  <div ref="dropdownRef" class="relative lg:w-fit" @mouseover="(!isMobile && isNavbar) ? isOpen = true : ''">
    <div @click="toggleDropdown" class="cursor-pointer" :class="{'flex items-center' : isNavbar}">
      <slot name="button" :selectOption="selectOption"></slot>
      <SvgChevronDown class="lg:hidden w-8 h-8 ml-auto transition-transform duration-300" :class="{ 'rotate-180': isOpen }" v-if="isNavbar"/>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out transform -translate-y-4 opacity-0"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition-all ease-in duration-75"
      leave-class="transform opacity-100 duration-300"
      leave-to-class="transform opacity-0 -translate-y-4"
    >
      <div v-if="isOpen">
        <LayoutDropdownNavigationList v-if="isNavbar" :options="options" @select="handleSelect" v-model:isOpen="isOpen"
          :class="classes" />
        <LayoutDropdownList v-else :class="classes" :options="options" @select="handleSelect" />
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { useViewport } from '@/composables/useViewport';

const props = defineProps({ options: Array, isNavbar: Boolean, classes: String });
const emit = defineEmits(['select']);
const isOpen = ref(false);
const dropdownRef = ref(null);
const route = useRoute();
const { isMobile } = useViewport({ mobile: 768, tablet: 1024, laptop: 1280, desktop: 1440 });

let selectOption = ref("Selecteer een optie")

onClickOutside(dropdownRef, () => (isOpen.value = false));
watch(() => route.fullPath, () => (isOpen.value = false));

const toggleDropdown = () => (isOpen.value = !isOpen.value);
const handleSelect = option => {
  console.log(option);
  
  selectOption.value = option.item.label;
  emit('select', option);
  isOpen.value = false;
};
</script>