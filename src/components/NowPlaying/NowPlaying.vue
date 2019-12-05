<template>
  <div class="movie_body">
    <Loading v-if="isLoading"/>
    <Scroller v-else :handleToScroll = "handleToScroll" :handleToTouchEnd = "handleToTouchEnd">
      <ul>
        <li class="pullDown" v-show="pullDownMsg">{{pullDownMsg}}</li>
        <li v-for="item in movieList" :key="item.id" @click="handleClick(item.id)">
          <div class="pic_show"><img :src="item.img | setWH('128.180')"></div>
          <div class="info_list">
            <h2>{{item.nm}} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
            <p>观众评分： <span class="grade">{{item.sc}}</span></p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
  import Loading from '@/components/Loading/Loading'
  import { mapGetters } from 'vuex'
  export default {
    name: 'NowPlaying',
    data () {
      return {
        movieList: [],
        pullDownMsg: '',
        isLoading: true,
        prevCityId: this.city_id
      }
    },
    activated () {
      let cityId = this.city_id
      if (this.prevCityId === cityId) {
        return
      }
      this.isLoading = true
      this.$http.get('/api/movieOnInfoList?cityId=' + cityId).then(res => {
        let msg = res.data.msg
        if (msg === 'ok') {
          this.movieList = res.data.data.movieList
          this.isLoading = false
          this.prevCityId = cityId
        }
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      handleClick (movieId) {
        this.$router.push('/movie/detail/' + movieId)
      },
      handleToScroll (pos) {
        if (pos.y > 30) {
          this.pullDownMsg = '正在更新'
        }
      },
      handleToTouchEnd (pos) {
        if (pos.y > 30) {
          this.$http.get('/api/movieOnInfoList?cityId=11').then(res => {
            let msg = res.data.msg
            if (msg === 'ok') {
              this.pullDownMsg = '更新成功'
              setTimeout(() => {
                this.movieList = res.data.data.movieList
                this.pullDownMsg = ''
              }, 1000)
            }
          })
        }
      }
    },
    components: {
      Loading
    },
    computed: {
      ... mapGetters(['city_id'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .movie_body
    flex 1
    height 100%
    ul
      margin 0 12px 120px
      overflow hidden
      li
        margin-top 12px
        display flex
        align-items center
        border-bottom 1px #e6e6e6 solid
        padding-bottom 10px
        .pic_show
          width 64px
          height 90px
          img
            width 100%
        .info_list
          margin-left 10px
          flex 1
          position relative
          img
            width 60px
          h2
            font-size 17px
            line-height 24px
            width 150px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          p
            font-size 13px
            color #666
            line-height 22px
            width 200px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            .grade
              font-weight 700
              color #faaf00
              font-size 15px
            img
              width 50px
              position absolute
              right 10px
              top 5px

        .btn_mall
          width 47px
          height 27px
          line-height 28px
          text-align center
          background-color #f03d37
          color #fff
          border-radius 4px
          font-size 12px
          cursor pointer
        .btn_pre
          background-color #3c9fe6
        .pullDown
          margin 0
          padding 0
          border none
</style>
