<template>
  <div>
    <pre>
      {{ allNews }}
    </pre>
    <h2>Latest Updates</h2>
    <div class="all-news">
      <div
        v-for="news in allNews"
        :key="news.title"
      >
        <div class="news">
          {{ news.posted_on }}
          {{ news.title }}
          {{ news.summary }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    limit: {
      type: Number,
      default: 3,
    },
  },
  async fetch () {
    let allNews = [];
    allNews = this.$content('news')
      .limit(this.limit)
      .sortBy('posted_on', 'desc');

    this.allNews = allNews;
  },
};
</script>