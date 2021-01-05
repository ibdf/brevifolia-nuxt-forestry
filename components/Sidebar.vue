<template>
  <nav id="sidebar">
    <ul>
      <li
        v-for="(item, index) in sidebarNav"
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
  </nav>
</template>

<script>
export default {
  data () {
    return {
      sidebarNav: [],
    };
  },
  async fetch () {
    let parent = this.$route.path.split('/')[1];

    let children = await this.$content(`pages/${parent}`).fetch();

    let sidebarNav = [];

    children.forEach(page => {
      if (page.add_to_sidebar) {
        let url = '';
        if (page.redirect_page) {
          url = page.redirect_to;
        } else {
          url = page.path.replace('/pages', '');
        }
        sidebarNav.push({
          title: page.title,
          isExternal: page.redirect_page,
          url: url,
          position: page.sidebar_position,
        });
      }
    });

    sidebarNav.sort((a, b) => {
      return a.position - b.position;
    });

    this.sidebarNav = sidebarNav;

    // sidebarNav.navigation_items.forEach(item => {

    //   let url = '';

    //   if (item.page_url) {
    //     url = item.page_url.replace('content/pages', '').replace('.md', '').toLowerCase();
    //   } else if (item.external_url) {
    //     url = item.external_url;
    //   }

    //   console.log(url);

    //   this.sidebarNav.push({
    //     title: item.title,
    //     isExternal: item.is_external_link,
    //     url: url,
    //   });

    // });
  },
};
</script>

<style lang="scss">
  #sidebar {
    width: 225px;
    max-width: 225px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    background-color: #bcd2e1;
    ul {
      margin: 0;
      padding: 0;
      li {
        padding: 0 1rem;
        margin: 0;
        a {
          color: #2b4a5f;
          border-bottom: 1px solid #fff;
          padding: 0.5rem;
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
</style>