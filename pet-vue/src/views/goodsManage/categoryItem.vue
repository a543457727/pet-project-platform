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
        <el-form-item label="所属分类" prop="categoryId">
          <el-select v-model="option.categoryId" style="width: 100%">
            <el-option
              v-for="item in category"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类名称" prop="name">
          <el-input v-model="option.name"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-upload
            :action="action"
            :limit="1"
            list-type="picture"
            :headers="headers"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
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
        <el-button type="primary" @click="createCategoryItem()">
          确 定
        </el-button>
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
        <el-form-item label="所属分类" prop="categoryId">
          <el-select v-model="currentMes.categoryId" style="width: 100%">
            <el-option
              v-for="item in category"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类名称" prop="name">
          <el-input v-model="currentMes.name"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
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
        <el-button @click="isShowEdit = false"> 取 消</el-button>
        <el-button type="primary" @click="updateCategoryItem()">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类结束 -->
    <div class="utils">
      <el-select
        placeholder="请选择一级分类"
        v-model="params.categoryId"
        size="mini"
        clearable
        filterable
      >
        <el-option
          v-for="item in category"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
      <el-input size="mini"></el-input>
      <el-button type="primary" size="mini" @click="getMes()">查 询</el-button>
      <el-button type="primary" size="mini" @click="reset()">重 置</el-button>
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
      <el-table border :data="tableData" @selection-change="handleChange">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          label="二级分类名称"
          prop="name"
        ></el-table-column>
        <el-table-column align="center" label="分类图片" prop="pictureUrl">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.pictureUrl"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="所属分类"
          prop="categoryId"
        ></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">启用中</el-tag>
            <el-tag type="danger" v-else>关闭中</el-tag>
          </template></el-table-column
        >
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="changeStatus(scope.row)"
            >
              停用
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="showEditDia(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
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
import API from "api/goods/categoryItem";
export default {
  data() {
    return {
      params: {
        page: 1,
        size: 10,
        categoryId: "",
      },
      option: {
        name: "",
        pictureUrl: "",
        categoryId: "",
        shopId: this.$store.getters.currentShop,
      },
      watch: {
        "$store.getters.currentShop": {
          handler(newValue) {
            this.option.shopId = newValue;
            this.getMes();
          },
          deep: true,
        },
      },
      action: "http://127.0.0.1:8888/upload/categoryItem",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      rules: {
        name: [
          { required: true, message: "二级类名不能为空", trigger: "blur" },
        ],
        pictureUrl: [
          { required: true, message: "商品图片不能为空", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
      },
      selection: [],
      currentMes: {},
      total: 0,
      category: [],
      tableData: [],
      isShowAdd: false,
      isShowEdit: false,
      fileList: [],
    };
  },
  created() {
    this.getCategory();
    this.getMes();
  },
  methods: {
    // 获取一级分类
    async getCategory() {
      const res = await API.getCategory(this.$store.getters.currentShop);
      if (!res.code) {
        this.category = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取二级分类列表
    async getMes(option) {
      if (option) {
        this.params.page = option.page;
        this.params.size = option.size;
      }
      const params = Object.assign(
        {
          shopId: this.$store.getters.currentShop,
        },
        this.params
      );
      const res = await API.getMes(params);
      if (!res.code) {
        this.tableData = res.data.categoryItems;
        this.total = res.data.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 重置
    reset() {
      this.params = {
        page: 1,
        size: 10,
        categoryId: "",
      };
      this.getMes();
    },
    // 展现编辑弹框
    showEditDia(data) {
      this.currentMes = Object.assign(
        {
          shopId: this.$store.getters.currentShop,
        },
        data
      );
      this.fileList.push({ name: data.name, url: data.pictureUrl });
      this.isShowEdit = true;
    },
    // 创建二级分类
    createCategoryItem() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          const res = await API.createCategoryItem(this.option);
          if (!res.code) {
            this.$message.success(res.msg);
            this.$refs.addRef.resetFields();
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
    // 编辑二级分类
    updateCategoryItem() {
      this.$refs.editRef.validate(async (valid) => {
        if (valid) {
          const res = await API.updateCategoryItem(this.currentMes);
          if (!res.code) {
            this.getMes();
            this.clearDia();
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },
    // 改变状态
    async changeStatus(data) {
      this.currentMes = Object.assign(
        {
          shopId: this.$store.getters.currentShop,
        },
        data
      );
      this.currentMes.status = data.status == 1 ? 0 : 1;
      const res = await API.updateCategoryItem(this.currentMes);
      if (!res.code) {
        this.getMes();
        this.clearDia();
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除单条分类
    deleteCategory(id) {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteCategoryItem(id);
        if (!res.code) {
          this.$message.success(res.msg);
          this.clearDia();
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 复选框事件
    handleChange(val) {
      this.selection = val.map((v) => v.id);
    },
    // 删除单条分类
    deleteCategorys() {
      this.$confirm("是否确认删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteCategoryItems({ arr: this.selection });
        if (!res.code) {
          this.$message.success(res.msg);
          this.getMes();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    clearDia() {
      this.fileList = [];
      this.isShowAdd = false;
      this.isShowEdit = false;
      this.currentMes = {
        shopId: this.$store.getters.currentShop,
      };
    },
    // 文件上传成功
    handleSuccess(res) {
      if (!res.code) {
        this.option.pictureUrl = res.data.url;
      }
    },
    handleEditSuccess(res) {
      if (!res.code) {
        this.currentMes.pictureUrl = res.data.url;
      }
    },
    // 文件删除时触发
    handleRemove() {
      this.option.pictureUrl = "";
    },
    // 文件编辑时删除
    handleEditRemove() {
      this.currentMes.pictureUrl = "";
    },
  },
};
</script>

<style>
</style>