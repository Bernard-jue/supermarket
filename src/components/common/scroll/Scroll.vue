<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: false
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      // 默认情况下scroll是不可以实时监听滚动位置的
      // probe 侦测
      // 0, 1: 都是不侦测实时位置
      // 2: 在手指滚动过程中侦测，手指离开后的惯性滚动过程中不侦测
      // 3: 只要都是滚动，都侦测
      // click: 默认为false，为false时，所有的scroll里面div的点击事件不会有任何响应
      // 但是button的监听事件即使click为false也是可以的
      // pullUpload: 上拉加载事件
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad
      })

      this.scroll.on('scroll', (position) => {
        // 打印位置信息
        // console.log(position);
        // 发射位置信息，让需要用到的位置信息的组件自己决定如何去使用
        this.$emit('scroll', position)
      })

      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多');
        // 发送网络请求，请求下一页的数据
        this.$emit('pullingUp')

        // 等数据请求完成，并且将新的数据压显示出来后
        // 如果没有finishPullUp就不能捕捉下一次上拉
      })
    },
    methods: {
      scrollTo(x = 0, y = 0, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
