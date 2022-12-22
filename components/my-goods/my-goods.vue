<template>
  <view>
    <view class="goods-item">
      <!-- 左侧 -->
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="handleClick"></radio>
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
      </view>
      <!-- 右侧 -->
      <view class="goods-item-right">
        <view class="goods-name">{{goods.goods_name}}</view>
        <view class="goods-info-box">
            <!-- 价格 -->
            <view class="goods-price">￥{{goods.goods_price | tofixed }}</view>
            <!-- 数字选择框 -->
            <uni-number-box @change="countChange" min="1" :value="goods.goods_count" v-if="showNumBox"></uni-number-box>
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
      },
      // 是否展示 radio
      showRadio: {
        type: Boolean,
        default: false
      },
      // 是否展示 numberBox
      showNumBox: {
        type: Boolean,
        default: false
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
    },
    methods: {
      // radio 点击事件
      handleClick() {
        this.$emit('changeChecked',{
          // 商品id 和 勾选状态
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // 处理 numberBox 改变
      countChange(val) {
        this.$emit('numChange',{
          // 商品id 和 当前数量
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    flex:1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price {
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>