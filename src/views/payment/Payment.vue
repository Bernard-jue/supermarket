<template>
  <div class="payment" ref="pay">
    <nav-bar class="nav-bar">
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center">确认订单</div>
    </nav-bar>
    <scroll :click="true">
      <div class="buyerInfo">收货人信息</div>
      <div class="ItemInfo">
        <div class="store">
          <img src="" alt="">
          <span class="text"></span>
        </div>
        <div class="commodity" v-for="(item, index) in isSelectedItem">
          <img :src="item.image" alt="">
          <p class="desc">{{item.desc}}</p>
          <div class="price">
            ￥<p class="forntPrice"></p>.
            <p class="behindPirce"></p>
          </div>
          <p class="amount">x{{item.count}}</p>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll';

  export default {
    name: "Payment",
    components: {
      NavBar,
      Scroll
    },
    data() {
      return {
        isSelectedItem: [],
        frontPrice: [],
        behindPrice: []
      }
    },
    mounted() {
      this.$bus.$on('buy', (list) => {
        // console.log(list)
        this.isSelectedItem = list
        console.log(this.isSelectedItem)
      })
    },
    methods: {
      backClick() {
        this.$router.back();
      }
    },
    computed: {
      price() {
        // 正则表达式筛选价格
        // 选出以.结尾的前半部分
        // 和以.开头的后半部分
        // 分别用数组存起来，然后根据index显示
      }
    },
    watch: {

    }
  }
</script>

<style scoped>
  .payment {
    background-color: #eee;
    height: 100vh;
    position: relative;
    z-index: 1;
  }

  .nav-bar {
    background-color: #eee;
  }

  .nav-bar img {
    position: absolute;
    left: 15px;
    top: 10px;
  }

  .buyerInfo {
    height: 100px;
    width: 300px;
    background-color: #fff;
    border-radius: 20px;
    margin: 10px 10px;
  }

  .ItemInfo {
    background-color: #fff;
    border-radius: 20px;
    margin: 10px 10px;
  }

  .commodity {
    margin: 15px 10px;
  }

  .commodity img {
    width: 80px;
    height: 100px;
  }

  .desc {
    font-size: 12px;
    width: 150px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;


    position: relative;
    left: 90px;
    bottom: 90px;
  }

  .amount {
    float: right;

    position: relative;
    bottom: 115px;
    right: 0;
  }
</style>
