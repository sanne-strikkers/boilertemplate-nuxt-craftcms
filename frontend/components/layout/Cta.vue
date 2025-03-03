<template>
    <!-- external link -->
    <a v-if="isExternal && data?.url" :href="data?.url" :target="data?.target" :rel="'noopener noreferrer'" :class="computedClass"
        :aria-label="data?.ariaLabel" :title="data?.title">
        {{ data?.label ?? 'Link' }}
    </a>

    <!-- internal link -->
    <NuxtLink v-else-if="!isExternal && extractedPath" :to="extractedPath" :class="computedClass" :aria-label="data?.ariaLabel" :title="data?.title">
        {{ data?.label ?? 'Link' }}
    </NuxtLink>

    <!-- button -->
    <button v-else :class="computedClass" :aria-label="data?.ariaLabel" :title="data?.title" role="button" tabindex="0">
        {{ data?.label ?? 'Button' }}
    </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    data?: {
        title?: string;
        url?: string;
        target?: string;
        label?: string;
        class?: string;
        ariaLabel?: string;
    }
    type?: "button" | "link";
    bgColor?: "primary" | "secondary" | "tertiary";
    size?: "small" | "medium" | "large";
    class?: string;
}>(), {
    type: "button",
    bgColor: "primary",
    size: "medium",
});

const config = useRuntimeConfig();
const extractedPath = computed(() =>
    props.data?.url?.replace(/^https?:\/\/[^/]+/, '') || null
);

const isExternal = computed(() =>
    (props.data?.url?.startsWith('http') || !props.data?.url?.startsWith('tel') || !props.data?.url?.startsWith('mailto')) && !props.data?.url?.includes(config.public.PRIMARY_SITE_URL)
);

const bgColorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
};

const sizeClasses = {
    small: "py-2 px-3 text-xs",
    medium: "p-3 text-base",
    large: "h-[70px] py-[10px] px-6 content-center",
};

const computedClass = computed(() =>
    [
        props.class,
        props.data?.class,
        props.type === "button" &&
        `${bgColorClasses[props.bgColor]} block w-fit rounded-md ${sizeClasses[props.size]} text-center font-medium text-white transition hover:opacity-90 cursor-pointer`,
        props.type === "link" &&
        "cursor-pointer block text-base font-medium text-dark font-bold transition"
    ]
);

</script>