<template>
  <div>
    <el-dialog :title="dialogName" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" class="demo-goodsForm">
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="clickPrimary">类目选择</el-button>
          <span>{{ goodsForm.category }}</span>
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
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="updateImage">上传图片</el-button>

          <a :href="goodsForm.image" target="_blank">
            <img :src="goodsForm.image" style="margin-left: 20px; width: 200px" />
          </a>
        </el-form-item>

        <el-form-item label="商品描述" prop="descs">
          <MyEditor ref="MyEditor" @sendEditor="sendEditor" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('goodsForm')">重置</el-button>
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
      <innerDialog ref="innerDialog" @getCategory="getCategory" />
      <el-dialog width="60%" title="上传图片" :visible.sync="innerVisible" append @close="closeUpdate" append-to-body>
        <updateImg ref="UpdateImg" @closeImg="closeImg" />
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import innerDialog from './innerDialog.vue'
import MyEditor from '@/components/MyEditor.vue'
import updateImg from './UpdataImg.vue'
export default {
  // props: ['dialogVisible'],
  props: ['rowData'],
  components: { innerDialog, MyEditor, updateImg },
  data() {
    return {
      dialogName: '添加商品',
      imgUrl: '',
      innerVisible: false,
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
      },
      dialogVisible: false
    }
  },
  watch: {
    rowData(val) {
      this.goodsForm = val
    }
  },
  methods: {
    sendEditor(val) {
      this.goodsForm.descs = val
    },
    closeImg(imgUrl) {
      this.goodsForm.image = imgUrl
    },
    closeUpdate() {},
    updateImage() {
      this.innerVisible = true
    },
    getCategory(data) {
      this.goodsForm.category = data.name
      this.goodsForm.cid = data.cid
      console.log(this.goodsForm.category)
    },
    clickPrimary() {
      this.$refs.innerDialog.innerVisible = true
    },
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
      this.resetForm('goodsForm')
      // 保存处理---
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // title cid  category sellPoint price num descs paramsInfo image
          const { title, cid, category, sellPoint, price, num, descs, paramsInfo, image, id } = this.goodsForm

          if (this.dialogName === '添加商品') {
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
              .then(res => {
                if (res.status === 200) {
                  this.$emit('AddSuccess', res)
                }
              })
          } else {
            this.$api
              .updateGoods({
                id,
                title,
                cid,
                category,
                sellPoint,
                price,
                num,
                descs,
                image,
                paramsInfo: JSON.stringify(this.groups)
              })
              .then(res => {
                if (res.data.status === 200) {
                  this.$parent.getApiPage(1) // 更新父组件列表数据
                  this.$message({
                    message: '恭喜你，修改商品成功',
                    type: 'success'
                  })
                } else {
                  // 修改失败了--
                }
              })
          }
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
