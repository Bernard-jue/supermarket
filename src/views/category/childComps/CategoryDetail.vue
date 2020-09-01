<template>
  <div class="category-detail">
    <tab-control @changeType="changeType"></tab-control>
    <goods-list :goods="goods"></goods-list>
  </div>
</template>

<script>
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList'

  import {POP, SELL, NEW} from 'common/const'

  export default {
    name: "CategoryDetail",
    components: {
      TabControl,
      GoodsList
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentType: POP
      }
    },
    methods: {
      changeType(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }

        this.$emit('changeType', this.currentType)
      }
    }
  }
</script>

<style scoped>
  .category-detail {
    padding-top: 60px;
    padding-bottom: 49px;
  }
</style>
