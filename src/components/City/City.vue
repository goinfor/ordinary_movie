<template>
  <div class="city_body">
    <Loading v-if="isLoading"/>
    <div v-else class="city_list">
        <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
                <li v-for="item in hotList" :key="item.id" @click="handleToCity(item.nm, item.id)">{{item.nm}}</li>
            </ul>
        </div>
        <div class="city_sort">
          <mt-index-list>
            <mt-index-section :index="item.index" v-for="item in cityList" :key="item.index">
              <mt-cell :title="subItem.nm" v-for="subItem in item.list" :key="subItem.id" @click.native="handleToCity(subItem.nm, subItem.id)"></mt-cell>
            </mt-index-section>
          </mt-index-list>
        </div>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/Loading/Loading'
  export default {
    name: 'City',
    data () {
      return {
        cityList: [],
        hotList: [],
        isLoading: true
      }
    },
    mounted () {
      const cityList = window.localStorage.getItem('cityList')
      const hotList = window.localStorage.getItem('hotList')
       if (cityList && hotList) {
         this.hotList = JSON.parse(hotList)
         this.cityList = JSON.parse(cityList)
         this.isLoading = false
       } else {
         this.$http.get('/api/cityList').then((res) => {
           const msg = res.data.msg
           if (msg === 'ok') {
             this.isLoading = false
             const cities = res.data.data.cities
             const { cityList, hotList } = this.formatCityList(cities)
             this.hotList = hotList
             this.cityList = cityList
             window.localStorage.setItem('cityList', JSON.stringify(cityList))
             window.localStorage.setItem('hotList', JSON.stringify(hotList))
           }
         })
       }
    },
    methods: {
      formatCityList (cities) {
        let cityList = []
        let hotList = []
        cities.forEach((item, index) => {
          const fisrtLetter = item.py.substring(0, 1).toUpperCase()
          // 判断数组中书否已经存在当前字母索引
          const flag = cityList.some(item => {
            return item.index === fisrtLetter
          })
          if (!flag) {
            cityList.push(
              {
                index: fisrtLetter,
                list: [
                  { nm: item.nm, id: item.id }
                ]
              }
            )
          } else {
            cityList.forEach(subItem => {
              if (subItem.index === fisrtLetter) {
                subItem.list.push(item)
              }
            })
          }
          if (item.isHot) {
            hotList.push(item)
          }
        })
        cityList.sort((n1, n2) => {
          if (n1.index > n2.index) {
            return 1
          } else if (n1.index < n2.index) {
            return -1
          } else {
            return 0
          }
        })
        return {
          cityList,
          hotList
        }
      },
      handleToCity (name, id) {
        this.$store.dispatch('updateCityInfo', { name, id })
        window.localStorage.setItem('nowCityName', name)
        window.localStorage.setItem('nowCityId', id)
        this.$router.push('/movie/nowPlaying')
      }
    },
    components: {
      Loading
    },
    computed: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .city_body
    margin-top 45px
    display flex
    width 100%
    position absolute
    top 0
    bottom 0
    .city_list
      flex 1
      overflow auto
      background #fff
      .city_hot
        margin 20px 0
        h2
          padding-left 15px
          line-height 30px
          font-size 14px
          background #F0F0F0
          font-weight normal
        ul
          li
            float left
            background #fff
            width 29%
            height 33px
            margin-top 15px
            margin-left 3%
            padding 0 4px
            border 1px solid #e6e6e6
            border-radius 3px
            line-height 33px
            text-align center
            box-sizing border-box
</style>
