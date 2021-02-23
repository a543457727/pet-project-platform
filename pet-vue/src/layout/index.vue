<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar></navbar>
      </div>
      <div>
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from "./components";
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }
  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }
}
</style>