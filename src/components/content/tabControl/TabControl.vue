<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-item"
         :class="{active: currentIndex === index}"
         @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  import {POP, SELL, NEW} from 'common/const'

  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return ['流行', '新款', '精选']
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index;
        this.$emit('changeType', index);
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .active span {
    padding: 5px;
    border-bottom: var(--color-high-text) 2px solid;
    color: var(--color-high-text)
  }
</style>
