<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import player from 'components/play/play'
  export default {
    components: {
      MHeader,
      Tab,
      player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>