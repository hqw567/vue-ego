<template>
  <div class="container">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/params' }">规划参数</el-breadcrumb-item>
        <el-breadcrumb-item>规格与包装</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header">
      <el-input v-model="input"> </el-input>
      <el-button type="primary">查看</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column prop="id" label="规格参数ID" width="100"> </el-table-column>
        <el-table-column prop="itemCatId" label="类目ID" width="100"> </el-table-column>
        <el-table-column prop="specsName" label="格参数名称" width="100"> </el-table-column>
        <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip> </el-table-column>
        <el-table-column width="150" label="操作">
          <template>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <MyPagination :total="total" :pageSize="pageSize" />
      <ParamsDialog ref="ParamsDialog" />
    </div>
  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination.vue'
import ParamsDialog from './ParamsDialog.vue'
export default {
  name: 'ParamsInfo',
  components: {
    MyPagination,
    ParamsDialog
  },
  data() {
    return {
      input: '',
      tableData: [
        {
          id: '',
          itemCatId: '',
          specsName: '',
          paramData: ''
        }
      ],
      total: 10,
      pageSize: 1
    }
  },
  methods: {
    /**
     * 点击添加显示弹窗
     */
    showDialog() {
      this.$refs.ParamsDialog.dialogVisible = true
    },
    http(page) {
      this.$api.getParams({ page }).then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
          this.pageSize = res.data.pageSize
        }
      })
    }
  },
  created() {
    this.http(1)
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .nav {
    padding: 10px;
  }
  .header {
    display: flex;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #eee;
    margin-bottom: 10px;
    button {
      margin-left: 20px;
    }
  }
}
</style>
