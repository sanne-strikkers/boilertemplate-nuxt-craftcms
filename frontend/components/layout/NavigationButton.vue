<template>
    <button
        class="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary lg:hidden z-50"
        @click="$emit('toggleMenu')">
        <span class=" relative block my-[6px] h-[2px] w-[30px] bg-primary transition-transform duration-300 ease-in-out"
            :class="menuOpen ? 'rotate-45 translate-y-[8px]' : ''"></span>

        <span class=" relative block my-[6px] h-[2px] w-[30px] bg-primary transition-opacity duration-300 ease-in-out"
            :class="menuOpen ? 'opacity-0' : 'opacity-100'"></span>

        <span class=" relative block my-[6px] h-[2px] w-[30px] bg-primary transition-transform duration-300 ease-in-out"
            :class="menuOpen ? '-rotate-45 -translate-y-[8px]' : ''"></span>
    </button>
</template>

<script setup lang="ts">
defineProps<{ menuOpen: boolean }>();
defineEmits(["toggleMenu"]);
</script>