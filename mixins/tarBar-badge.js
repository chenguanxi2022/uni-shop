import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    // total 改变，右上角重新赋值
    total(newVal) {
      if(newVal === 0) {
        uni.removeTabBarBadge({index:2})
      } else {
        this.setBadge()
      }
    }
  },
  methods: {
    // 为购物车设置右上角的徽标
    setBadge() {
      uni.setTabBarBadge({
        index: 2,  // 索引
        // 必须是字符串，不能是数字
        text: this.total === 0 ? 0 : this.total + '' 
      })
    }
  },
  // 生命周期回调—监听页面显示
  onShow() {
    this.setBadge()
  }
}