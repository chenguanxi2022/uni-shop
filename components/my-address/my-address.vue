<template>
  <view>
    <!-- 选择收货地址 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">选择收货地址</button>
    </view>
    
    <!-- 收货地址信息 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>{{address.userName}}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">手机号：<text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收获地址：</view>
        <view class="row2-right">{{addStr}}</view>
      </view>
    </view>
    
    <!-- 底部边框线 -->
    <view class="hr"></view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters} from "vuex"
  export default {
    name:"my-address",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addStr'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      // 选择收货地址
      async chooseAddress() {
        // 返回值是一个 Promis，await后，第一项为错误对象，第二项为成功之后的收获地址对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        
        // 判断是否选择收货地址成功
        if(err === null && succ.errMsg === 'chooseAddress:ok') {
          // 给 store 中 address 赋值
          this.updateAddress(succ)
        }
      }
    }
  }
</script>

<style lang="scss">
.address-choose-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.address-info-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  padding: 0 5px;
  height: 90px;
  .row1 {
    display: flex;
    justify-content: space-between;
    &-right {
      display: flex;
      align-items: center;
      .phone {
        margin-right: 5px;
      }
    }
  }
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;
    &-left {
      white-space: nowrap;
    }
  }
}
.hr {
  width: 100%;
  height: 5px;
  background-color: #C00000;
  opacity: .5;
}
</style>