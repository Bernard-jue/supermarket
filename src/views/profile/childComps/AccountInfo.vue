<template>
  <div class="account-info">
    <div class="item">
      <div class="data">
        <span class="number">{{getOverage}}</span>元
      </div>
      <div class="description">
        <span>我的余额</span>
      </div>
    </div>
    <div class="item">
      <div class="data">
        <span class="number">{{coupon}}</span>个
      </div>
      <div class="description">
        <span>我的优惠</span>
      </div>
    </div>
    <div class="item">
      <div class="data">
        <span class="number">{{points}}</span>分
      </div>
      <div class="description">
        <span>我的积分</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AccountInfo",
    props: {
      overage: {
        type: Number,
        default() {
          return 0
        }
      },
      coupon: {
        type: Number,
        default() {
          return 0
        }
      },
      points: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    computed: {
      getOverage() {
        return this.overage.toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .account-info {
    display: flex;
    height: 100px;

    border-bottom: 15px solid rgba(0, 0, 0, .1);
  }

  .account-info .item {
    width: 100%;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  .data, .description {
    background-color: #fff;
    text-align: center;
    margin: auto 0;
  }

  .overage span {
    margin: 0 auto;
  }

  .item {
    font-size: 13px;
    padding: 18px 0;
  }

  .item .number {
    font-size: 24px;
    color: var(--color-high-text)
  }
</style>
