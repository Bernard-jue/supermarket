<template>
  <div id="home">
    <nav-bar class="nav-home"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :click="true"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="LoadMore">
      <home-swiper ref="hSwiper" :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <FeatureView/>
      <tab-control :titles="['流行', '新款', '精选']"
                   class="control-tab"
                   @changeType="changeType"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="showBackTop"/>
  </div>
</template>

<script>
  import homeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {POP, SELL, NEW} from 'common/const'

  export default {
    name: "Home",
    components: {
      NavBar,
      homeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: POP,
        showTabControl: false,
        tabOffsetTop: 0,
        showBackTop: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求轮播等数据
      this._getMultiData();

      // 2.请求商品数据
      this._getHomeGoods(POP);
      this._getHomeGoods(SELL);
      this._getHomeGoods(NEW);

      // 3.监听一些事件
      // this.$bus.$on('imgLoad', () => {
      //   this.$refs.scroll.refresh();
      // });
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

      _getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page;

          // 为了可以监听下一次上拉事件，要先结束这次的
          this.$refs.scroll.scroll.finishPullUp();
        })
      },

      /**
       * 事件监听
       * **/
      swiperLoaded() {},
      backClick() {
        this.$refs.scroll.scrollTo();
      },
      changeType(type) {
        this.currentType = type;
      },
      contentScroll(position) {
        this.showBackTop = -(position.y) > 1000
      },
      LoadMore() {
        this._getHomeGoods(this.currentType);

        // 如果不写这个会有个bug，就是不可往下继续滚动了
        // scroll在挂载的时候，会有一个初始图片高度
        // 后续请求更多数据后，高度变化，可以滚动的高度却没有刷新
        // 所以会有一个卡住无法再往下拉的情况
        // 所以要在图片加载完之后，要重新计算一下现在要加载的内容的高度
        this.$refs.scroll.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .nav-home {
    background-color: var(--color-tint);
    color: #ffffff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .control-tab {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }

  .content {
    position: absolute;

    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
