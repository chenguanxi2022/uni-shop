<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,idx) in goodsList" :key="idx" @click="toGoodsDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        total: 0,
        goodsList: [],
        // 节流阀
        isLoading: false
      };
    },
    methods: {
      // 获取商品数据
      async getGoodsList(cb) {
        // 开启节流阀
        this.isLoading = true
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isLoading = false
        // 数据请求完毕，立即关闭手机端下拉刷新
        cb && cb()
        
        if(res.meta.status !== 200) return uni.$showMsg()
        // 新旧数据进行拼接
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
      },
      // 跳转到商品详情页
      toGoodsDetail(item) {
        uni.navigateTo({
          url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
        })
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query || '',
      this.queryObj.cid = options.cid || '',
      // 调用获取商品列表数据的方法
      this.getGoodsList()
    },
    // 页面上拉触底事件的处理函数
    onReachBottom() {
      // 判断数据是否加载完毕
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      // 节流阀判断
      if(this.isLoading) return
      // 页码 + 1
      this.queryObj.pagenum ++
      this.getGoodsList()
    },
    // 页面下拉事件函数
    onPullDownRefresh() {
      // 1.重置关键数据
      this.total = 0,
      this.goodsList = [],
      this.isLoading = false,
      this.queryObj.pagenum = 1
      // 2.重新发起请求，且关闭手机端的下拉刷新
      this.getGoodsList(() => { uni.stopPullDownRefresh() })
    }
  }
</script>

<style lang="scss">

</style>
