<template>
  <view class="userInfo-container">
    <form @submit="submitEvent">
      <!-- 头像 -->
      <button open-type="chooseAvatar" @chooseavatar="chooseAvatar">
        <view class="avatar box">
          <view>头像</view>
          <image :src="defaultUrl"></image>
        </view>
      </button>
      
      <!-- 昵称 -->
      <view class="name box">
        <view>昵称</view><input type="nickname" placeholder="请输入昵称" name="name"/>
      </view>
      
      <!-- 确定btn -->
      <button form-type="submit" class="btn">确定</button>
    </form>
  </view>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  export default {
    data() {
      return {
        name: '',
        defaultUrl: 'https://github.githubassets.com/apple-touch-icon-144x144.png'
      };
    },
    computed: {
      ...mapState('m_user', ['userInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
      // 选择头像
      chooseAvatar(e) {
        this.defaultUrl = e.detail.avatarUrl
      },
      // 获取昵称
      submitEvent(e) {
        this.name = e.detail.value.name
        // 1.将用户信息保存在 vuex 中
        this.updateUserInfo({
          name: this.name,
          avatarUrl: this.defaultUrl
        })
        // 2.获取 token
        this.getToken()
        // 3.跳转到个人中心
        // uni.switchTab({
        //   url:'/pages/my/my'
        // })
      },
      async getToken() {
        const [err, succ] = await uni.login().catch(err => err)
        // 1.获取到 code
        const { code } = succ
          
        // 2.获取到 其他信息
        const [err2, succ2] = await uni.getUserInfo().catch(err2 => err2)
        const { encryptedData, iv, rawData, signature } = succ2
        
        // 发起请求
        const res = await uni.$http.post('/api/public/v1/users/wxlogin', {
          code: code,
          encryptedData: encryptedData,
          iv: iv,
          rawData: rawData,
          signature: signature
        })
        console.log(res)
      }
    }
  }
</script>

<style lang="scss">
.userInfo-container {
  padding-top: 5px;
}
 .box {
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 35px;
   border-bottom: 1px solid #efefef;
   padding: 0 10px;
   overflow: hidden;
   margin: 5px 0;
 } 
.avatar {
  border: 0;
  image {
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }
}
.name {
  input {
    text-align: right;
  }
}
.btn {
  width: 80%;
  margin-top: 15px;
  border-radius: 20px;
  background-color: #C00000;
  opacity: .7;
  &:hover {
    transition: opacity .3s;
    opacity: .75;
  }
}
button {
  -webkit-tap-highlight-color: transparent;
  background-color: #fff;
  border-radius: 0;
  box-sizing: content-box;
  cursor: pointer;
  display: block;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  padding-left: 0px;
  padding-right: 0px;
  position: relative;
  text-align: center;
  text-decoration: none;
}
</style>
