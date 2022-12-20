<template>
  <view>
    <view class="goods-item">
      <!-- 左侧 -->
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
      </view>
      <!-- 右侧 -->
      <view class="goods-item-right">
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-info-box">
            <!-- 价格 -->
            <view class="goods-price">￥{{goods.goods_price | tofixed }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        // 默认空白图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      tofixed(num) {
        // 处理 异常价格，以及把数字处理为带两位小数点的数字
       return Number(num) === 0 ? '888.88' : Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  &-left {
    margin-right: 5px;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-price {
      font-size: 16px;
      color: #C00000;
    }
  }
}
</style>