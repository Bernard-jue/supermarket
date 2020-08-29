import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);

    this.itemImageListener = () => {
      this.newRefresh()
    };
    // 3.监听一些事件
    this.$bus.$on('imgLoad', this.itemImageListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo();
    }
  }
}
