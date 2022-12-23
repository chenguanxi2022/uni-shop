<template>
  <view>
    
    <!-- 头像和昵称 -->
    <view class="avatar-name-box">
      <image :src=" userInfo.avatarUrl ? userInfo.avatarUrl : defaultUrl" @click="toUserInfo"></image>
      <view class="name">
        {{userInfo.name ? userInfo.name : '微信用户'}}
      </view>
    </view>
    
    <!-- 收藏 -->
    <view class="collect-box">
      
    </view>
    
    <!-- 我的订单 -->
    <view class="indent-box">
      
    </view>
    
    <!-- 退出登陆 -->
    <view class="logout-box">
      
    </view>
    
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name:"my-userInfo",
    data() {
      return {
        defaultUrl: 'https://github.githubassets.com/apple-touch-icon-144x144.png'
      };
    },
    computed: {
      ...mapState('m_user', ['userInfo']),
    },
    methods: {
      // 跳转到个人信息页
      toUserInfo() {
        if(JSON.stringify(this.userInfo) !== '{}') return
        uni.navigateTo({
          url: '/subpkg/user_info/user_info'
        })
      }
    }
  }
</script>

<style lang="scss">
.avatar-name-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #efefef;
  image {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  .name {
    color: #333;
    font-size: 15px;
  }
}
</style>