<script setup>
import todoList from './components/todoList.vue';
import {reactive,ref} from 'vue'
  const List = reactive({
    todoList:[
      {id:1,task:'吃饭',isCompleted:true},
      {id:2,task:'睡觉',isCompleted:false},
    ]
  })
  //其实这种简单的可以不用reactive，可以直接用普通对象or直接数组orref
</script>

<template>
  <div id="app">
    <h1>根组件</h1> 
    <!-- :propName="value" 将数据传递给子组件。
子组件通过 defineProps 或 props 选项声明并接收这些数据。 -->
    <todoList :todoList="List.todoList"></todoList>
  </div>

</template>

<style scoped>

</style>