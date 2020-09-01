<template>
  <div class="pay-bottom-bar">
    <div>共{{}}件,</div>
    <div>合计:</div>
    ￥
    <button>提交订单</button>
  </div>
</template>

<script>
  export default {
    name: "PaymentBottomBar"
  }
</script>

<style scoped>
  .pay-bottom-bar {
    background-color: #fff;
    height: 49px;
    line-height: 49px;

    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
</style>
