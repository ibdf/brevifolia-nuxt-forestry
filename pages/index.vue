<template>
  <div>
    Somethning
  </div>
</template>

<script>

export default {
  components: {},
  layout: 'layout',
  async asyncData () {
    await false;
    // create context via webpack to map over all blog posts
    // const allPosts = await require.context("~/content/blog-posts/", true, /\.md$/)
    // const posts =  allPosts.keys().map((key) => {
    // give back the value of each post context
    // return allPosts(key)
    // });
    return {
      // posts
    };
  },
};
</script>