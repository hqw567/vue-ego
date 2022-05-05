<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#2f4157" text-color="#fff" active-text-color="#ffd04b" router :collapse="isCollapse">
    <h1 class="menu-title">{{ isCollapse ? '后台' : '后台管理系统' }}</h1>
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ $t('menu.home') }}</span>
    </el-menu-item>
    <el-menu-item index="/goods">
      <i class="el-icon-document"></i>
      <span slot="title">{{ $t('menu.goods') }}</span>
    </el-menu-item>
    <el-submenu index="/params">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>规格参数</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/params/specifications"> <i class="el-icon-location"></i>规格与包装</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/user">
      <i class="el-icon-setting"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>
    <el-submenu index="/order">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ $t('menu.order') }}</span>
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
