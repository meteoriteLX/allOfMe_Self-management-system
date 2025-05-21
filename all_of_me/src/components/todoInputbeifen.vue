<script setup>
import{ref} from 'vue'
const taskname = ref('')
const emit = defineEmits(['addTask'])
function onsubmit()
{
  if(taskname.value.trim() === ''){
    alert('任务名称不能为空')
    return
  }
  emit('addTask',{id:Date.now(),task:taskname.value , isCompleted:false})
  taskname.value = ''

}

</script>

<template>
  <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">新建任务</span>
  </div>
  <input v-model="taskname" type="text" class="form-control" placeholder="请输入任务" aria-label="Username" aria-describedby="basic-addon1">
  <button class="btn-primary" @click="onsubmit">提交</button>
</div>

</template>

<style scoped>
.input-group {
  width: 500px;
  margin: 0 auto;
}

</style>