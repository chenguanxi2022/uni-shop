<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar placeholder="搜索" @input="input" :radius="100" :cancelButton="none" />
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResult.length !== 0">
      <view class="sugg-item" v-for="(item,idx) in searchResult" :key="idx" @click="toGoodsDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" inverted v-for="(item,idx) in historys" :key="idx" @click="toGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        keyWord: '',
        searchResult: [],
        historyList: []
      };
    },
    methods: {
      // 监听输入框输入事件
      input(val) {
        // 清除 timer 对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器
        this.timer = setTimeout(() => {
          // 关键词赋值
          this.keyWord = val
          this.getSearchResult()
        }, 500)
      },
      // 获取关键词搜索结果
      async getSearchResult() {
        // 判空
        if(this.keyWord === '') {
          this.searchResult = []
          return
        }
        // 发起请求
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{ query: this.keyWord })
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchResult = res.message
        this.saveSearchList()
      },
      // 跳转到 商品详情页
      toGoodsDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 保存搜索历史
      saveSearchList() {
        // this.historyList.push(this.keyWord)
        
        // 将 Array 数组转化为 Set 对象
        const set = new Set(this.historyList)
        // 调用 delete 删除对应元素
        set.delete(this.keyWord)
        // 调用 add 添加元素
        set.add(this.keyWord)
        // 将 Set 对象转化为 Array 数组
        this.historyList = Array.from(set)
        
        // setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('keyWord', JSON.stringify(this.historyList))
      },
      // 清空搜索历史记录
      clearHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('keyWord', '[]')
      },
      // 点击标签跳转到 商品列表页
      toGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + item
        })
      }
    },
    computed: {
      historys() {
        // 由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('keyWord') || '[]')
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    height: 40px;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    padding: 0 5px;
    display: flex;
    flex-wrap: wrap;
    uni-tag {
      margin-top: 10px;
      margin-right: 5px;
    }
  }
}
</style>
