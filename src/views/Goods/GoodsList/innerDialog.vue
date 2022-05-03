<template>
  <el-dialog width="60%" title="类目选择" :visible.sync="innerVisible" append-to-body>
    <el-tree :props="props" :load="loadNode" lazy highlight-current @node-click="handleNodeClick"> </el-tree>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      innerVisible: false,
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      this.$emit('getCategory', data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getCategory().then(res => {
          return resolve(res.data.result)
        })
      }
      if (node.level >= 1) {
        this.$api
          .getCategory({
            id: node.data.cid
          })
          .then(res => {
            if (res.data.status === 200) {
              return resolve(res.data.result)
            } else {
              return resolve([])
            }
          })
      }
    }
  }
}
</script>

<style></style>
