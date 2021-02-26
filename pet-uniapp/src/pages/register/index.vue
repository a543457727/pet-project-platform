<template>
  <view class="form-contain">
    <u-form label-width="170rpx" :model="option" :rules="rules" ref="regRef">
      <u-form-item label="用户名" prop="username">
        <u-input v-model="option.username" placeholder="请输入用户名"></u-input>
      </u-form-item>
      <u-form-item label="登录密码" prop="password">
        <u-input
          v-model="option.password"
          type="password"
          placeholder="请输入密码"
        ></u-input>
      </u-form-item>
      <u-form-item label="用户昵称" prop="nick">
        <u-input v-model="option.nick" placeholder="请输入账号昵称"></u-input>
      </u-form-item>
      <u-form-item label="手机号" prop="phone">
        <u-input
          v-model.number="option.phone"
          placeholder="请输入手机号"
        ></u-input>
      </u-form-item>
      <u-form-item label="地址" prop="address">
        <u-input
          v-model="option.address"
          placeholder="请输入地址"
          @click="show = true"
          disabled
        ></u-input>
        <u-picker
          mode="region"
          v-model="show"
          @confirm="getAddress"
          :default-region="address"
        ></u-picker>
      </u-form-item>
      <u-form-item label="真实姓名" prop="realName">
        <u-input
          v-model="option.realName"
          placeholder="请输入真实姓名"
        ></u-input>
      </u-form-item>
      <u-form-item label="用户头像" prop="avatar">
        <u-upload
          :action="action"
          :file-list="fileList"
          @on-success="handleSuccess"
          max-count="1"
        ></u-upload>
      </u-form-item>
      <u-form-item>
        <u-button type="primary" @click="register">确认完善</u-button>
      </u-form-item>
    </u-form>
  </view>
</template>

<script>
import API from "@/api/user";
export default {
  onReady() {
    this.$refs.regRef.setRules(this.rules);
  },
  data() {
    return {
      option: {
        username: "",
        password: "",
        nick: "",
        avatar: "",
        phone: "",
        address: "",
        realName: "",
      },
      show: false,
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: ["blur", "change"],
          },
        ],
        nick: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: ["blur", "change"],
          },
        ],
        avatar: [
          {
            required: true,
            message: "请上传头像",
            trigger: ["blur", "change"],
          },
        ],
      },
      fileList: [],
      action: "http://127.0.0.1:8888/upload/avatar",
    };
  },
  computed: {
    address() {
      if (this.option.address) {
        return this.option.address.split("-");
      }
      return [];
    },
  },
  methods: {
    handleSuccess(res) {
      if (!res.code) {
        this.option.avatar = res.data.url;
      }
    },
    register() {
      this.$refs.regRef.validate(async (valid) => {
        if (valid) {
          const res = await API.userRegister(this.option);
          if (!res.code) {
            uni.showToast({
              title: res.msg,
              icon: "success",
            });
            uni.navigateTo({ url: "/pages/login/index" });
          } else {
            uni.showToast({
              title: res.msg,
              icon: "error",
            });
          }
        } else {
          return false;
        }
      });
    },
    getAddress(data) {
      this.option.address = `${data.province.label}-${data.city.label}-${data.area.label}`;
    },
  },
};
</script>

<style>
</style>