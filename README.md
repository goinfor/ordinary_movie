# 在线电影

## 项目介绍
这是一个基于vue + vue-cli3 + mint-ui + axios + stylus搭建的在线购买电影票的app
## 项目界面展示

## quick start
```
npm install
npm run serve
```
## 接口
+ 正在热映
```
http://39.97.33.178/api/movieOnInfoList?cityId=10
```
+ 即将上映
```
http://39.97.33.178/api/movieComingList?cityId=10
```
+ 搜索
```
http://39.97.33.178/api/searchList?cityId=10&kw=a
```
+ 城市
```
http://39.97.33.178/api/cityList
```
+ 电影详情
```
http://39.97.33.178/api/detailmovie?movieId=345808
```
+ 影院
```
http://39.97.33.178/api/cinemaList?cityId=10
```
+ 城市定位
```
http://39.97.33.178/api/getLocation
```
### 项目截图
![图片](https://github.com/goinfor/goinfor.github.io/blob/master/images/WechatIMG16.jpeg)
![图片](https://github.com/goinfor/goinfor.github.io/blob/master/images/WechatIMG17.jpeg)
![图片](https://github.com/goinfor/goinfor.github.io/blob/master/images/WechatIMG18.jpeg)
![图片](https://github.com/goinfor/goinfor.github.io/blob/master/images/WechatIMG19.jpeg)
![图片](https://github.com/goinfor/goinfor.github.io/blob/master/images/WechatIMG21.jpeg)
### 不足
没有实现用户相关接口
