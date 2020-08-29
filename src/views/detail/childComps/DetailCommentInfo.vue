<template>
  <div class="comment-info">
    <div class="comment-header">
      <div class="title">用户评论</div>
      <div class="more-info">更多</div>
    </div>
    <div class="comment-body" v-if="CommentInfo.user">
      <img :src="CommentInfo.user.avatar" alt="">
      <span>{{CommentInfo.user.uname}}</span>
    </div>
    <div class="comment-content">
      <span>{{CommentInfo.content}}</span>
      <div class="extraInfo">
        <span class="time">{{CommentInfo.created | showDate}}</span>
        <span class="style">{{CommentInfo.style}}</span>
      </div>
    </div>
    <div class="comment-img">
      <img :src="item" v-for="(item, index) in CommentInfo.images" alt="" :key="index" @load="imgLoad">
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'

  export default {
    name: "DetailCommentInfo",
    props: {
      CommentInfo: {
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
    filters: {
      showDate: function (createdTime) {
        let date = new Date(createdTime * 1000);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    methods: {
      imgLoad() {
        // 用完再加
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      CommentInfo() {
        // this.imagesLength = this.CommentInfo.images.length
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 4px 11px 20px;
    border-bottom: 2px solid rgba(0, 0, 0, .1)
  }

  .comment-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 2px solid rgba(0, 0, 0, .1)
  }

  .title {
    font-size: 13px;
    color: var(--color-text);
    float: left;
  }

  .more-info {
    color: var(--color-text);
    font-size: 11px;
    float: right;
  }

  .comment-body {
    padding: 10px 0 5px;
  }

  .comment-body img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .comment-body span {
    position: relative;
    font-size: 15px;
    top: -15px;
    left: 5px;
  }

  .comment-content {
    padding: 0 5px 5px;
  }

  .comment-content span {
    font-size: 12px;
    line-height: 1.5;
  }

  .comment-content .style {
    font-size: 11px;
  }

  .extraInfo .time {
    padding-right: 5px;
  }

  .comment-img img {
    height: 70px;
    width: 70px;
    margin-right: 5px;
  }
</style>
