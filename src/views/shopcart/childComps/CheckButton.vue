<template>
  <div class="check-button" @click="CheckButtonClick">
    <img v-if="isSelected"
         src="~assets/img/cart/tick.svg"
         alt=""
         :class="{'active': isSelected}">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      value: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        isSelected: this.value
      }
    },
    methods: {
      CheckButtonClick() {
        this.$emit('checkClick')
      }
    },
    watch: {
      value: function (newValue) {
        this.isSelected = newValue;
      }
    }
  }
</script>

<style scoped>
  .check-button {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .active {
    background-color: red;
    border-radius: 50%;
  }
</style>
