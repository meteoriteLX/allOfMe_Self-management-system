<script setup>
// 删除原有业务逻辑，仅保留路由相关
</script>

<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/home" class="nav-btn">首页</router-link>
      <router-link to="/todos" class="nav-btn">待办事项</router-link>
      <router-link to="/calendar" class="nav-btn">日历视图</router-link>
    </nav>
    <!-- 删除测试用文字 -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
.nav-btn {
  padding: 10px 20px;
  margin: 0 10px;
  background: #538FFF;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.nav-btn.router-link-exact-active {
  background: #3377FF;
}




</style>