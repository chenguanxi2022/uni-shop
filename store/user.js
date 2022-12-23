export default {
  // 开启命名空间
  namespaced: true,
  
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 用户登陆成功后的 token
    token: uni.getStorageSync('token'),
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
  }),
  
  mutations: {
    // 更新收货地址
    updateAddress(state,address) {
      state.address = address
      this.commit('m_user/saveStorage')
    },
    // 更新用户信息
    updateUserInfo(state,userInfo) {
      state.userInfo = userInfo
      this.commit('m_user/saveUserInfoStorage')
    },
    // 更新 token 
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenStorage')
    },
    // 地址信息保存在 storage
    saveStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 用户信息保存在 Storage
    saveUserInfoStorage(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    // token 保存在 Storage
    saveTokenStorage(state) {
      uni.setStorageSync('token', state.token)
    }
  },
  
  getters: {
    // 拼接收货地址
    addStr(state) {
      // 判空
      if(state.address.provinceName) {
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
      } else {
        return ''
      }
    }
  }
}