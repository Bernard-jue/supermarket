<template>
  <div class="tab-content-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="categoryInfo">
      <div class="categoryInfoItem" v-for="(item, index) in categoryInfo">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div class="text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView';

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      categoryInfo: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .tab-content-category {
    padding-top: 44px;
    /*padding-bottom: 49px;*/
  }

  .categoryInfoItem {
    text-align: center;
    font-size: 12px;
    flex: 30%;
  }

  .categoryInfoItem img {
    width: 56px;
    height: 56px;
  }

  .categoryInfoItem div {
    margin-top: 10px;
  }
</style>
