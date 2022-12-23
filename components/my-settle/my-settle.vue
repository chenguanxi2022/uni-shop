<template>
  <view>
    <view class="my-settle-container">
      
      <!-- 全选 -->
      <label class="radio" @click="changeAllState">
        <radio color="#C00000" :checked="isChecked">全选</radio>
      </label>
      
      <!-- 合计 -->
      <view class="amount-box">
        合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
      </view>
      
      <!-- 结算 -->
      <view class="btn-settle" @click="settlement">
        结算({{checkedCount}})
      </view>
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from "vuex"
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('m_user', ['addStr']),
      ...mapState('m_user', ['token']),
      // 是否全选
      isChecked() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      // 点击全选按钮事件
      changeAllState() {
        this.updateAllGoodsState(!this.isChecked)
      },
      // 点击结算按钮事件
      settlement() {
        /**
         * 判断是否选择商品，判断是否选择收货地址，判断是否登陆
         */
        if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
        if(!this.token) return uni.$showMsg('请先进行登陆！')
        if(!this.addStr) return uni.$showMsg('请选择收获地址！')
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  font-size: 14px;
  padding-left: 5px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount {
    color: #C00000;
  }
  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>