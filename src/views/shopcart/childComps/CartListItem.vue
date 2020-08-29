<template>
  <div class="cart-list-item">
    <div class="select-button">
      <check-button v-model="good.checked"
                    @checkClick="checkedChange"></check-button>
    </div>
    <div class="good-image">
      <img :src="good.image" alt="">
    </div>
    <div class="good-info">
      <p class="good-title">{{good.title}}</p>
      <p class="good-desc">{{good.desc}}</p>
      <div class="bottom-info">
        <p class="good-price">￥{{total}}</p>
        <p class="good-count">x{{good.count}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton';

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      good: {
        type: Object,
        default() {
          return null
        }
      }
    },
    methods: {
      checkedChange() {
        this.good.checked = !this.good.checked;
      }
    },
    computed: {
      total() {
        const price = this.good.price.substr(1, this.good.price.length);
        return parseFloat(price) * parseInt(this.good.count)
      }
    }
  }
</script>

<style scoped>
  .cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .select-button {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .good-image {
    padding: 5px;
  }

  .good-image img {
    height: 100px;
    width: 80px;
    display: block;
    border-radius: 5px;
  }

  .good-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .good-title, .good-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .good-info .good-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .bottom-info {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .bottom-info .good-price {
    float: left;
    color: orange;
  }

  .good-count {
    float: right;
  }
</style>
