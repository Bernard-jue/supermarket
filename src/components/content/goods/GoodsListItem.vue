<template>
  <div class="goodsListItem" @click="ItemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="information">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="favourite">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('imgLoad')
      },
      ItemClick() {
        const iid = this.goodsItem.iid;
        this.$router.push({path: '/detail', query: {iid: iid}})
      }
    }
  }
</script>

<style scoped>
  .goodsListItem {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goodsListItem img {
    width: 100%;
    border-radius: 5px;
  }

  .information {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .information p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .information .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .information .favourite {
    position: absolute;
  }

  .information .favourite::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
