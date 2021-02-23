<template>
  <view class="form-contain">
    <u-form label-width="170rpx">
      <u-form-item label="用户头像">
        <u-upload :action="action" :file-list="fileList"></u-upload>
      </u-form-item>
      <u-form-item label="用户昵称">
        <u-input v-model="option.nick"></u-input>
      </u-form-item>
      <u-form-item label="手机号">
        <u-input v-model="option.phone"></u-input>
      </u-form-item>
      <u-form-item label="地址">
        <u-input v-model="option.address"></u-input>
      </u-form-item>
      <u-form-item label="真实姓名">
        <u-input v-model="option.realName"></u-input>
      </u-form-item>
      <u-form-item>
        <u-button type="primary">确认完善</u-button>
      </u-form-item>
    </u-form>
  </view>
</template>

<script>
export default {
  data: {
    option: {
      avatar: "",
      phone: "",
      nick: "",
      realName: "",
      address: "",
    },
    action: "",
  },
};
</script>

<style lang="scss">
.form-contain {
  padding: 15rpx 40rpx 0 40rpx;
  .u-form-item {
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>