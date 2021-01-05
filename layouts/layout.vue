<template>
  <section class="layout">
    <SiteHeader />
    <main
      id="main"
    >
      <div class="container">
        <Sidebar />
        <div id="content">
          <nuxt />
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue';
import Sidebar from '~/components/Sidebar.vue';

export default {
  components: {
    SiteHeader,
    Sidebar,
  },
  computed: {},
};
</script>

<style scoped lang="scss">
  #main {
    display: block;
    padding: 1rem 0;
  }
  #content {
    width: calc(100% - 250px);
    display: inline-block;
    vertical-align: top;
  }
</style>

