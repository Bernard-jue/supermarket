<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll"
            :probe-type="3"
            :click="true">
      <div>
        <cart-list-item v-for="item in cartList"
                        :key="item.iid"
                        :good="item"></cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import Scroll from 'components/common/scroll/Scroll';

  import CartListItem from './CartListItem'

  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
