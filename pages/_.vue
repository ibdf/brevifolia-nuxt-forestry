<template>
  <div class="content-body">
    <h2>{{ page.title }}</h2>
    <img
      v-if="page.banner"
      :src="page.banner"
    >
    <nuxt-content :document="page" />
  </div>
</template>

<script>

export default {
  components: {},
  layout: 'layout',
  async asyncData ({ $content, params }) {
    // console.log('all', all);
    // let test = await $content('pages', { deep: true }).only([ 'path' ]).fetch();
    // console.log(test.map(file => file.path === '/index' ? '/' : file.path.replace('pages/', '')));

    // console.log('params.pathMatch', params);

    // const files = await $content('pages', { deep: true }).only([ 'path' ]).fetch();

    // console.log(files.map(file => file.path === '/index' ? '/' : file.path.replace('/pages/', '')));

    let path = params.pathMatch;

    const page = await $content(`pages/${path}`).fetch();

    console.log(page);

    return {
      page,
    };
  },
  data() {
    return {
      items: [],
    };
  },
  created () {
    this.$router.options.routes.forEach(route => {
      // console.log(route);
      this.items.push(route);
    });
  },
};
</script>

<style lang="scss" scoped>
  .content-body {
    padding: 0 0.5rem;
  }
</style>