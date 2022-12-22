export default {
  // 为当前模块开启命名空间
  namespaced: true,
  
  state: () => ({
    /**
     * 每个商品的信息对象，都包含以下 6 个属性：
     * { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
     */
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  
  mutations: {
    // 加入购物车
    insertCart(state, goods) {
      const result = state.cart.find(item => item.goods_id === goods.goods_id)
      // 不存在直接 push 进去
      if(!result) {
        state.cart.push(goods)
      // 存在，count++
      } else {
        result.goods_count++
      }
      
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
      this.commit('m_cart/saveStorage')
    },
    // 购物车数据持久化
    saveStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新商品被选状态
    updateGoodsState(state, goods) {
      const result = state.cart.find(item => item.goods_id === goods.goods_id)
      
      if(result) {
        result.goods_state = goods.goods_state
        this.commit('m_cart/saveStorage')
      }
    },
    // 更新所有商品的被选状态
    updateAllGoodsState(state, newState) {
      state.cart.forEach((item) => item.goods_state = newState)
      this.commit('m_cart/saveStorage')
    },
    // 更新商品加购数量
    updateGoodsCount(state,goods) {
      const result = state.cart.find(item => item.goods_id === goods.goods_id)
      
      if(result) {
        result.goods_count = goods.goods_count
        this.commit('m_cart/saveStorage')
      }
    },
    // 删除购物车中的商品
    removeGood(state,goods_id) {
      // 使用 filter 进行过滤
      state.cart = state.cart.filter(item => item.goods_id !== goods_id)
      this.commit('m_cart/saveStorage')
    }
  },
  
  getters: {
    // 商品总数
    total(state) {
      return state.cart.reduce((total,item) => total += item.goods_count,0)
    },
    // 勾选商品总数
    checkedCount(state) {
      return state.cart.filter(item => item.goods_state).reduce((p,n) => p += n.goods_count,0)
    },
    // 已勾选商品总价
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  }
}
