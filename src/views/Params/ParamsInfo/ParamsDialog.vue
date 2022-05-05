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
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="15%" class="demo-dynamic">
          <el-form-item
            inline
            class="list"
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="domain.value + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="domain.value" style="width: 50%"></el-input>
            <el-button @click="addDomainChild(index)">添加子组</el-button>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            <el-form-item
              class="list"
              v-for="(dChild, dIndex) in domain.children"
              :label="dChild.value"
              :key="dIndex"
              :prop="dChild.value"
              :rules="{
                required: false,
                message: '不能为空',
                trigger: 'blur'
              }"
            >
              <el-input v-model="dChild.value" style="width: 50%"></el-input>
              <el-button @click.prevent="removeDomainChild(index, dIndex)">删除</el-button>
            </el-form-item>
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
        domains: []
      }
    }
  },
  components: { TreeGoods },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.dynamicValidateForm)
          this.$api
            .addItemParam({
              itemCatId: this.treeData.cid,
              content: JSON.stringify(this.dynamicValidateForm.domains),
              specsName: this.treeData.name
            })
            .then(res => {
              console.log(res.data)
              if (res.data.status === 200) {
                this.dialogVisible = false
                this.innerVisible = false
                this.$parent.http(1)
              } else {
                this.$message.error(`'提交失败,',${res.data.msg}`)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.dynamicValidateForm.domains = []
    },
    /**
     * 删除子组
     */
    removeDomainChild(index, dIndex) {
      this.dynamicValidateForm.domains[index].children.splice(dIndex, 1)
    },
    removeDomain(item) {
      const index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
      /**
       *  添加子组
       */
    },
    addDomainChild(index) {
      this.dynamicValidateForm.domains[index].children.push({ value: '', key: Date.now() })
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        children: [],
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
