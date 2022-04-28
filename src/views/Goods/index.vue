<template>
  <div class="goods">
    <div class="goods-top">
      <el-input v-model="search" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <div class="goods-content">
      <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品ID" width="100"> </el-table-column>
        <el-table-column prop="name" label="商品名称" width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="address" label="商品价格" width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="address" label="商品数量" width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="address" label="规格类目" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="address" label="商品图片"> </el-table-column>
        <el-table-column prop="address" label="商品卖点" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="address" label="商品描述" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="goods-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="100" layout="total, prev, pager, next, jumper" :total="400"> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'My-Goods',
  data() {
    return {
      search: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {
  padding: 10px;
  .goods-top {
    display: flex;
    padding: 20px 8px;
    .el-button {
      margin-left: 10px;
    }
  }
  .goods-paging {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>
