<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :menu-info="menuInfo"
                @changeIndex="changeIndex"></tab-menu>
      <scroll id="content-scroll"
              :probe-type="3"
              :click="true"
              :pull-up-load="true"
              ref="scroll" @scroll="contentScroll">
        <div>
          <tab-content-category :category-info="categoryInfo"></tab-content-category>
          <category-detail :goods="subCategory" @changeType="changeType"></category-detail>
        </div>
      </scroll>
    </div>
    <back-top @click.native="backTop" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll'

  import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'

  import TabMenu from './childComps/TabMenu'
  import CategoryDetail from './childComps/CategoryDetail'
  import TabContentCategory from './childComps/TabContentCategory'

  import {backTopMixin} from 'common/mixin'

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      Scroll,
      CategoryDetail,
      TabContentCategory
    },
    mixins: [backTopMixin],
    data() {
      return {
        menuInfo: {},
        categoryInfo: [],
        subCategory: [],
        currentIndex: 0,
        defaultKey: 3627
      }
    },
    activated() {
      this.$bus.on('imgLoad', this.$refs.scroll.refresh())
    },
    methods: {
      _getMenuInfo() {
        getCategory().then(res => {
          // 保存分类数据
          this.menuInfo = res.data.category;
          // console.log(this.menuInfo)
        })
      },
      _getSubCategory(maitKey) {
        getSubcategory(maitKey).then(res => {
          // console.log(res);
          // console.log(res.data.list);
          this.categoryInfo = res.data.list;
        })
      },
      _getCategoryDetail(miniWallkey, type) {
        getCategoryDetail(miniWallkey, type).then(res => {
          this.subCategory = res;
        })
      },
      changeIndex(index) {
        // console.log(this.menuInfo.list[index]);
        // 改变菜单栏
        const maitKey = this.menuInfo.list[index].maitKey;
        this._getSubCategory(maitKey);
        this.currentIndex = index;
      },
      changeType(type) {
        const miniWallkey = this.menuInfo.list[this.currentIndex].miniWallkey;
        this._getCategoryDetail(miniWallkey, type)
      },
      contentScroll(position) {
        // 1. 判断backTop是否显示
        this.showBackTop = -(position.y) >= 1000;
      },
    },
    created() {
      this._getMenuInfo();
      this._getSubCategory(this.defaultKey);
      this._getCategoryDetail(10062603, 'pop');
    },
  }
</script>

<style scoped>
  .nav-bar {
    color: #fff;
    background-color: var(--color-tint);
    z-index: 9;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    display: flex;
    height: 100%;

    position: absolute;
    /*top: 44px;*/
    /*bottom: 49px;*/
    left: 0;
    right: 0;
  }

  #content-scroll {
    height: 100vh;
  }

  #content-scroll div {
  }
</style>
