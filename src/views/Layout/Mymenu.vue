<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#2f4157" text-color="#fff" active-text-color="#ffd04b" router :collapse="isCollapse">
    <h1 class="menu-title">{{ isCollapse ? '后台' : '后台管理系统' }}</h1>
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/goods">
      <i class="el-icon-document"></i>
      <span slot="title">商品管理</span>
    </el-menu-item>
    <el-menu-item index="/params">
      <i class="el-icon-setting"></i>
      <span slot="title">规格参数</span>
    </el-menu-item>
    <el-menu-item index="/advert">
      <i class="el-icon-setting"></i>
      <span slot="title">广告分类</span>
    </el-menu-item>
    <el-submenu index="/order">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/order/order-list"> <i class="el-icon-location"></i>订单列表</el-menu-item>

        <el-menu-item index="/order/order-back"> <i class="el-icon-location"></i>退货订单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'Layout-Mymenu',
  props: ['isCollapse']
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu-title {
  color: #fff;
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  margin: 10px 0;
}
</style>
