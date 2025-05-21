<script setup>
import todoList from './todoList.vue';
import { useTodoStore } from '../stores/todoStore';
import todoButton from './todoButton.vue';
import todoInput from './todoInput.vue';

const todoStore = useTodoStore();

</script>

<template>
  <div id="app">
    <div class="nav1">
        <nav>
        &nbsp;&nbsp;<router-link to="/home" class="nav-title">首页</router-link>
        &nbsp;<router-link to="/todos" class="nav-title">待办清单</router-link>
        &nbsp;<router-link to="/calendar" class="nav-title">日历视图</router-link>
        </nav>
    </div>
    
    <div class="todolist-body">
      <h1>待办清单</h1> 
      <h2>TodoList</h2>
      <todoInput />
      <todoList />
      <todoButton />
      
    </div>
    
  </div>

</template>

<style scoped>
#app {
  background-image: url(../assets/img/bg2.jpg);
  height: 100vh;
  width: 100vw;
  color: rgb(14, 56, 145);
}

.todolist-body {
  text-align: center;
}
#app h1{
  font-size: 35px;
  padding: 20px;
  color: rgb(51, 91, 177);
}
#app h2{
  font-size: 25px;
  padding-bottom: 15px;
  color: rgb(51, 91, 177);
}
.nav1 {

}
</style>