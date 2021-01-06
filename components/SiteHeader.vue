<template>
  <header id="site-header">
    <div class="container">
      <h1>Philadelphia Votes</h1>
    </div>
    <nav>
      <div class="container">
        <ul>
          <li
            v-for="(item, index) in mainNav"
            :key="index"
          >
            <template v-if="item.isExternal">
              <a
                :href="item.url"
                target="_blank"
              >{{ item.title }}</a>
            </template>
            <template v-else>
              <nuxt-link :to="item.url">
                {{ item.title }}
              </nuxt-link>
            </template>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      mainNav: [],
    };
  },
  async fetch () {
    let mainNav = await this.$content('options/navigation').fetch();
    mainNav.navigation_items.forEach(item => {

      let url = '';

      if (item.page_url) {
        url = item.page_url.replace('content/pages', '').replace('.md', '').toLowerCase();
      } else if (item.external_url) {
        url = item.external_url;
      }

      this.mainNav.push({
        title: item.title,
        isExternal: item.is_external_link,
        url: url,
      });

    });
  },
};
</script>

<style lang="scss">
  .container {
    padding: 0 1rem;
    margin: 0 auto;
    max-width: 1200px;
  }
  #site-header {
    background-color: #6b9cbd;
    h1 {
      margin-bottom: 0;
      padding: 1.5rem 0;
      color: #fff;
    }
    nav {
      background-color: #8c887d;
      width: 100%;
      ul {
        width: 100%;
        padding: 0;
        margin: 0;
        li {
          display: inline-block;
          padding: 0.5rem 1rem;
          margin-bottom: 0;
          a {
            color: #fff;
          }
        }
      }
    }
  }
</style>