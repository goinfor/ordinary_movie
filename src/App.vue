<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <TabBar />
  </div>
</template>

<script>
  import TabBar from './components/TabBar/TabBar'

  export default {
    components: {
      TabBar
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "assets/css/common.styl"
@import "assets/css/iconfont/iconfont.css"

#app
  height 100%
</style>
