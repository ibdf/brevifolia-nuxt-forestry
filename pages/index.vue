<template>
  <div class="content-body">
    <slider page="home" />
    <latest-news :limit="3">
      <pre>
      {{ page }}
    </pre>
    </latest-news>
  </div>
</template>

<script>

import Slider from '~/components/Slider.vue';
import LatestNews from '~/components/LatestNews.vue';

export default {
  components: {
    Slider,
    LatestNews,
  },
  layout: 'layout',
  async asyncData ({ $content }) {

    const page = await $content(`pages/home`).fetch();
    let slides = [];

    page.slides.forEach(item => {

      let url = '';

      if (item.page_url && item.page_url.length > 0) {
        url = item.page_url.replace('content/pages', '').replace('.md', '').toLowerCase();
      } else if (item.external_url) {
        url = item.external_url;
      }

      slides.push({
        title: item.slide_titlte,
        desc: item.slide_desc,
        image: item.slide_image,
        isExternal: item.external_link,
        url: url,
      });

    });

    return {
      page,
      slides,
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