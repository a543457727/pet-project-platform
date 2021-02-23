<template>
  <div class="shopPage">
    <el-form label-width="auto">
      <el-form-item label="店铺名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="营业执照">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.shopPage {
  width: 500px;
  text-align: center;
  margin: 200px auto;
}
</style>