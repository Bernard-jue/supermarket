<template>
  <div class="cart">
    <nav-bar class="shopCart">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import CartList from './childComps/CartList';
  import CartBottomBar from './childComps/CartBottomBar'

  import NavBar from 'components/common/navbar/NavBar';

  export default {
    name: "Shopcart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    methods: {
    },
    computed: {
      ...mapGetters(['cartLength']),
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .shopCart {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
