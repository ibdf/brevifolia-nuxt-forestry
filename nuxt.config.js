import path from "path";

const config = require("./content/data/config.json");
const dirTree = require("directory-tree");
const pages = dirTree('./content/pages/');
var slugify = require('slugify');

function getPath (page) {
  let parts = page.path.split('/');
  let cleanedParts = [];
  parts.shift();
  parts.shift();
  parts.forEach(part => {

    part = part.replace(/\.md$/, '');

    let pathPart = slugify(part, {
      lower: true,
      strict: true,
    });
    cleanedParts.push(pathPart);
  });

  let cleanedPath = cleanedParts.join('/');

  let paths = [ cleanedPath ];
  if (page.children) {
    page.children.forEach(child => {
      paths.push(...getPath(child));
    });
  }
  return paths;
}

let paths = [];
pages.children.forEach(page => {
  paths.push(...getPath(page));
});
console.log(paths);


export default {
  ssr: false,
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    title: config.title || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: config.description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [ '@/assets/styles/reset.scss', '@/assets/styles/global.scss' ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js build-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Using frontmatter-markdown-loader here to parse md files
     */
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        include: path.resolve(__dirname, "content/pages"),
      });
    },
  },
  generate: {
    crawler: false,
    async routes () {
      const { $content } = require('@nuxt/content');
      const files = await $content('pages', { deep: true }).only([ 'path' ]).fetch();

      return files.map(file => file.path === '/index' ? '/' : file.path.replace('/pages', ''));
    },
  },
};
