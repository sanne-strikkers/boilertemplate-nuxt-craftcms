import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Breakpoints {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
}

export const useViewport = (breakpoints: Breakpoints) => {
  const windowWidth = ref<number | null>(null);
  const appHeight = ref<number | null>(null);
  const resizing = ref(false);

  const isMobile = computed(() => windowWidth.value !== null && windowWidth.value < breakpoints.mobile);
  const isTablet = computed(() => windowWidth.value !== null && windowWidth.value >= breakpoints.mobile && windowWidth.value < breakpoints.tablet);
  const isLaptop = computed(() => windowWidth.value !== null && windowWidth.value >= breakpoints.tablet && windowWidth.value < breakpoints.laptop);
  const isDesktop = computed(() => windowWidth.value !== null && windowWidth.value >= breakpoints.laptop);

  const updateSize = () => {
    if (typeof window !== "undefined") {
      windowWidth.value = window.innerWidth;
      appHeight.value = window.innerHeight;
    }
  };

  const handleResize = () => {
    resizing.value = true;
    setTimeout(() => (resizing.value = false), 200);
    updateSize();
  };

  onMounted(() => {
    updateSize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return { windowWidth, appHeight, resizing, isMobile, isTablet, isLaptop, isDesktop };
};