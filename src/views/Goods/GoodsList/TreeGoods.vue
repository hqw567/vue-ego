<template>
  <el-tree :props="props" :load="loadNode" lazy highlight-current @node-click="handleNodeClick"> </el-tree>
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
    handleNodeClick(data) {
      this.$emit('getCategory', data.name)
    }
  }
}
</script>

<style></style>
