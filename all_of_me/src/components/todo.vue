<script setup>
import todoList from './todoList.vue';
import {reactive,ref ,computed} from 'vue'
import todoButton from './todoButton.vue';
import todoInput from './todoInput.vue';

const active = ref(0);
const handleUpdateActive = (newActive) => {
  active.value = newActive
}
//当子组件触发 emit('updateActive', active.value) 时，newActive 会接收到子组件传递的 active 值。

const filterTodolist = computed(() =>{
    if(active.value === 0) return List.todoList;
    if(active.value === 1) return List.todoList.filter(item => item.isCompleted)
    if(active.value === 2) return List.todoList.filter(item => !item.isCompleted)
})

  const List = reactive({
    todoList:[
      {id:1,task:'吃饭',isCompleted:true},
      {id:2,task:'睡觉',isCompleted:false},
    ]
  })
  //其实这种简单的可以不用reactive，可以直接用普通对象or直接数组orref

  const addTask = (newTask) => {
    List.todoList.push(newTask)
  }

  const updateTask = ({id,task}) =>{
    const taskToUpdate = List.todoList.find((item) => item.id ===id)
    if(taskToUpdate) {
      taskToUpdate.task = task
    }
  }
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
      <todoInput @addTask="addTask"/>
      <!-- :propName="value" 将数据传递给子组件。
  子组件通过 defineProps 或 props 选项声明并接收这些数据。 -->
      <todoList :todoList="filterTodolist" @updateTask="updateTask"></todoList>
      <todoButton @updateActive="handleUpdateActive"></todoButton>
      
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