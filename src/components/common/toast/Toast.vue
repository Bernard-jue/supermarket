<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 1500) {
        this.isShow = true;
        this.message = message;

        setTimeout(() => {
          this.isShow = false;
          this.message = 0;
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    /*font-size: 12px;*/
    text-align: center;
    width: 200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;

    z-index: 2;

    color: #fff;
    background-color: rgba(0, 0, 0, .75);
  }
</style>
