<template>
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,idx) in goods_info.pics" :key="idx">
        <image :src="item.pics_big" @click="preview(idx)"></image>
      </swiper-item>
    </swiper>
    
    <!-- 商品信息 -->
    <view class="goods-info-box">
      <!-- 价格 -->
      <view class="goods-price">￥{{goods_info.goods_price}}</view>
      <!-- 信息主体 -->
      <view class="goods-info-body">
        <!-- 商品名 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" color="gray" size="18"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 快递 -->
      <view class="yf">快递：包邮</view>
    </view>
    
    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_info: {},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    methods: {
      // 获取商品详情数据
      async getGoodsDetail(goods_id) {
        const { data: res } = await uni.$http.get("/api/public/v1/goods/detail",{ goods_id })
        if(res.meta.status !== 200) return uni.$showMsg()
        // 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
        // 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      // 实现图片预览
      preview(idx) {
        uni.previewImage({
          current: idx,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      // 点击 左侧icon图标
      onClick (e) {
        if(e.content.text === '购物车') {
          // 切换到购物车
          uni.switchTab({
            url: "/pages/cart/cart"
          })
        }
      },
      buttonClick (e) {
        console.log(e)
        this.options[1].info++
      }
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    }
  }
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
  padding: 10px;
  padding-right: 0;
  .goods-price {
    color: #C00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    .favi {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 120px;
      font-size: 12px;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods-detail-container {
  padding-bottom: 50px;
}
.goods_nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
