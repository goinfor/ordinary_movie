<template>
    <div class="movie-container">
      <Header title="在线电影"/>
      <div id="content">
        <div class="movie_menu">
          <router-link tag="div" to="/movie/city" class="city_name">
            <span>{{city_name}}</span><i class="iconfont icon-xiala"></i>
          </router-link>
          <div class="hot_swtich">
            <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
            <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
          </div>
          <router-link tag="div" to="/movie/search" class="search_entry">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </div>
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
      <router-view name="detail"/>
    </div>
</template>

<script>
  import Header from '@/components/Header/Header'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Movie',
    components: {
      Header
    },
    computed: {
      ...mapGetters(['city_name', 'city_id'])
    },
    mounted() {
      this.$http.get('/api/getLocation').then((res) => {
        const msg = res.data.msg
        if (msg === 'ok') {
          const name = res.data.data.nm
          const id = res.data.data.id
          if (this.city_id !== id){
            this.$alert({
              title: '提示',
              confirmButtonText: '切换城市',
              message: '当前定位城市为' + name + '，是否更换？',
              showCancelButton: true
            }).then(action => {
              if (action === 'confirm') {
                this.$store.dispatch('updateCityInfo', {name, id})
              }
            });
          }
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

.movie-container
  height 100%
  overflow hidden
  #content
    height 100%
    .movie_menu
      width 100%
      height: 45px
      border-bottom 1px solid #e6e6e6
      display: flex
      justify-content space-between
      align-items center
      background white
      z-index 10
      .city_name
        margin-left 20px
        height 100%
        line-height 45px
        &.active
          color #ef4238
          border-bottom 2px #ef4238 solid
        &.router-link-active
          color #ef4238
          border-bottom 2px #ef4238 solid
      .hot_swtich
        display flex
        height 100%
        line-height 45px
      .hot_item
        font-size 15px
        color #666
        width 80px
        text-align center
        margin 0 12px
        font-weight 700
        &.active
          color: #ef4238
          border-bottom 2px #ef4238 solid
        &.router-link-active
          color #ef4238
          border-bottom 2px #ef4238 solid
      .search_entry
        margin-right 20px
        height 100%
        line-height 45px
        i
          font-size:24px
          color:red
        &.active
          color #ef4238
          border-bottom 2px #ef4238 solid
        &.router-link-active
          color #ef4238
          border-bottom 2px #ef4238 solid
.slide-enter-active
  animation 13s detailMove
@keyframes detailMove
  0%
    transform translateX(100%)
  100%
    transform translateX(0)
</style>
