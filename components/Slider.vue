<template>
  <div
    id="slider"
    ref="slider"
  >
    <div
      v-for="slide in slides"
      :key="slide.title"
      class="slide"
    >
      <img :src="slide.image">
      <h3>{{ slide.title }}</h3>
      <div class="slide-desc">
        {{ slide.desc }}
        <template v-if="slide.isExternal">
          <a
            :href="slide.url"
            target="_blank"
            class="read-more"
          >Read More</a>
        </template>
        <template v-else>
          <nuxt-link
            :to="slide.url"
            class="read-more"
          >
            Read More
          </nuxt-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      default: 'home',
    },
  },
  data () {
    return {
      slides: [],
    };
  },
  async fetch () {

    const page = await this.$content(`pages/${this.page}`).only([ 'slides' ]).fetch();

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

    this.slides = slides;

  },
  mounted () {
    let slider = this.$refs['slider'];

    function switchSlide (index) {
      let slides = slider.querySelectorAll('.slide');
      slides.forEach((slide, sIndex) => {
        if (index === sIndex) {
          console.log('equal');
          slide.style.opacity = 1;
        } else {
          slide.style.opacity = 0;
        }
      });
    }

    var index = 1;
    setInterval(function() {
      switchSlide(index);
      index++;
      if (index > 2) {
        index = 0;
      }
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
  #slider {
    position: relative;
    height: 348px;
    overflow: hidden;
   .slide {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     opacity: 0;
     transition: opacity 0.25s ease-in-out;
     &:nth-child(1) {
       opacity: 1;
     }
     img {
       margin-bottom: 0.5rem;
       width: 100%;
       height: auto;
     }
     .slide-desc {
       position: absolute;
       bottom: 0;
       left: 0;
       width: 100%;
       z-index: 10;
       background-color: rgba(#444, 0.8);
       padding: 1rem;
       color: #fff;
     }
     .read-more {
       background-color: #6b9cbd;
       color: #fff;
       padding: 0.5rem;
       display: inline-block;
     }
   }
  }
</style>