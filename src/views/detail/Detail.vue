<template>
  <div class="detail">
    <detail-nav-bar @itemClick="selectIndex"
                    :current-index="currentIndex"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :swiper-image="SwiperImg"/>
      <detail-goods-info :goods-info="goods"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-image-info :image-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-params-info :params-info="paramsInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="goodsList" class="goodsList" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailImageInfo from './childComps/DetailImageInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {debounce} from 'common/utils'

  import {getDetail, Goods, ParamsInfo, getRecommend} from 'network/detail'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailGoodsInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        SwiperImg: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        goodsList: [],
        themeTopYs: [],
        geThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      // 获取iid
      this.iid = this.$route.query.iid;

      // 请求详情数据
      this._getDetail(this.iid);

      // 请求推荐数据
      this._getGoodsList();
    },
    destroyed() {
      this.$bus.$off('imgLoad', this.itemImageListener)
    },
    methods: {
      ...mapActions({
        add: 'addCart'
      }),
      _getDetail(iid) {
        getDetail(iid).then(res => {
          // console.log(res);
          const data = res.result;
          // console.log(data);

          // 1.保存轮播图片数据
          this.SwiperImg = data.itemInfo.topImages;

          // 保存商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // 保存商家信息
          this.shopInfo = data.shopInfo;
          // console.log(this.shopInfo);

          // 保存图片信息
          this.detailInfo = data.detailInfo;
          // console.log(this.detailInfo)

          // 保存参数信息
          this.paramsInfo = new ParamsInfo(data.itemParams.info, data.itemParams.rule);
          // console.log(this.paramsInfo);

          // 保存评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      _getGoodsList() {
        getRecommend().then(res => {
          this.goodsList = res.data.list;
          // console.log(res.data.list)
        })
      },
      detailImageLoad() {
        // console.log('---')
        this.$refs.scroll.refresh();
        // console.log('---')

        // 防抖函数
        this.geThemeTopY = debounce(() => {
          // 初始化记录高度的数组
          this.themeTopYs = [];
          // 保存在图片加载之后的组件高度
          this.themeTopYs.push(0);
          // 导航栏的长度要减掉
          this.themeTopYs.push(this.$refs.params.$el.offsetTop -44);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
          this.themeTopYs.push(Number.MAX_VALUE);

          // console.log(this.themeTopYs)
        }, 100)

        this.geThemeTopY();
      },
      selectIndex(index) {
        this.currentIndex = index;
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      _listenThemeScroll(currentPosition) {
        let length = this.themeTopYs.length;

        for (let i = 0; i < length; i++) {
          // i + 1 是因为数组里面永远有一个Number的最大值，不然按照这个逻辑，是没有办法显示最后一个的
          if (currentPosition >= this.themeTopYs[i] && currentPosition < this.themeTopYs[i + 1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      },
      contentScroll(position) {
        // 监测BackTop是否显示
        this.showBackTop = -position.y > 1000;

        // 监测移动到的位置，来改变导航栏上的显示
        this._listenThemeScroll(-position.y);
      },
      addToCart() {
        const product = {}
        product.image = this.SwiperImg[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.price;
        // console.log(product.price)
        product.iid = this.iid;
        // console.log(this.goods)

        this.add(product).then(res => {
          // console.log(res);
          this.$toast.show(res)
        })
        // this.$store.dispatch('addCart', product)
      }
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px - 49px);
  }
</style>
