<template>
  <div class="cart-bottom-bar">
    <check-button class="allSelected"
                  v-model="isSelectedAll"
                  @click.native="allOperation"></check-button>
    <span>全选</span>
    <span class="selected-price">合计:</span>
    <span class="total-price">￥{{totalPrice}}</span>
    <span class="buy" @click="isSelected">去结算: ({{cartListLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton';

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      ...mapGetters(['cartLength']),
      totalPrice() {
        return this.cartList.filter(item => {
          // console.log(item)
          return item.checked
        }).reduce((preValue, item) => {
          const price = item.price.substr(1, item.price.length)
          return preValue + parseFloat(price) * item.count
        }, 0).toFixed(2)
      },
      cartListLength() {
        return this.cartList.filter(item => item.checked).length;
      },
      isSelectedAll() {
        // 找到没有被选中的，
        // 如有长度大于0，假设为10，!10为false
        // 如果长度为0，!0返回true 全部选中则为true
        return (!(this.cartList.filter(item => !item.checked).length)) && (parseInt(this.cartLength) !== 0)
      }
    },
    methods: {
      allOperation() {
        if (this.isSelectedAll) {
          // 如果已经是全选了，就全部不选中
          this.cartList.forEach(item => item.checked = false)
        } else {
          // 如果没有全选，就全选
          this.cartList.forEach(item => item.checked = true)
        }
      },
      isSelected() {
        if (this.cartListLength === 0) {
          // 如果没有选中任何一件商品
          this.$toast.show('您还没有选择商品哦~')
        } else {
          // 跳转到支付页面
          this.$router.push({path: '/payment', query: {price: this.totalPrice}})
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .allSelected {
    position: absolute;
    top: 13px;
    left: 12px;
    display: flex;
  }

  .selected-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .buy {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
