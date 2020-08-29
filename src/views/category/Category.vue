<template>
  <div class="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>\
    tab-menu
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    name: "Category",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .nav-bar {
    color: #fff;
    background-color: var(--color-high-text);
  }
</style>
