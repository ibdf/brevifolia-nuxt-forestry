<template>
  <section class="layout">
    <SiteHeader />
    <div class="content">
      <nuxt />
    </div>
  </section>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue';

export default {
  components: {
    SiteHeader,
  },
  computed: {},
};
</script>

