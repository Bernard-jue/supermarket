<template>
  <div class="user-info">
    <img src="~assets/img/profile/avatar.svg" alt="">
    <div class="login">
      <span class="login-register">登录/注册</span><br/>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span class="bind">暂无绑定手机</span>
      </div>
    </div>
    <div class="toLogin">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo"
  }
</script>

<style scoped>
  .user-info {
    display: flex;
    background-color: var(--color-tint);
    padding: 0 15px;
  }

  .user-info img {
    width: 70px;
    height: 70px;
  }

  .login {
    margin: 15px 10px;
    flex: 1;
  }

  .login-register {
    font-size: 16px;
    color: #fff;
  }

  .login img {
    width: 20px;
    height: 20px;
  }

  .bind {
    font-size: 12px;
    color: #fff;
    text-align: center;
  }

  .phone img {
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }

  .toLogin {
    float: right;

    margin: 25px 0;
  }

  .toLogin img {
    width: 20px;
    height: 20px;
  }
</style>
