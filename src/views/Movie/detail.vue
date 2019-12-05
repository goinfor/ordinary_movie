<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-" @click="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading" />
        <div class="detail_list" v-else>
          <div class="detail_list_bg" :style="{'bacoground-image': 'url('+ detailMovie.img.replace(/w\.h/, '148.200') + ')'}"></div>
          <div class="detail_list_filter"></div>
          <div class="detail_list_content">
            <div class="detail_list_img">
              <img :src="detailMovie.img | setWH('148.200')" alt="">
            </div>
            <div class="detail_list_info">
              <h2>{{detailMovie.nm}}</h2>
              <p>{{detailMovie.enm}}</p>
              <p>{{detailMovie.sc}}</p>
              <p>{{detailMovie.cat}}</p>
              <p>{{detailMovie.src}}/{{detailMovie.dir}}</p>
              <p>{{detailMovie.pubDesc}}</p>
            </div>
        </div>
        </div>
        <div class="detail_intro">
          <p>{{detailMovie.dra}}</p>
        </div>
<!--        <div class="detail_player swiper-container">-->
<!--          <ul class="swiper-wrapper">-->
<!--            <li class="swiper-slide" v-for="(item,index) in detailMovie.photos" :key="index">-->
<!--              <div>-->
<!--                <img :src="item | setWH('148.200')" alt="">-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
          <mt-swipe :auto="4000" :show-indicators="false" class="detail_player">
            <mt-swipe-item v-for="(item,index) in detailMovie.photos" :key="index">
              <img :src="item | setWH('544.600')" alt="">
            </mt-swipe-item>
          </mt-swipe>
<!--        </div>-->
	</div>
</template>

<script>

import Header from '@/components/Header/Header'
import Loading from '@/components/Loading/Loading'

export default {
    name : 'detail',
    data () {
      return {
        isLoading: true,
        detailMovie: {}
      }
    },
    props: ['movieId'],
    components: {
      Header,
      Loading
    },
  methods: {
    handleToBack () {
      this.$router.back()
    }
  },
  mounted () {
      this.$http.get('/api/detailmovie?movieId=' + this.movieId).then((res) => {
        let msg = res.data.msg
        if (msg === 'ok') {
          this.detailMovie = res.data.data.detailMovie
          this.isLoading = false
        }
      })
  }
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
#detailContrainer.slide-enter-active{ animation:.3s slideMove;}
@keyframes slideMove{
    0%{ transform : translateX(100%); }
    100%{ transform : translateX(0); }
}
.contentDetail{ display: block; margin-bottom:0;}
.detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
.detail_intro{ padding: 10px;}
.detail_player{ margin:20px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player img{ width:100%; margin-bottom: 5px;}
.detail_player p:nth-of-type(2){ color:#999;}
</style>
