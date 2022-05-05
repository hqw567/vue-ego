<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <TreeGoods @getCategory="getCategory" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true" :disabled="isDisabled">确 定并添加分组</el-button>
      </span>
      <el-dialog width="45%" title="商品规格配置" :visible.sync="innerVisible" append-to-body>
        <div class="title">当前选择商品:{{ treeData.name }}</div>
        <el-button type="primary" @click="addDomain"> 新增规格列表 </el-button>
        <hr />
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
          <el-form-item
            class="list"
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '域名不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="domain.value" style="width: 50%"></el-input>
            <el-button>添加子组</el-button>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>

            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TreeGoods from '@/views/Goods/GoodsList/TreeGoods.vue'
export default {
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      isDisabled: true,
      treeData: {},
      dynamicValidateForm: {
        domains: [
          {
            value: ''
          }
        ]
      }
    }
  },
  components: { TreeGoods },
  methods: {
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
    },
    removeDomain(item) {
      const index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    },
    getCategory(val) {
      this.treeData = val
      this.isDisabled = false
      console.log(this.treeData)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
