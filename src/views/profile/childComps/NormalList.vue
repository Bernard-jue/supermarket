<template>
  <div class="normal-list">
    <div class="user">
      <normal-list-item>
        <img src="~assets/img/profile/message.svg" alt="" slot="image">
        <div slot="text">我的信息</div>
      </normal-list-item>
      <normal-list-item>
        <img src="~assets/img/profile/pointer.svg" alt="" slot="image">
        <div slot="text">积分商城</div>
      </normal-list-item>
      <normal-list-item>
        <img src="~assets/img/profile/vip.svg" alt="" slot="image">
        <div slot="text">会员卡</div>
      </normal-list-item>
    </div>
    <div class="shopping">
      <normal-list-item>
        <img src="~assets/img/profile/cart.svg" alt="" slot="image">
        <div slot="text">我的购物车</div>
      </normal-list-item>
      <normal-list-item>
        <img src="~assets/img/profile/shopping.svg" alt="" slot="image">
        <div slot="text">下载购物车</div>
      </normal-list-item>
    </div>
  </div>
</template>

<script>
  import NormalListItem from './NormalListItem'

  export default {
    name: "normalList",
    components: {
      NormalListItem
    }
  }
</script>

<style scoped>
  .user {
    border-bottom: 15px solid rgba(0, 0, 0, .1);
  }
</style>
