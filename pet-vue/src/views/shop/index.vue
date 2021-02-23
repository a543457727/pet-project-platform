<template>
  <div class="contain">
    <!-- 新增分类开始 -->
    <el-dialog
      title="新建分类"
      :visible.sync="isShowAdd"
      width="400px"
      center
      @close="clearDia"
    >
      <el-form :model="option" :rules="rules" ref="addRef">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="option.name"></el-input>
        </el-form-item>
        <el-form-item label="头像上传" prop="avatar">
          <el-upload
            :action="action"
            :limit="1"
            list-type="picture"
            :headers="headers"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false"> 取 消</el-button>
        <el-button type="primary" @click="createShop()"> 确 定 </el-button>
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
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="currentMes.name"></el-input>
        </el-form-item>
        <el-form-item label="头像上传" prop="avatar">
          <el-upload
            :action="action"
            :limit="1"
            list-type="picture"
            :headers="headers"
            :on-success="handleEditSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearDia()"> 取 消</el-button>
        <el-button type="primary" @click="updateShop()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类结束 -->
    <div class="utils">
      <el-input size="mini" v-model="params.name"></el-input>
      <el-button type="primary" size="mini" @click="getMes()">查询</el-button>
      <el-button type="primary" size="mini" @click="reset()">重置</el-button>
      <el-button type="success" size="mini" @click="isShowAdd = true">
        创建店铺
      </el-button>
      <el-button
        type="danger"
        size="mini"
        @click="deleteShops"
        :disabled="selection.length == 0"
      >
        批量删除
      </el-button>
    </div>
    <div class="tableBox">
      <el-table
        border
        height="900px"
        :data="tableData"
        @selection-change="handleChange"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="店铺名称"
        ></el-table-column>
        <el-table-column align="center" label="店铺头像">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.avatar"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="店铺状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status">启用</el-tag>
            <el-tag type="danger" v-else>停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="" label="操作" width="250px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              v-if="scope.row.status == 0"
              @click="changeStatus(scope.row.id, 1)"
            >
              启用
            </el-button>
            <el-button
              size="mini"
              type="warning"
              v-else-if="scope.row.status == 1"
              @click="changeStatus(scope.row.id, 0)"
            >
              停用
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="showUpdateDia(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteShop(scope.row.id)"
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
import API from "api/shop";
export default {
  data() {
    return {
      params: {
        page: 1,
        size: 10,
        name: "",
      },
      isShowEdit: false,
      action: "http://127.0.0.1:8888/upload/shop",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      option: {
        name: "",
        avatar: "",
      },
      currentMes: {},
      rules: {
        name: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: ["blur", "change"],
          },
        ],
        avatar: [
          {
            required: true,
            message: "请上传商品头像",
            trigger: ["blur", "change"],
          },
        ],
      },
      isShowAdd: false,
      total: 0,
      tableData: [],
      fileList: [],
      selection: [],
    };
  },
  watch: {
    tableData: {
      handler() {
        this.$store.dispatch("user/getUserInfo");
      },
      deep: true,
    },
  },
  created() {
    this.getMes();
  },
  methods: {
    async getMes(option) {
      if (option) {
        this.params.page = option.page;
        this.params.size = option.size;
      }
      const res = await API.getMes(this.params);
      if (!res.code) {
        this.tableData = res.data.shops;
        this.total = res.data.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 复选框事件
    handleChange(val) {
      this.selection = val.map((v) => v.id);
    },
    createShop() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          const res = await API.addShop(this.option);
          if (!res.code) {
            this.$message.success(res.msg);
            this.getMes();
            this.clearDia();
            this.$refs.addRef.resetFields();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },
    handleSuccess(res) {
      if (!res.code) {
        this.option.avatar = res.data.url;
      }
    },
    // 新增删除触发事件
    handleRemove() {
      this.option.avatar = "";
      this.currentMes.avatar = "";
    },
    // 重置
    reset() {
      this.params = {
        page: 1,
        size: 10,
        name: "",
      };
      this.getMes();
    },
    // 修改状态
    async changeStatus(id, status) {
      const res = await API.changeStatus({ id, status });
      if (!res.code) {
        this.$message.success(res.msg);
        this.getMes();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 展示更新弹框
    showUpdateDia(data) {
      this.currentMes = Object.assign({}, data);
      this.isShowEdit = true;
      this.fileList.push({ url: data.avatar, name: data.name });
    },
    clearDia() {
      this.currentMes = {};
      this.fileList = [];
      this.isShowAdd = false;
      this.isShowEdit = false;
    },
    handleEditSuccess(res) {
      this.currentMes.avatar = res.data.url;
    },
    // 删除单条店铺
    deleteShop(id) {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteShop(id);
        if (!res.code) {
          this.$message.success(res.msg);
          this.clearDia();
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 编辑店铺信息
    updateShop() {
      this.$refs.editRef.validate(async (valid) => {
        if (valid) {
          const res = await API.updateShop(this.currentMes);
          if (!res.code) {
            this.$message.success(res.msg);
            this.clearDia();
            this.getMes();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },

    // 删除多条店铺
    deleteShops() {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteShops({ arr: this.selection });
        if (!res.code) {
          this.$message.success(res.msg);
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>