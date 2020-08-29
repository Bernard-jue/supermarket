<template>
  <div class="detail-goods-info" v-if="Object.keys(goodsInfo).length !== 0">
    <div class="detail-title"><span><strong>{{goodsInfo.title}}</strong></span></div>
    <div class="detail-price">
      <span class="now-price">{{goodsInfo.price}}</span>
      <span class="old-price">{{goodsInfo.oldPrice}}</span>
      <span class="promotion"
            v-if="goodsInfo.discount"
            :style="{backgroundColor: goodsInfo.discountBgColor}">
        {{goodsInfo.discount}}
      </span>
    </div>
    <div class="detail-columns">
      <span class="columns-item left">{{goodsInfo.columns[0]}}</span>
      <span class="columns-item center">{{goodsInfo.columns[1]}}</span>
      <span class="columns-item right">{{goodsInfo.services[goodsInfo.services.length - 1].name}}</span>
    </div>
    <div class="detail-other">
      <span class="detail-other-item"
            v-for="index in goodsInfo.services.length - 1"
            :key="index">
        <img :src="goodsInfo.services[index - 1].icon" alt="">
        <span>{{goodsInfo.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      goodsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    created() {
      // console.log(this.goodsInfo.services);
    }
  }
</script>

<style scoped>
  .detail-title {
    font-size: 16px;
    color: black;
    padding-top: 10px;
  }

  .detail-price {
    margin-top: 10px
  }

  .now-price {
    font-size: 25px;
    color: var(--color-high-text);
    padding-right: 5px;
  }

  .old-price {
    font-size: 12px;
    text-decoration: line-through;
    color: gray;
    padding-right: 5px;
  }

  .promotion {
    position: relative;
    bottom: 10px;

    height: 20px;
    font-size: 12px;
    color: #fff;
    border-radius: 10px;
    /*border: 3px solid var(--color-high-text);*/
    padding: 2px 5px 2px 3px;
  }

  .detail-columns {
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .columns-item {
    flex: 1;
    font-size: 13px;
  }

  .left {
    text-align: left;
  }

  .center {
    text-align: center;
  }

  .right {
    text-align: right;
  }

  .detail-other {
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    justify-content: space-between;
    line-height: 60px;

    display: flex;
  }

  .detail-other-item img {
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }

  .detail-other-item span {
    font-size: 12px;
    color: #000000;
  }
</style>
