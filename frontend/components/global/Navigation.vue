<template>
    <header
        class="header fixed left-0 top-0 flex w-full items-center transition-all duration-300 ease-in-out z-50 lg:py-0"
        :class="scrolledFromTop && !menuOpen
            ? 'bg-white/75 backdrop-blur-sm opacity-100 shadow-md'
            : 'opacity-100'">

        <div class="container">
            <div class="relative -mx-4 flex items-center justify-between py-5">
                <div class="w-60 max-w-full px-4 z-50">
                    <NuxtLink to="/" class="block" v-if="logo">
                        <LayoutImage :data="logo" />
                    </NuxtLink>
                </div>

                <nav class="bg-white fixed top-0 left-0 w-full h-screen z-40 transition-transform duration-300 ease-in-out pt-[80px] lg:pt-0 flex flex-col lg:flex-row lg:relative lg:h-auto lg:bg-transparent"
                    :class="[
                        menuOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0',
                        resizing && 'transition-none'
                    ]">

                    <ul class="px-6 mt-6 lg:mt-0 lg:px-0 lg:flex lg:items-center">
                        <template v-for="item in data" :key="item?.id" v-if="data">
                            <li class="lg:ml-10" v-for="link in item.ctas" :key="link.id" v-if="item && item.ctas && item.ctas.length === 1">
                                <LayoutCta :data="link.cta" type="link" v-if="link.cta"
                                    class="block py-3 text-lg font-medium text-dark hover:text-primary lg:py-2 lg:inline-flex"/>
                            </li>
                            <li class="lg:ml-10" v-else>
                                <LayoutDropdown :options="item.ctas || []" :isNavbar="true" :classes="scrolledFromTop ? 'lg:mt-10' : 'lg:mt-3'">
                                    <template #button>
                                        <span 
                                            class="block py-3 text-lg font-medium text-dark hover:text-primary lg:py-2 lg:inline-flex"
                                            :class="{ 'router-link-active' : item.ctas?.some((option) => '/' + option.cta?.url?.split('/').slice(1)[2] == route.path)}">
                                            {{ item.title }}
                                        </span>
                                    </template>
                                </LayoutDropdown>
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
import { useViewport } from '@/composables/useViewport';

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
const { resizing } = useViewport({ mobile: 768, tablet: 1024, laptop: 1280, desktop: 1440 });
const bodyClass = computed(() => menuOpen.value ? 'overflow-hidden' : '')
const route = useRoute();

const handleScroll = () => {
    scrolledFromTop.value = window.scrollY >= 50
}

watch(() => route.fullPath, () => {
    menuOpen.value = false;
});

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