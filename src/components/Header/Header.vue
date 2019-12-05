<template>
    <div class="header-container">
      <slot></slot>
      <h1>{{title}}</h1>
    </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      title: {
        type: String,
        value: '在线影院'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.header-container
  width 100%
  height 50px
  color  #fff
  background #ff2e62
  border-bottom 1px solid #ff2e62
  position relative
  h1
    font-size 18px
    text-align center
    line-height 50px
    font-weight normal
  i
    position absolute
    left 5px
    top 50%
    margin-top -13px
    font-size 26px
    &.icon-changyongtubiao-xianxingdaochu-zhuanqu-
      transform rotate(-180deg)
</style>
