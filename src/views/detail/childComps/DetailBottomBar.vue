<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon favourite"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    background-color: #fff;
    display: flex;
    height: 58px;
    text-align: center;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .bar-item {
    display: flex;
    flex: 1;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .service {
    background: url("~assets/img/detail/detail_bottom.png") 0 40%/100%;
  }

  .bar-left .shop {
    background: url("~assets/img/detail/detail_bottom.png") 0 75%/100%;
  }

  .bar-left .favourite {
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 3px;
  }

  .bar-left .text {
    font-size: 12px;
  }

  .bar-right {
    font-size: 14px;
  }

  .bar-right .buy {
    background-color: #f69;
    line-height: 58px;
    color: #fff;
  }

  .bar-right .cart {
    background-color: #ffe817;
    line-height: 58px;
    color: #333;
  }
</style>
