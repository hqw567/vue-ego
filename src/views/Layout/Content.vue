<template>
  <div>
    <div class="header">
      <div class="icon-fold" @click="Collapse"><i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i></div>
      <div class="header-right">
        <div class="down-menu">
          <el-dropdown trigger="click" @command="clickDropdown">
            <span class="el-dropdown-link"> 多语言<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command="zh-cn">中文</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus" command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="user">
          <span>Hello</span>
          <span>{{ userInfo.user }}</span>
          <i class="el-icon-close" @click="exit"></i>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Layout-Content',
  props: ['isCollapse'],
  computed: {
    ...mapState('loginModule', ['userInfo'])
  },
  methods: {
    Collapse() {
      this.$emit('Collapse')
    },
    clickDropdown(command) {
      this.$i18n.locale = command
    },
    ...mapMutations('loginModule', ['clearUser']),
    exit() {
      this.clearUser()
      localStorage.removeItem('user')
      this.$router.push('/login')
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
      cursor: pointer;
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
