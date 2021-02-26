<template>
  <div class="form-contain">
    <div class="imgBox">
      <img src="@/static/image/bg.jpg" alt="" />
    </div>
    <u-form :model="option" ref="uForm" label-width="170rpx">
      <u-form-item label="用户名" prop="username">
        <u-input v-model="option.username" />
      </u-form-item>
      <u-form-item label="密码" prop="password">
        <u-input v-model="option.password" type="password" />
      </u-form-item>
    </u-form>
    <view class="loginBtn">
      <u-button type="primary" @click="signUp">登录</u-button>
    </view>
    <view class="registerBtn">
      <u-button @click="jumpRegister">注册</u-button>
    </view>
  </div>
</template>

<script>
import API from "@/api/user";
export default {
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  data() {
    return {
      option: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["change", "blur"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  methods: {
    signUp() {
      this.$refs.uForm.validate(async (valid) => {
        if (valid) {
          const res = await API.userLogin(this.option);
          if (!res.code) {
            uni.showToast({
              title: res.msg,
              icon: "success",
            });
            uni.setStorageSync("token", "Bearer " + res.data.token);
            uni.switchTab({
              url: "/pages/home/index",
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: "none",
            });
          }
        } else {
          return false;
        }
      });
    },
    async jumpRegister() {
      uni.navigateTo({ url: "/pages/register/index" });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-contain {
  .imgBox {
    width: 450rpx;
    height: 450rpx;
    border-radius: 50%;
    overflow: hidden;
    margin: 30rpx auto;
    img {
      width: 100%;
    }
  }
  .loginBtn {
    margin-top: 50rpx !important;
  }
  .registerBtn {
    margin-top: 40rpx;
  }
}
</style>