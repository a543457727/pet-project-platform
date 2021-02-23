<template>
  <div class="contain">
    <div class="utils">
      <el-input
        size="mini"
        placeholder="请输入商品名称"
        v-model="params.name"
      ></el-input>
      <el-select
        v-model="params.flag"
        placeholder="上架状态"
        clearable
        size="mini"
      >
        <el-option :value="1" label="上架中"></el-option>
        <el-option :value="0" label="未上架"></el-option>
      </el-select>
      <el-button size="mini" type="primary" @click="getMes()">查询</el-button>
      <el-button size="mini" type="primary" @click="reset()">重置</el-button>
      <el-button size="mini" type="success" @click="addGoods">
        添加商品
      </el-button>
      <el-button
        size="mini"
        type="danger"
        @click="deleteGoods"
        :disabled="selection.length == 0"
      >
        删除商品
      </el-button>
    </div>
    <div class="tableBox">
      <el-table
        border
        height="900"
        :data="tableData"
        @selection-change="handleChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          align="center"
          label="商品名称"
          prop="name"
        ></el-table-column>
        <el-table-column align="center" label="商品图片">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.pictures[0] ? scope.row.pictures[0].smallImg : ''"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品价格(元)"
          prop="price"
        ></el-table-column>
        <el-table-column
          align="center"
          label="商品二级分类"
          prop="categoryItemId"
        ></el-table-column>
        <el-table-column
          align="center"
          label="商品库存"
          prop="stock"
        ></el-table-column>
        <el-table-column
          align="center"
          label="商品描述"
          prop="desc"
        ></el-table-column>
        <el-table-column align="center" label="商品创建时间" prop="createTime">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否上架" prop="flag">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.flag == 1" type="success">上架</el-tag>
            <el-tag v-else type="danger">未上架</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              v-if="scope.row.flag"
              @click="putAway(scope.row)"
            >
              上架
            </el-button>
            <el-button
              size="mini"
              type="warning"
              v-else
              @click="putAway(scope.row)"
            >
              下架
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="jumpEdit(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteGood(scope.row.id)"
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
import API from "api/goods";
export default {
  data() {
    return {
      params: {
        page: 1,
        size: 10,
        categoryItemId: "",
        shopId: this.$store.getters.currentShop,
        name: "",
      },
      tableData: [],
      total: 0,
      selection: [],
    };
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
  created() {
    this.getMes();
  },
  methods: {
    // 获取商品列表
    async getMes(option) {
      if (option) {
        this.params.page = option.page;
        this.params.size = option.size;
      }
      const res = await API.getMes(this.params);
      if (!res.code) {
        this.tableData = res.data.goods;
        this.total = res.data.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 跳转新增页面
    addGoods() {
      this.$router.push("/goodsManage/add");
    },
    jumpEdit(id) {
      this.$router.push({
        name: "goodsEdit",
        params: { id },
      });
    },
    async putAway(data) {
      const params = {
        shopId: this.$store.getters.currentShop,
        flag: data.flag == 1 ? 0 : 1,
      };
      const res = await API.putAway(data.id, params);
      if (!res.code) {
        this.$message.success(res.msg);
        this.getMes();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除单条分类
    deleteGood(id) {
      this.$confirm("是否确认删除该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteGood(id);
        if (!res.code) {
          this.$message.success(res.msg);
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
    // 重置
    reset() {
      this.params = {
        page: 1,
        size: 10,
        categoryItemId: "",
        shopId: this.$store.getters.currentShop,
        name: "",
      };
      this.getMes();
    },
    // 删除多条分类
    deleteGoods() {
      this.$confirm("是否确认选中商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await API.deleteGoods({ arr: this.selection });
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