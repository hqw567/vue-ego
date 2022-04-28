<template>
  <div class="layout">
    <Mymenu class="menu" :isCollapse="isCollapse" />
    <Content class="content" @Collapse="Collapse" :isCollapse="isCollapse" :class="{ isActive: isCollapse }" />
  </div>
</template>

<script>
import Mymenu from './Mymenu.vue'
import Content from './Content.vue'
export default {
  name: 'My-Layout',
  components: {
    Mymenu,
    Content
  },
  data() {
    return { isCollapse: false }
  },
  methods: {
    Collapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  .menu {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #2f4157;
    height: 100vh;
  }
  .content {
    margin-left: 200px;
    transition: all 0.3s;
  }
  .isActive {
    margin-left: 64px;
  }
}
</style>
