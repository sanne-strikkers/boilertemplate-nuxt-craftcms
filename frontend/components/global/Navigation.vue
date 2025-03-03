<template>
    <header
        class="header fixed left-0 top-0 flex w-full items-center transition-all duration-300 ease-in-out z-50 lg:py-0"
        :class="scrolledFromTop && !menuOpen
            ? 'bg-white/75 drop-shadow-2xl backdrop-blur-sm opacity-100'
            : 'opacity-100'">

        <div class="container">
            <div class="relative -mx-4 flex items-center justify-between py-5">
                <div class="w-60 max-w-full px-4 z-50">
                    <NuxtLink to="/" class="block" v-if="logo">
                        <LayoutImage :data="logo"/>
                    </NuxtLink>
                </div>

                <nav class="bg-white fixed top-0 left-0 w-full h-screen z-40 transition-transform duration-300 ease-in-out pt-[80px] lg:pt-0 flex flex-col lg:flex-row lg:relative lg:translate-y-0 lg:h-auto lg:bg-transparent"
                    :class="menuOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'">

                    <ul class="px-6 mt-6 lg:mt-0 lg:px-0 lg:flex lg:items-center">
                        <template v-for="item in data" :key="item?.id" v-if="data">
                            <li v-for="link in item.ctas" :key="link.id" v-if="item && item.ctas">
                                <LayoutCta :data="link.cta" type="link" v-if="link.cta"
                                    class="block py-3 text-lg font-medium text-dark hover:text-primary lg:py-2 lg:ml-10 lg:inline-flex" />
                            </li>
                        </template>
                    </ul>
                </nav>
                
                <LayoutNavigationButton :menuOpen="menuOpen" @toggleMenu="menuOpen = !menuOpen" />
            </div>
        </div>
    </header>

</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    data?: Array<{
        id?: number,
        title?: string,
        ctas?: Array<{
            id?: number,
            name?: string,
            cta?: any
        }>
    }>;
    logo?: any;
}>();

const scrolledFromTop = ref(false)
const menuOpen = ref(false)
const bodyClass = computed(() => menuOpen.value ? 'overflow-hidden' : '')

const handleScroll = () => {
    scrolledFromTop.value = window.scrollY >= 50
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

useHead({
    bodyAttrs: {
        class: bodyClass
    }
})
</script>

<style>
.router-link-active {
    color: var(--color-primary);
}
</style>