<template>
  <div class="param-info" v-if="Object.keys(ParamsInfo).length !== 0">
    <div class="parameter">
      <table class="params-table" v-for="(table, index) in ParamsInfo.size" :key="index">
        <tr class="tr" v-for="(tr, indexy) in table" :key="indexy">
          <td class="td" v-for="(td, indexz) in tr" :key="indexz">{{td}}</td>
        </tr>
      </table>
      <table class="product-info">
        <tr v-for="(item, index) in ParamsInfo.info" :key="index" class="tr">
          <td v-for="(value, classification) in item" :class="classification" class="td">
            {{value}}
          </td>
        </tr>
      </table>
      <div class="param-image" v-if="Object.keys(ParamsInfo).image !== null">
        <img :src="ParamsInfo.image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamsInfo",
    props: {
      ParamsInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    font-size: 12px;
    border-bottom: 5px solid rgba(100, 100, 100, .1);
    /*margin-top: 15px;*/
  }

  .parameter {
    margin: 20px 13px 0 13px;
  }

  .params-table .tr .td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .params-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 7px 8px;
  }

  .params-table .tr {
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1)
  }

  .params-table .td {
    width: 60px;
    height: 36px;
  }

  .product-info .tr .td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .key {
    width: 80px;
    height: 36px;
  }

  .value {
    color: var(--color-high-text);
  }

  .param-image img {
    width: 100%;
  }
</style>
