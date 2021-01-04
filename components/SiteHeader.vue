<template>
  <div>
    <h1>Philadelphia Votes</h1>
    <nav>
      <ul>
        <li
          v-for="(item, index) in mainNav"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </div>
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
    this.mainNav = mainNav;
  },
};
</script>