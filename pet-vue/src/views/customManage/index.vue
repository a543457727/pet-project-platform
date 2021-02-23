<template>
  <div class="contain">
    <div class="utils">
      <el-input size="mini" placeholder="请输入用户名密码"></el-input>
      <el-button size="mini" type="primary">查询用户</el-button>
    </div>
    <div class="tableBox">
      <el-table border :data="tableData" height="900">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          type="index"
          label="/"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户性别"
          prop="gender"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户地址"
          prop="address"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户手机"
          prop="phone"
        ></el-table-column>
        <el-table-column
          align="center"
          label="用户宠物数"
          prop="petNum"
        ></el-table-column>
        <el-table-column
          align="center"
          label="消费次数"
          prop="safeNum"
        ></el-table-column>
        <el-table-column
          align="center"
          label="最后消费时间"
          prop="lastSafeTime"
        ></el-table-column>
        <el-table-column align="center" label="操作" class="tableRow">
          <el-button type="warning" size="mini">查询宠物信息</el-button>
          <el-button type="danger" size="mini">拉入黑名单</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "customManage",
  data() {
    return {
      tableData: [
        {
          name: "卢丰祥",
          gender: "m",
          address: "福建省三明市沙县",
          phone: "12012345671",
          petNum: 1,
          safeNum: 1,
          lastSafeTime: "昨天",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>