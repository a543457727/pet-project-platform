<template>
  <div class="main">
    <view>
      <view class="u-page">
        <!-- 所有内容的容器 -->
      </view>
      <!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
      <u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          iconPath: "home",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>