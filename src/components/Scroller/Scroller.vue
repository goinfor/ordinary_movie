<template>
    <div class="wrapper">
      <slot></slot>
    </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  export default {
    name: 'Scroller',
    props: {
      handleToScroll: {
        type: Function,
        default: function () {}
      },
      handleToTouchEnd: {
        type: Function,
        default: function () {}
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      },200)
    },
    methods: {
      _initScroll () {
        let scroll = new BScroll('.wrapper', {
          click: true,
          probeType: 1
        })
        scroll.on('scroll', (pos) => {
          this.handleToScroll(pos)
        })
        scroll.on('touchEnd', (pos) => {
          this.handleToTouchEnd(pos)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.wrapper
  height 100%
</style>
