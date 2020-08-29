<template>
  <div id="home">
    <nav-bar class="nav-home">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @changeType="changeType"
                 class="home-tab-control"
                 v-show="isTabFixed"
                 ref="topTab"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :click="true"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="LoadMore">
      <home-swiper
        ref="hSwiper"
        :banners="banners"
        @swiperLoaded="swiperLoaded"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <FeatureView/>
      <tab-control ref="contentTab" class="tab-control" @changeType="changeType"></tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backTop" v-show="showBackTop"/>
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

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  import {POP, SELL, NEW} from 'common/const'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: {
      NavBar,
      homeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin, backTopMixin],
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
        saveY: 0,
        isTabFixed: false,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 300);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      // 1.请求轮播等数据
      this._getMultiData();

      // 2.请求商品数据
      this._getHomeGoods(POP);
      this._getHomeGoods(SELL);
      this._getHomeGoods(NEW);

      this.changeType(0);
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('imgLoad', this.itemImageListener)
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
        })
      },

      /**
       * 事件监听
       * **/
      swiperLoaded() {
        this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop
      },
      changeType(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }

        if (this.$refs.contentTab !== undefined && this.$refs.topTab !== undefined) {
          this.$refs.contentTab.currentIndex = index
          this.$refs.topTab.currentIndex = index
        }
      },
      contentScroll(position) {
        // 1. 判断backTop是否显示
        this.showBackTop = -(position.y) >= 1000;

        // 2.决定TabControl是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) >= this.tabOffsetTop;
      },
      LoadMore() {
        this._getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .nav-home {
    background-color: var(--color-tint);
    color: #ffffff;

    /*使用浏览器原生滚动的时候，为了保证导航栏不滚动，现在用了BScroll就不需要了*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .content {
    position: absolute;

    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }

  .home-tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
