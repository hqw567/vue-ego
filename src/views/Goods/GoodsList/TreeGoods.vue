<template>
  <div>
    <el-tree :props="props" :load="loadNode" @node-click="handleNodeClick" lazy highlight-current> </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
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
    },
    handleNodeClick(data) {
      this.$emit('getCategory', data)
    }
  }
}
</script>

<style></style>
