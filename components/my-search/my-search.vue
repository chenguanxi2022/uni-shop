<template>
  <view class="my-search-container" :style="{ 'background-color' : bgColor }" @click="handleClick">
    <view class="my-search-box" :style="{ 'border-radius' :  radius + 'px'}">
      <uni-icons type="search"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      bgColor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 18,  // PX
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      handleClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  height: 50px;
  // background-color: #C00000;
  padding: 0 10px;
  .my-search-box {
    width: 100%;
    height: 36px;
    background-color: #ffffff;
    // border-radius: 18px;
    text-align: center;
    line-height: 36px;
    .placeholder {
      margin-left: 5px;
      font-size: 15px;
    }
  }
}
</style>