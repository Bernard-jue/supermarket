<template>
  <scroll class="menu"
          :probe-type="3"
          :click="true"
          :pull-up-load="true">
    <div class="tab-menu">
      <div class="tab-menu-item"
           v-for="(item, index) in MenuInfo.list"
           @click="change(index)"
           :class="{active: currentIndex === index}">
        <div class="text">
          <div>
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      MenuInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      change(index) {
        this.currentIndex = index;
        this.$emit('changeIndex', index)
        // console.log(this.currentIndex);
      }
    }
  }
</script>

<style scoped>
  .menu {
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .tab-menu {
    width: 80px;
    padding-top: 44px;
    padding-bottom: 49px;

    overflow: hidden;
  }

  .tab-menu-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    background-color: #eee;
  }

  .text {
    /*padding: 13px 5px;*/
  }

  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
