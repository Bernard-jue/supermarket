<template>
  <div class="normal-list-item">
    <div class="img"><slot name="image"></slot></div>
    <div class="description"><slot name="text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NormalListItem"
  }
</script>

<style scoped>
  .normal-list-item {
    font-size: 15px;
    padding:10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .img {
    margin-top: 15px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  img {
    width: 20px;
    height: 20px;
    /*margin: 0 10px;*/
    /*margin: auto 8px auto 8px;*/
  }

  .description {
    position: absolute;
    left: 45px;
    top: 4px;
  }
</style>
