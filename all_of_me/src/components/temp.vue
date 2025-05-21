<script setup>
import { ref,defineEmits } from 'vue'
import { useTodoStore } from '../stores/todoStore'
  
  const todoStore = useTodoStore()
  const active = ref(todoStore.active);
  const changeActive = (index) =>{
    todoStore.updateActive(index)
  }

</script>

<template>
  <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn" @click="changeActive(0)" :class="active === 0 ? 'btn-primary':'btn-secondary'">全部</button>
  <button type="button" class="btn" @click="changeActive(1)" :class="active === 1 ? 'btn-primary':'btn-secondary'">已完成</button>
  <button type="button" class="btn" @click="changeActive(2)" :class="active === 2 ? 'btn-primary':'btn-secondary'">未完成</button>
</div>

</template>

<style scoped>
.btn-group {
  width: 500px;
  margin: 20px auto;
}
</style>