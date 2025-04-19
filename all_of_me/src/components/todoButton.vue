<script setup>
import { ref,defineEmits } from 'vue'
  const active = ref(0);
  const emit = defineEmits(['updateActive'])
  const changeActive = (index) =>{
    active.value = index
    // console.log(active.value)
    emit('updateActive',active.value)
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