export default {
  // 开启命名空间
  namespaced: true,
  
  state: () => ({
    // 收获地址
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  
  mutations: {
    // 更新收货地址
    updateAddress(state,address) {
      state.address = address
      this.commit('m_user/saveStorage')
    },
    // 保存在 storage
    saveStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
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