<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'Goods' }">添加管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" class="demo-goodsForm">
      <el-form-item label="类目选择" prop="category">
        <el-button type="primary">类目选择</el-button>
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="goodsForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="goodsForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input-number v-model="goodsForm.num" controls-position="right" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="发布时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="goodsForm.date1" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="goodsForm.date2" style="width: 100%"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="goodsForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image"> </el-form-item>

      <el-form-item label="商品描述" prop="descs">
        <el-input type="textarea" v-model="goodsForm.descs"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('goodsForm')">确定</el-button>
        <el-button @click="resetForm('goodsForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsForm: {
        // 表单容器-对象
        title: '', // 商品名称
        price: '',
        num: 0,
        sellPoint: '',
        image: '',
        descs: '',
        cid: '',
        category: '', // 商品类目
        date1: '', // 商品时间
        date2: '' // 商品时间
      },
      rules: {
        // 校验规则
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        num: [{ required: true, message: '请输入数量', trigger: 'blur' }]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // title cid  category sellPoint price num descs paramsInfo image
          const { title, cid, category, sellPoint, price, num, descs, paramsInfo, image } = this.goodsForm
          this.$api
            .AddGoods({
              title,
              cid,
              category,
              sellPoint,
              price,
              num,
              descs,
              paramsInfo,
              image
            })
            .then(res => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  .el-breadcrumb {
    margin: 0 0 20px 0px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
  }
  padding: 20px;
  .line {
    text-align: center;
  }
}
</style>
