<script setup>
  // name: "todoList"
  defineProps({
    todoList:{
      type:Array,
      required: true,
      default:[]
      // ↑默认值为空
    }
  })

</script>

<template>
  <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center"
  v-for="item in todoList" :key="item.id">
    <!-- 复选框 -->
      <div class="form-check">
      <input class="form-check-input" type="checkbox"  :id="item.id">
      <label class="form-check-label" :for="item.id">
        {{ item.task }}
      </label>
    </div>
    <span class="badge badge-primary badge-pill" v-if="item.isCompleted">已完成</span>
    <span class="badge badge-warning badge-pill" v-else>未完成</span>
  </li>
  
</ul>

</template>

<style scoped>
/* scoped 防止不同组件样式之间出问题 */
  .list-group{
    width: 500px; 
    margin: auto;

  }
</style>