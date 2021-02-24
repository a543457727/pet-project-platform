<template>
  <view class="form-contain">
    <u-form label-width="170rpx">
      <u-form-item label="用户头像">
        <u-upload
          :action="action"
          :file-list="fileList"
          @on-success="handleSuccess"
          max-count="1"
        ></u-upload>
      </u-form-item>
      <u-form-item label="用户昵称">
        <u-input v-model="option.nick"></u-input>
      </u-form-item>
      <u-form-item label="登录密码">
        <u-input v-model="option.password"></u-input>
      </u-form-item>
      <u-form-item label="手机号">
        <u-input v-model.number="option.phone"></u-input>
      </u-form-item>
      <u-form-item label="地址">
        <u-input v-model="option.address"></u-input>
      </u-form-item>
      <u-form-item label="真实姓名">
        <u-input v-model="option.realName"></u-input>
      </u-form-item>
      <u-form-item>
        <u-button type="primary" @click="wxRegister">确认完善</u-button>
      </u-form-item>
    </u-form>
  </view>
</template>

<script>
import API from "api/user";
export default {
  data() {
    return {
      option: {
        uid: "",
        avatar: "",
        phone: "",
        nick: "",
        realName: "",
        address: "",
        password: "",
      },
      fileList: [],
      action: "http://127.0.0.1:8888/upload/avatar",
    };
  },
  onLoad(option) {
    this.option.uid = option.uid;
    wx.getUserInfo({
      success: (data) => {
        this.option.nick = data.userInfo.nickName;
        this.option.avatar = data.userInfo.avatarUrl;
        this.fileList.push({ url: data.userInfo.avatarUrl });
      },
    });
  },
  methods: {
    async wxRegister() {
      const res = await API.wxRegister(this.option);
      if (!res.code) {
        uni.showToast({
          title: "操作成功",
        });
        uni.setStorageSync("token", "Bearer " + res.data.token);
        uni.switchTab({
          url: "/pages/home/index",
        });
      } else {
        uni.showToast({
          title: res.data,
          type: "error",
        });
      }
    },
    // 文件上传成功
    handleSuccess(res) {
      this.option.avatar = res.data.url;
    },
  },
};
</script>

<style>
</style>