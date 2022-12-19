<template>
  <view class="scroll-view-container">
    <!-- 左侧的滑动区域 -->
    <scroll-view scroll-y :style="{ height: wh + 'px' }" class="left-scroll-view">
      <block v-for="(item,idx) in cateList" :key="idx">
        <view :class="['left-scroll-view-item', idx === active ? 'active' : '' ]" @click="changeActive(idx)">{{item.cat_name}}</view>
      </block>
    </scroll-view>
    <!-- 右侧的滑动区域 -->
    <scroll-view scroll-y :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
      <view class="cate-lv2" v-for="(item2,idx2) in cateLevel2" :key="idx2">
        <view class="cate-lv2-title">
          {{item2.cat_name}}
        </view>
        <!-- 三级分类 -->
        <view class="cate-lv3-list">
          <view class="cate-lv3-item" v-for="(item3,idx3) in item2.children" :key="idx3" @click="toGoodsList(item3)">
            <image :src="item3.cat_icon" mode=""></image>
            <text>{{item3.cat_name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        cateLevel2: [],
        active: 0,
        scrollTop: 0
      };
    },
    methods: {
      // 获取分类数据
      async getCateList() {
        const {data: res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = this.cateList[0].children
      },
      // 点击改变 active
      changeActive(idx) {
        this.active = idx
        this.cateLevel2 = this.cateList[idx].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转到 商品页
      toGoodsList(item3) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item3.cat_id 
        })
      }
    },
    onLoad() {
      // 获取当前设备的可用高度
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight
      this.getCateList()
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      background-color: #F7F7F7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active {
        position: relative;
        background-color: #FFFFFF;
        &::before {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
        }
      }
    }
  }
  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
      margin-bottom: 10px;
      image {
        width: 60px;
        height: 60px;
      }
      text {
        font-size: 12px;
      }
    }
  }
}
</style>
