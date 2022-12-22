<template>
  <view class="cart-container" v-if="cart.length">
    <!-- 收货地址 -->
    <my-address></my-address>
    
    <!-- 购物车商品列表标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(item,idx) in cart" :key="idx">
        <uni-swipe-action-item :right-options="options" @click="delGoods(item)">
          <my-goods :goods="item" :showRadio="true" @changeChecked="changeChecked" :showNumBox="true" @numChange="numChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  
  <!-- 购物车为空时展示页面 -->
  <view class="kong" v-else>
    <image src="https://p1.itc.cn/q_70/images03/20201020/4dae0b16e59743e3901a1436841f860f.jpeg"></image>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from "../../mixins/tarBar-badge.js"
  import { mapState, mapMutations } from "vuex"
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {
        options: [
          {
            text: "删除",
            style: {
              backgroundColor: '#C00000',  // 看官网，必须字符串
            }
          }
        ],
      };
    },
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGood']),
      // 购物车中商品是否被选
      changeChecked(e) {
        this.updateGoodsState(e)
      },
      // 购物车中商品数量变化
      numChange(e) {
        this.updateGoodsCount(e)
      },
      // 删除购物车中商品
      delGoods(goods) {
        this.removeGood(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
.cart-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 40px;
  border-bottom: 1px solid #efefef;
  padding-left: 5px;
  .cart-title-text {
    margin-left: 10px;
  }
}
.cart-container {
  padding-bottom: 50px;
}
.kong {
  width: 750rpx;
  height: 100vh;
  image {
    width: 100%;
    height: 100%;
    opacity: .2;
  }
}
</style>
