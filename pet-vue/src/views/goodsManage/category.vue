<template>
  <div class="contain">
    <!-- 新增分类开始 -->
    <el-dialog
      title="新建分类"
      :visible.sync="isShowAdd"
      width="300px"
      center
      @close="clearDia"
    >
      <el-form :model="option" :rules="rules" ref="addRef">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="option.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false"> 取 消</el-button>
        <el-button type="primary" @click="createCategory()"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 新增分类结束 -->
    <!-- 编辑分类开始 -->
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
        <el-button type="primary" @click="updateCategory()"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类结束 -->
    <div class="utils">
      <el-input size="mini" v-model="params.name"></el-input>
      <el-button type="primary" size="mini" @click="getMes()"> 查询 </el-button>
      <el-button type="primary" size="mini" @click="reset()"> 重置 </el-button>
      <el-button type="success" size="mini" @click="isShowAdd = true">
        创建分类
      </el-button>
      <el-button
        type="danger"
        size="mini"
        @click="deleteCategorys"
        :disabled="selection.length == 0"
      >
        批量删除
      </el-button>
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        height="900px"
        border
        @selection-change="handleChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="分类名称"
        ></el-table-column>
        <el-table-column align="center" prop="status" label="分类状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">启用中</el-tag>
            <el-tag type="danger" v-else>关闭中</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="操作" width="230">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              v-if="scope.row.status == 0"
              @click="changeStatus(scope.row.id, 1)"
            >
              启用
            </el-button>
            <el-button
              type="warning"
              size="mini"
              v-else
              @click="changeStatus(scope.row.id, 0)"
            >
              停用
            </el-button>
            <el-button type="primary" size="mini" @click="showEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deleteCategory(scope.row.id)"
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
import API from "api/goods/category";
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      // 表格复选框数据
      selection: [],
      params: {
        name: "",
        page: 1,
        size: 10,
      },
      option: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "分类名称不能为空" }],
      },
      currentMes: {},
      total: 0,
      isShowAdd: false,
      isShowEdit: false,
    };
  },
  created() {
    this.getMes();
  },
  watch: {
    "$store.getters.currentShop": {
      handler() {
        this.getMes();
      },
      deep: true,
    },
  },
  methods: {
    // 复选框事件
    handleChange(val) {
      this.selection = val.map((v) => v.id);
    },
    // 获取列表
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
      const res = await API.getMes(params);
      if (!res.code) {
        this.tableData = res.data.categorys;
        this.total = res.data.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 改变分类状态
    async changeStatus(id, status) {
      const params = {
        id,
        status,
      };
      const res = await API.updateStatus(params);
      if (!res.code) {
        this.$message.success(res.msg);
        this.getMes();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 创建分类
    async createCategory() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          const params = Object.assign(
            {
              shopId: parseInt(this.$store.getters.currentShop),
            },
            this.option
          );
          const res = await API.createCategory(params);
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
    // 编辑分类
    async updateCategory() {
      this.$refs.editRef.validate(async (valid) => {
        if (valid) {
          const res = await API.updateCategory(this.currentMes);
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
    showEdit(data) {
      this.currentMes = Object.assign({}, data);
      this.isShowEdit = true;
    },
    // 删除单条分类
    deleteCategory(id) {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteCategory(id);
        if (!res.code) {
          this.$message.success(res.msg);
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 删除单条分类
    deleteCategorys() {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteCategorys({ arr: this.selection });
        if (!res.code) {
          this.$message.success(res.msg);
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 重置
    reset() {
      this.params = {
        name: "",
        page: 1,
        size: 10,
      };
      this.getMes();
    },
    // 清空弹框
    clearDia() {
      this.currentMes = {};
      this.isShowAdd = false;
      this.isShowEdit = false;
    },
  },
};
</script>

<style>
</style>