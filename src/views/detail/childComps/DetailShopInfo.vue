<template>
  <div class="shop-info">
    <div class="shop-detail-info">
      <div class="shop">
        <img :src="shopInfo.shopLogo" alt="">
        <span class="shop-name">{{shopInfo.name}}</span>
      </div>
      <div class="shop-data">
        <table>
          <tr>
            <td class="shop-statistics">
              <table class="shop-statistics-table">
                <tr class="detailed-data">
                  <td>
                    <div><span>{{sells}}</span></div>
                  </td>
                  <td>
                    <div><span>{{shopInfo.cGoods}}</span></div>
                  </td>
                </tr>
                <tr class="description-data">
                  <td>
                    <span>总销量</span>
                  </td>
                  <td>
                    <span>全部宝贝</span>
                  </td>
                </tr>
              </table>
            </td>
            <td class="shop-score">
              <table class="shop-score-table">
                <tr v-for="item in shopInfo.score">
                  <td>{{item.name}}</td>
                  <td :class="{scoreBetter: item.isBetter}" class="score">{{item.score}}</td>
                  <td v-if="item.isBetter"><span class="better">高</span></td>
                  <td v-else><span class="worse">低</span></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      <div class="shop-home">
        <button class="shop-home-button">进店逛逛</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shopInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      sells() {
        if (this.shopInfo.cSells > 10000) {
          return (this.shopInfo.cSells / 10000).toFixed(1) + '万'
        } else {
          return this.shopInfo.cSells
        }
      }
    }
  }
</script>

<style scoped>
  .shop-detail-info {
    border-bottom: 5px solid #F5F5F5;
  }

  .shop {
    margin: 25px 8px 15px 8px;
  }

  .shop-info img {
    height: 50px;
    border-radius: 30px;
  }

  .shop-name {
    position: relative;
    bottom: 20px;

    color: #666666;
    font-size: 15px;
    padding-left: 10px;
  }

  .shop-data {
    margin: 15px 8px 0 0;
    text-align: center;
  }

  .shop-statistics-table {
    border-collapse: separate;
    border-spacing: 20px 10px;
    box-shadow: 1px 0 1px rgba(100, 100, 100, .2);
  }

  .detailed-data span {
    font-size: 20px;
  }

  .description-data {
    font-size: 13px;
  }

  .shop-score-table {
    margin: 0 0 0 15px;
    font-size: 13px;
    border-collapse: separate;
    border-spacing: 7px 8px;
  }

  .scoreBetter {
    color: var(--color-high-text) !important;
  }

  .better {
    color: #fff;
    background-color: var(--color-high-text);
  }

  .worse {
    color: #fff;
    background-color: green;
  }

  .score {
    color: green;
  }

  .shop-home {
    font-size: 13px;
    text-align: center;
    padding: 10px 0 25px 0;
  }

  .shop-home-button {
    height: 30px;
    width: 150px;
    border-radius: 15px;
    background-color: #f6f6f6;
    border: transparent;
  }
</style>
