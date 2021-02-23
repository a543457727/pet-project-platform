<template>
  <div class="navbar">
    <el-dialog
      title="切换店铺"
      :visible.sync="isShowAdd"
      width="300px"
      center
      class="chooseShop"
      @close="clearDia"
    >
      <el-radio-group v-model="shopId">
        <div
          v-for="item in $store.getters.shop"
          :key="item.shopId"
          class="groupItem"
        >
          <el-radio :label="item.shopId">{{ item.shopName }}</el-radio>
        </div>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearDia()">取 消</el-button>
        <el-button type="primary" @click="changeShop">确 定</el-button>
      </span>
    </el-dialog>
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="$store.getters.avatar" />
          <span class="user-name">
            {{ shopName }}
          </span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item @click.native="isShowAdd = true">
            切换店铺
          </el-dropdown-item>
          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-admin-template/"
          >
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <router-link to="/shop/index" v-if="$store.getters.shop.length > 1">
            <el-dropdown-item>店铺管理</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      isShowAdd: false,
      shopId: parseInt(this.$store.getters.currentShop),
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
    shopName() {
      const shop = this.$store.getters.shop.find(
        (v) => v.shopId == this.$store.getters.currentShop
      );
      return shop.shopName;
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    changeShop() {
      this.$store.commit("user/SET_CURRENTSHOP", this.shopId);
      this.isShowAdd = false;
    },
    clearDia() {
      this.shopId = parseInt(this.$store.getters.currentShop);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name {
          margin-left: 5px;
          font-weight: bold;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.chooseShop {
  /deep/.el-dialog__body {
    height: 400px;
    overflow: auto;
  }
  .el-radio-group {
    width: 100%;
    .el-radio {
      width: 100%;
    }
    .groupItem {
      cursor: pointer;
      width: 100%;
      padding: 5px 10px;
      &:hover {
        background-color: #e6e6e6;
      }
    }
  }
}
</style>
