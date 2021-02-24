<template>
  <div class="form-contain">
    <u-form :model="form" ref="uForm" label-width="170rpx">
      <u-form-item label="用户名"><u-input /></u-form-item>
      <u-form-item label="密码"><u-input /></u-form-item>
    </u-form>
    <view class="loginBtn"> <u-button type="primary">登录</u-button></view>
    <u-button>注册</u-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.form-contain {
  overflow: hidden;
  .loginBtn {
    margin-top: 500rpx !important;
    border: 1px transparent;
  }
}
</style>