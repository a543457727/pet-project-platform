<template>
  <div class="contain">
    <!-- 新增品类开始 -->
    <el-dialog
      title="新建品类"
      :visible.sync="isShowAdd"
      width="300px"
      center
      @close="clearDia"
    >
      <el-form :model="option" :rules="rules" ref="addRef">
        <el-form-item label="品类名称" prop="name">
          <el-input v-model="option.name"></el-input>
        </el-form-item>
        <el-form-item label="小型体重(<Kg)" prop="smallWeight">
          <el-input v-model.number="option.smallWeight"></el-input>
        </el-form-item>
        <el-form-item label="大型体重(>Kg)" prop="bigWeight">
          <el-input v-model.number="option.bigWeight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false"> 取 消</el-button>
        <el-button type="primary" @click="createVariety()"> 确 定 </el-button>
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
        <el-form-item label="品类名称" prop="name">
          <el-input v-model="currentMes.name"></el-input>
        </el-form-item>
        <el-form-item label="小型体重(<Kg)" prop="smallWeight">
          <el-input v-model.number="currentMes.smallWeight"></el-input>
        </el-form-item>
        <el-form-item label="大型体重(>Kg)" prop="bigWeight">
          <el-input v-model.number="currentMes.bigWeight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false"> 取 消</el-button>
        <el-button type="primary" @click="updateVariety()"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 编辑服务结束 -->
    <div class="utils">
      <el-input size="mini" v-model="params.name"></el-input>
      <el-button type="primary" size="mini" @click="getMes()">查询</el-button>
      <el-button type="primary" size="mini" @click="resetData">重置</el-button>
      <el-button type="success" size="mini" @click="isShowAdd = true">
        创建种类
      </el-button>
      <el-button
        type="danger"
        size="mini"
        :disabled="selection.length == 0"
        @click="delVarietys"
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
          align="center"
          label="种类名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="小体型重量(<KG)"
          prop="smallWeight"
        ></el-table-column>
        <el-table-column align="center" label="中体型重量(KG)">
          <template slot-scope="scope">
            {{ scope.row.smallWeight }}~{{ scope.row.bigWeight }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="大体型重量(>KG)"
          prop="bigWeight"
        ></el-table-column>
        <el-table-column align="center" label="创建时间" prop="createTime">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="showEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delVariety(scope.row.id)"
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
        smallWeight: null,
        bigWeight: null,
      },
      rules: {
        name: [{ required: true, message: "请填写该内容", trigger: "blur" }],
        smallWeight: [
          { required: true, message: "请填写该内容", trigger: "blur" },
          { type: "number", message: "请填写正确的内容", trigger: "blur" },
        ],
        bigWeight: [
          { required: true, message: "请填写该内容", trigger: "blur" },
          {
            type: "number",
            message: "请填写正确的内容",
            trigger: "blur",
          },
        ],
      },
      total: 0,
      tableData: [],
      isShowAdd: false,
      isShowEdit: false,
      currentMes: {},
      selection: [],
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
    // 获取品类数据
    async getMes(option) {
      if (option) {
        this.params.page = option.page;
        this.params.size = option.size;
      }
      const params = Object.assign(
        {
          shopId: parseInt(this.$store.getters.currentShop),
        },
        this.params
      );
      const res = await API.getVariety(params);
      if (!res.code) {
        this.tableData = res.data.varietys;
        this.total = res.data.total || 0;
      }
    },
    // 创建品类
    createVariety() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          const res = await API.createVariety(this.option);
          if (!res.code) {
            this.getMes();
            this.$refs.addRef.resetFields();
            this.$message.success(res.msg);
            this.clearDia();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },
    // 重置数据
    resetData() {
      this.params = {
        name: "",
        page: 1,
        size: 10,
      };
      this.getMes();
    },
    showEdit(data) {
      this.currentMes = Object.assign({}, data);
      this.isShowEdit = true;
    },
    // 清空弹框
    clearDia() {
      this.isShowAdd = false;
      this.isShowEdit = false;
      this.currentMes = {};
    },
    // 更新品类数据
    updateVariety() {
      this.$refs.editRef.validate(async (valid) => {
        if (valid) {
          const res = await API.updateVariety(
            this.currentMes.id,
            this.currentMes
          );
          if (!res.code) {
            console.log(res);
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
    // 表格复选框点击触发事件
    handleChange(val) {
      this.selection = val.map((v) => v.id);
    },
    // 删除单条数据
    delVariety(id) {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.delVariety(id);
        if (!res.code) {
          this.$message.success(res.msg);
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    delVarietys() {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.delVarietys({
          arr: this.selection,
        });
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