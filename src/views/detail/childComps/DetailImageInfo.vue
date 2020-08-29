<template>
  <div class="Image-info" v-if="Object.keys(ImageInfo).length !== 0">
    <div class="desc-info clear-fix">
      <div class="start"></div>
      <div class="desc">{{ImageInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ImageInfo.detailImage[0].key}}</div>
    <div class="info-img">
      <img :src="item" alt=""
           v-for="(item, index)  in ImageInfo.detailImage[0].list"
           :key="index"
           @load="imgLoad">
    </div>
  </div>
</template>

<script>
  import {debounce} from 'common/utils'

  export default {
    name: "DetailImageInfo",
    props: {
      ImageInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() {
        // 用完再加
        // if (++this.counter === this.imagesLength) {
        const Loaded = debounce(() => {
          this.$emit('detailImageLoad')
        }, 100)

        Loaded();
        // }
      }
    },
    watch: {
      detailInfo() {
        this.imagesLength = this.ImageInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  .Image-info {
    padding: 15px 0 0 0;
    border-bottom: 5px solid #f2f5f8;
    margin-top: 20px;
  }

  .desc-info {
    padding: 0 15px;
  }

  .desc {
    font-size: 13px;
    padding: 15px 0;
  }

  .desc-info .start, .desc-info .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .desc-info .start {
    float: left;
  }

  .desc-info .end {
    float: right;
  }

  .desc-info .start::before, .desc-info .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333333;
    bottom: 0;
  }

  .desc-info .end::after {
    right: 0;
  }

  .info-key {
    font-size: 14px;
    padding: 0 15px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .info-img img {
    width: 100%;
  }
</style>
