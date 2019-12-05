<template>
    <div>
      <Header title="影院"/>
      <Loading v-if="isLoading"/>
      <div v-else id="content">
<!--          头部二级导航-->
          <div class="filter_cinema">
            <div class="filter-left active">
              <span>全城</span>
              <i class="iconfont icon-xiala"></i>
            </div>
            <div class="hot_center">
            <span>品牌</span>
            <i class="iconfont icon-xiala"></i>
          </div>
            <div class="filter-right">
              <span>综合排序</span>
              <i class="iconfont icon-xiala"></i>
            </div>
          </div>
<!--        主体内容-->
        <div class="cinema_body">
          <Scroller>
            <ul>
              <li v-for="item in cinemaList" :key="item.id">
                  <div>
                      <span>{{item.nm}}</span>
                      <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
                  </div>
                  <div class="address">
                      <span>{{item.addr}}</span>
                      <span>{{item.distance}}</span>
                  </div>
<!--                  <div class="card">-->
<!--                      <div v-for="(value, key) in item.tag" :key="key">{{key | formatCard}}</div>-->
<!--                  </div>-->
              </li>
            </ul>
          </Scroller>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '@/components/Header/Header'
  import Loading from '@/components/Loading/Loading'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Cinema',
    components: {
      Header,
      Loading
    },
    data () {
      return {
        cinemaList: [],
        isLoading: true,
        preCityId: this.city_id
      }
    },
    activated () {
      const cityId = this.city_id

      if (this.preCityId === cityId) {
        return
      }
      this.isLoading = true
      this.$http.get('/api/cinemaList?cityId=' + cityId).then(res => {
        let msg = res.data.msg
        if (msg === 'ok') {
          this.isLoading = false
          this.cinemaList = res.data.data.cinemas
          this.preCityId = cityId
        }
      }).catch(error => {
        console.log(error)
      })
    },
    filters: {
      formatCard (key) {
        let cards = [
          { key: 'allowRefund', value: '改签' },
          { key: 'endorse', value: '退' },
          { key: 'sell', value: '折扣卡' },
          { key: 'snack', value: '小吃' }
        ]
        const result = cards.filter(card => {
          return card.key === key
        })
        console.log(result)
      }
    },
    computed: {
      ...mapGetters(['city_id'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .filter_cinema
    width 100%
    height: 45px
    border-bottom 1px solid #e6e6e6
    display: flex
    justify-content space-around
    align-items center
    background white
    z-index 10
    div
      height 100%
      line-height 45px
      &.active
        border 1px #ff2e62 solid
        color #ff2e62
        border-radius 3px
        padding 0 5px
  .cinema_body
    flex 1
    overflow auto
    ul
      padding 20px
      li
        border-bottom 1px solid #e6e6e6
        margin-bottom 20px
        div
          margin-bottom 10px
          .q
            font-size 11px
            color #f03d37
            .price
              font-size 18px
        .address
          font-size 13px
          color #666
          span:nth-of-type(2)
            float right
        .card
          display flex
          div
            padding 0 3px
            height 15px
            line-height 15px
            border-radius 2px
            color #f90
            border 1px solid #f90
            font-size 13px
            margin-right 5px
            &.or
              color #f90
              border 1px solid #f90
            &.bl
              color #589daf
              border 1px solid #589daf
</style>
