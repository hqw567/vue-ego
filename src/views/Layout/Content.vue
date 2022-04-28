<template>
  <div>
    <div class="header">
      <div class="icon-fold" @click="Collapse"><i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i></div>
      <div class="header-right">
        <div class="down-menu">下拉菜单<i class="el-icon-arrow-down"></i></div>
        <div class="user">
          <span>Hello</span>
          <span>Admin</span>
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout-Content',
  props: ['isCollapse'],
  methods: {
    Collapse() {
      this.$emit('Collapse')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .icon-fold {
    width: 45px;
    height: 45px;
    cursor: pointer;
    i {
      font-size: 45px;
      color: #2f4157;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    display: flex;
    .down-menu {
      margin-right: 15px;
      i {
        font-size: 20px;
      }
    }
    .user {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        margin-right: 5px;
      }
      i {
        font-size: 30px;
        background-color: brown;
      }
    }
  }
}
</style>
