<template>
  <div class="form-container">
    <div class="form-hd">商品添加</div>
    <div class="form-bd">
      <el-form
        label-width="120px"
        :model="option"
        :rules="rules"
        ref="formTable"
      >
        <el-form-item label="商品名称:" prop="name">
          <el-input v-model="option.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元):" prop="price">
          <el-input v-model="option.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存:" prop="stock">
          <el-input v-model.number="option.stock"></el-input>
        </el-form-item>
        <el-form-item label="商品所属分类:" prop="categoryItemId">
          <el-select v-model="option.categoryItemId">
            <el-option
              v-for="item in categoryItem"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上架:" class="single" prop="flag">
          <el-radio-group v-model.number="option.flag">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述:" class="single" prop="desc">
          <el-input type="textarea" v-model="option.desc"></el-input>
        </el-form-item>
        <el-form-item label="图片上传:" class="single">
          <el-upload
            :action="action"
            list-type="picture-card"
            :headers="headers"
            multiple
            :on-success="handleSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-ft">
      <el-button type="info" @click="jumpGoods">返回上一层</el-button>
      <el-button type="primary" @click="createGoods">创建商品</el-button>
    </div>
  </div>
</template>

<script>
import API from "api/goods";
export default {
  data() {
    return {
      categoryItem: [],
      option: {
        name: "",
        categoryItemId: "",
        stock: "",
        price: "",
        flag: 1,
        desc: "",
        shopId: this.$store.getters.currentShop,
        pictureUrl: [],
      },
      action: "http://127.0.0.1:8888/upload/goods",
      headers: {
        authorization: localStorage.getItem("token"),
      },
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        categoryItemId: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        stock: [
          { required: true, message: "请填写库存", trigger: "blur" },
          {
            type: "number",
            message: "请填写正确的库存信息",
            trigger: "blur",
          },
        ],
        price: [{ required: true, message: "请填写库存", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getCategoryItem();
  },
  methods: {
    // 获取二级类目
    async getCategoryItem() {
      const res = await API.getCategoryItem({
        shopId: this.$store.getters.currentShop,
      });
      if (!res.code) {
        this.categoryItem = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 跳转商品首页
    jumpGoods() {
      this.$router.push("/goodsManage/index");
    },
    // 创建商品
    createGoods() {
      this.$refs.formTable.validate(async (valid) => {
        if (valid) {
          const res = await API.createGoods(this.option);
          if (!res.code) {
            this.$message.success(res.msg);
            this.$router.push("/goodsManage/index");
          } else {
            this.$message.error(res.msg);
          }
        } else {
          return false;
        }
      });
    },
    // 上传成功回执
    handleSuccess(res) {
      this.option.pictureUrl.push(res.data.url);
    },
    // 上传失败回执
    handleRemove(res, file) {
      this.option.pictureUrl = file.map((v) =>
        !v.response.code ? v.response.data.url : ""
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  border: 1px solid #e6e6e6;
  width: 1280px;
  margin: 0 auto;
  margin-top: 5vh;
  overflow: auto;
  .form-hd {
    display: flex;
    align-content: center;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    padding: 10px 0;
    font-size: 30px;
  }
  .form-bd {
    margin: 30px 10px 10px 10px;
    .el-form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      /deep/.el-form-item {
        width: 50%;
        .el-select {
          width: 100%;
        }
      }
      .single {
        flex: 100%;
      }
    }
  }
  .form-ft {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    border-top: 1px solid #e6e6e6;
  }
  .el-input {
    min-width: 200px;
  }
}
</style>