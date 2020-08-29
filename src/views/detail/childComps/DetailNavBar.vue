<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="content">
        <div v-for="(item, index) in titles"
             class="item"
             :class="{active: (currentIndex === index)}"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    props: {
      titles: {
        type: Array,
        default() {
          return ['商品', '参数', '评论', '推荐']
        }
      },
      currentIndex: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    methods: {
      itemClick(index) {
        this.$emit('itemClick', index);
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: relative;
    z-index: 9;
  }

  .content {
    display: flex;
  }

  .item {
    flex: 1;
    font-size: 12px;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    padding-top: 6px;
  }
</style>
