<template>
  <view id="login">
    <view class="systemIcon">
      <div class="systemImg">
        <img src="~@/static/image/bg.jpg" />
      </div>
      饲宠之家
    </view>
    <button type="primary" @click="wxLogin">微信登录</button>
    <div class="btnGroup">
      <div class="other" @click="jumpLogin">账号登录</div>
      <div class="other">注册</div>
    </div>
  </view>
</template>

<script>
import API from "@/api/user";
export default {
  methods: {
    // 微信登录
    wxLogin() {
      wx.login({
        async success(res) {
          const result = await API.wxLogin({ code: res.code });
          if (result.code == 0) {
            // 当用户存在且信息完善
            uni.showToast({
              title: result.msg,
              icon: "success",
            });

            uni.setStorageSync("token", `Bearer ${result.data.token}`);
            uni.switchTab({
              url: "/pages/home/index",
            });
          } else if (result.code == 2) {
            // 当用户存在且信息且首次登录时
            uni.showToast({
              title: result.msg,
              icon: "none",
            });
            uni.navigateTo({
              url: "/pages/saveInfo/index?uid=" + result.data.openid,
            });
          } else {
            // 当用户code异常时
            uni.showToast({
              title: result.msg,
              icon: "error",
            });
          }
        },
      });
    },
    jumpLogin() {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-color: #efa2b3;
  border: 1px solid transparent;
  .systemIcon {
    font-size: 60rpx;
    color: white;
    text-align: center;
    margin-top: 130rpx;
    .systemImg {
      border-radius: 50%;
      overflow: hidden;
    }
  }
  button {
    width: 600rpx;
    margin-top: 200rpx;
  }
  .btnGroup {
    display: flex;
    width: 300rpx;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 15rpx;
    font-size: 30rpx;
    color: white;
  }
}
</style>