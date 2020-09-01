<template>
  <div class="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">我的账户</div>
    </nav-bar>
    <user-info></user-info>
    <account-info></account-info>
    <normal-list></normal-list>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  import UserInfo from './childComps/UserInfo';
  import AccountInfo from './childComps/AccountInfo';
  import NormalList from './childComps/NormalList'

  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      AccountInfo,
      NormalList
    }
  }
</script>

<style scoped>
  .profile-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
