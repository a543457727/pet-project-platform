<template>
  <div class="contain">
    <!-- 新增服务开始 -->
    <el-dialog
      title="新建服务"
      :visible.sync="isShowAdd"
      width="300px"
      center
      @close="clearDia"
    >
      <el-form :model="option" :rules="rules" ref="addRef">
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="option.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false"> 取 消</el-button>
        <el-button type="primary" @click="createServer()"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 新增服务结束 -->
    <!-- 编辑服务开始 -->
    <el-dialog
      title="编辑服务"
      :visible.sync="isShowEdit"
      width="300px"
      center
      @close="clearDia"
    >
      <el-form :model="currentMes" :rules="rules" ref="editRef">
        <el-form-item label="服务名称" prop="name">
          <el-input v-model="currentMes.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false"> 取 消</el-button>
        <el-button type="primary" @click="updateServer()"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 编辑服务结束 -->
    <div class="utils">
      <el-input
        placeholder="请输入服务名称"
        size="mini"
        v-model="params.name"
      />
      <el-button type="primary" size="mini" @click="getMes()">查询</el-button>
      <el-button type="primary" size="mini" @click="resetData">重置</el-button>
      <el-button type="success" size="mini" @click="isShowAdd = true">
        创建服务
      </el-button>
      <el-button
        type="danger"
        size="mini"
        :disabled="selection.length == 0"
        @click="delServers"
      >
        批量删除
      </el-button>
    </div>
    <div class="tableBox">
      <el-table
        border
        :data="tableData"
        height="900"
        @selection-change="handleChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="服务名称"
          align="center"
          prop="name"
        ></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="启用状态" align="center" width="100px">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status">启用</el-tag>
            <el-tag type="danger" v-else>未开启</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="260px"
          class="tableRow"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              v-if="!scope.row.status"
              @click="changeStatus(scope.row.id, 1)"
            >
              启用
            </el-button>
            <el-button
              size="mini"
              type="warning"
              v-else
              @click="changeStatus(scope.row.id, 0)"
            >
              停用
            </el-button>
            <el-button size="mini" type="primary" @click="showEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delServer(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import API from "api/appointment";
export default {
  data() {
    return {
      params: {
        name: "",
        page: 1,
        size: 10,
      },
      option: {
        name: "",
      },
      currentMes: {},
      rules: {
        name: [
          { required: true, message: "服务名称不能为空", trigger: "blur" },
        ],
      },
      selection: [],
      total: 0,
      tableData: [],
      isShowAdd: false,
      isShowEdit: false,
    };
  },
  watch: {
    "$store.getters.currentShop": {
      handler() {
        this.getMes();
      },
      deep: true,
    },
  },
  created() {
    this.getMes();
  },
  methods: {
    // 获取预约服务
    async getMes(option) {
      if (option) {
        this.option.page = option.page;
        this.option.size = option.size;
      }
      const params = Object.assign(
        {
          shopId: parseInt(this.$store.getters.currentShop),
        },
        this.params
      );
      const res = await API.getServer(params);
      if (!res.code) {
        this.tableData = res.data.servers;
        this.total = res.data.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 创建服务
    createServer() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          const params = Object.assign(
            {
              shopId: parseInt(this.$store.getters.currentShop),
            },
            this.option
          );
          const res = await API.createServer(params);
          if (!res.code) {
            this.$message.success(res.msg);
            this.getMes();
            this.$refs.addRef.resetFields();
            this.clearDia();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },
    // 修改服务状态
    async changeStatus(id, status) {
      const res = await API.changeStatus(id, { status });
      if (!res.code) {
        this.getMes();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 展示编辑
    showEdit(data) {
      console.log(data);
      this.currentMes = Object.assign({}, data);
      this.isShowEdit = true;
    },
    // 修改服务数据
    updateServer() {
      this.$refs.editRef.validate(async (valid) => {
        if (valid) {
          const res = await API.updateServer(
            this.currentMes.id,
            this.currentMes
          );
          if (!res.code) {
            this.$refs.editRef.resetFields();
            this.$message.success(res.msg);
            this.getMes();
            this.clearDia();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },
    // 删除单条服务
    delServer(id) {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteServer(id);
        if (!res.code) {
          this.$message.success(res.msg);
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 批量删除数据
    delServers() {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteServers({ arr: this.selection });
        if (!res.code) {
          this.$message.success(res.msg);
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
        console.log(res);
      });
    },
    // 清空弹框
    clearDia() {
      this.isShowEdit = false;
      this.isShowAdd = false;
      this.currentMes = {};
    },
    // 表格复选框点击触发事件
    handleChange(val) {
      this.selection = val.map((v) => v.id);
    },
    resetData() {
      this.params = {
        name: "",
        page: 1,
        size: 10,
      };
      this.getMes();
    },
  },
};
</script>

<style>
</style>