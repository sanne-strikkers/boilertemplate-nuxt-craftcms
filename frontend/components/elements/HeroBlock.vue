<template>
  <section
    class="hero-block relative z-10 overflow-hidden bg-white pb-[110px] pt-[120px] dark:bg-dark md:pt-[150px] lg:pt-[180px]"
    v-if="data">
    <div
      class="absolute left-0 top-0 z-[-1] max-h-3/4  h-full w-full rounded-br-[200px] dark:bg-dark-2 lg:w-1/2 lg:max-h-full"
      :style="{ backgroundColor: data.backgroundColor }">
    </div>

    <div class="container">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-0">
        <div class="lg:pe-24">
          <span class="subtitle" v-if="data.subtitle">{{ data.subtitle }}</span>
          <h1>{{ data.title }}</h1>
          <p v-if="data.paragraph" v-html="data.paragraph"></p>
          <div class="mt-8">
            <LayoutCta v-if="data.cta" :data="data.cta" bgColor="primary" />
          </div>
        </div>
        <div class="lg:pl-10">
          <LayoutImage v-if="data.media && data.media.length > 0" :data="data.media[0]"
            :cssClass="'mx-auto max-w-full'" />
        </div>
      </div>
    </div>
    
  </section>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    data?: {
      uid?: string;
      typeHandle?: string;
      title?: string;
      subtitle?: string;
      paragraph?: string;
      backgroundColor?: string;
      media?: [object];
      cta?: object;
    };
  }>(),
  {
    data: () => ({
      typeHandle: "heroBlock",
      title: 'Default Title',
      subtitle: 'Default Subtitle',
      paragraph: 'Default paragraph content',
      backgroundColor: '#f8f8f8',
    }),
  }
);

</script>
