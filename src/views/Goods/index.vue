<template>
  <div class="goods">
    <div class="goods-top">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <div class="goods-content">
      <el-table ref="multipleTable" :data="tableData" stripe border style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
        <el-table-column prop="title" label="商品名称" width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="price" label="商品价格" width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="num" label="商品数量" width="100" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="category" label="规格类目" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="goods-paging">
      <MyPagination :pageSize="pageSize" :total="total" />
    </div>
  </div>
</template>

<script>
import MyPagination from '../../components/MyPagination.vue'
export default {
  name: 'My-Goods',
  components: {
    MyPagination
  },
  data() {
    return {
      input: '',
      tableData: [],
      pageSize: 10,
      total: 1
    }
  },
  created() {
    this.$api
      .getGoodsList({
        page: 1
      })
      .then(res => {
        if (res.data.status >= 200 && res.data.status < 300) {
          this.tableData = res.data.data
          this.pageSize = res.data.pageSize
          this.total = res.data.total
        }
      })
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
