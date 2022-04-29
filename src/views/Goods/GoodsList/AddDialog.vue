<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
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
          <el-input-number v-model="goodsForm.num" controls-position="right" :min="0" :max="9999"></el-input-number>
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('goodsForm')">重置</el-button>
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // props: ['dialogVisible'],

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
      },
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // this.$emit('closeDialog')
          done()
        })
        .catch(_ => {})
    },
    closeDialog() {
      // this.$emit('closeDialog')
      this.dialogVisible = false
    },
    saveDialog() {
      // this.$emit('saveDialog')
      this.dialogVisible = false
      this.submitForm('goodsForm')
      // 保存处理---
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
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

<style scoped>
.line {
  text-align: center;
}
</style>
