<script setup>
import {ref} from 'vue'
  defineProps({
    todoList:{
      type:Array,
      required: true,
      default:[]
      // ↑默认值为空
    }
  })

  const emit = defineEmits(['updateTask'])
  const editingId = ref(null)
  const editingTask = ref('')

   function startEditing(item)
   {
    editingId.value = item.id
    editingTask.value = item.task
   }

   function saveEditing()
   {
    emit('updateTask',{id:editingId.value,task:editingTask.value,isCompleted:false})
    editingId.value = null
    editingTask.value = ''
   }

   function cancelEditing()
   {
    editingId.value = null
    editingTask.value = ''
   }



</script>

<template>
  <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center"
  v-for="item in todoList" :key="item.id">
    <!-- 复选框 -->
      <div class="form-check">
      <input v-if="editingId !== item.id" class="form-check-input" type="checkbox"  :id="item.id" v-model="item.isCompleted">
      <label v-if="editingId !== item.id" class="form-check-label" :for="item.id" :class="item.isCompleted ? 'delete' : ''">
        {{ item.task }}
      </label>
      <input
          v-else
          v-model="editingTask"
          type="text"
          class="form-control"
          style="width: 200px;"
        />
    </div>
    <!-- 修改按钮 -->
    <button
        class="btn-primary"
        v-if="!item.isCompleted && editingId !== item.id"
        @click="startEditing(item)"
      >
        修改
      </button>

      <!-- 保存和取消按钮 -->
      <div v-if="editingId === item.id">
        <button class="btn-success" @click="saveEditing">保存</button>
        <button class="btn-secondary" @click="cancelEditing">取消</button>
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

  .delete{
    text-decoration:line-through;
  }
</style>