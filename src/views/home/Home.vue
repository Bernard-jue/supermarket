<template>
  <div id="home">
    <nav-bar class="nav-home"><div slot="center">购物街</div></nav-bar>
    <home-swiper ref="hSwiper" :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import homeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'

  import {getHomeMultidata} from 'network/home'
  import {POP, SELL, NEW} from 'common/const'

  export default {
    name: "Home",
    components: {
      NavBar,
      homeSwiper,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 1, list:[]},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []},
        },
        currentType: POP,
        showTabControl: false,
        tabOffsetTop: 0,
        saveY: 0
      }
    },
    computed: {
    },
    created() {
      // 1.请求轮播等数据
      this._getMultiData();

      // 2.请求商品数据

      // 3.监听一些事件
      this.$bus.$on('imgLoad', () => {
        this.$refs.scroll.refresh();
      });
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scrollY
    },
    methods: {
      /**
       * 网络请求
       * **/
      _getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      /**
       * 事件监听
       * **/
      swiperLoaded() {
        // this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop;
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .nav-home {
    background-color: var(--color-tint);
    color: #ffffff;
    position: relative;
    z-index: 9;
  }
</style>
