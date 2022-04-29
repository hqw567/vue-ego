<template>
  <div class="goods">
    <div class="goods-top">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="searchQuery">查询</el-button>
      <el-button type="primary" @click="addGoods">页面添加</el-button>
      <el-button type="primary" @click="addDialog">弹窗添加</el-button>
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
      <MyPagination :pageSize="pageSize" :total="total" @changePage="changePage" :currentPage="currentPage" />
    </div>
    <div>
      <AddDialog ref="AddDialog" />
    </div>
  </div>
</template>

<script>
import MyPagination from '../../components/MyPagination.vue'
import AddDialog from './GoodsList/AddDialog.vue'
export default {
  name: 'My-Goods',
  components: {
    MyPagination,
    AddDialog
  },
  data() {
    return {
      input: '',
      tableData: [],
      pageSize: 10,
      total: 1,
      isSearch: false,
      list: [],
      currentPage: 1
    }
  },
  methods: {
    // saveDialog() {},
    addDialog() {
      this.$refs.AddDialog.dialogVisible = true
    },
    // closeDialog() {},
    /*
     * 添加商品
     */
    addGoods() {
      this.$router.push({ name: 'AddGoods' })
    },
    searchQuery() {
      if (!this.input) {
        this.getApiPage(1)
        this.currentPage = 1
        this.isSearch = false
        return
      }
      this.$api
        .getGoodsSearch({
          search: this.input
        })
        .then(res => {
          this.currentPage = 1
          if (res.data.status >= 200 && res.data.status < 300) {
            this.list = res.data.result
            this.total = res.data.result.length
            this.pageSize = 3
            this.tableData = res.data.result.slice(0, 3)
            this.isSearch = true
          } else {
            this.tableData = []
            this.total = 1
            this.pageSize = 1
            this.isSearch = false
          }
        })
    },

    changePage(page) {
      this.currentPage = page
      if (this.isSearch === false) {
        this.getApiPage(page)
      } else {
        this.tableData = this.list.slice((page - 1) * 3, page * 3)
      }
    },
    getApiPage(page) {
      this.$api
        .getGoodsList({
          page: page
        })
        .then(res => {
          if (res.data.status >= 200 && res.data.status < 300) {
            this.tableData = res.data.data
            this.pageSize = res.data.pageSize
            this.total = res.data.total
          }
        })
    }
  },
  created() {
    this.getApiPage(1)
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
