import { defineStore } from 'pinia';
import { ref,computed } from 'vue';

//'todo'为唯一标识
export const useTodoStore = defineStore('todo',()=>{
  const todoList = ref([
    {id: 1,task: '吃饭', isCompleted: true},
    {id: 1,task: '吃饭', isCompleted: true},
  ]);

  const active = ref(0); //0: 全部, 1: 已完成, 2: 未完成

  //计算属性：根据 active 筛选待办事项
  const filterTodolist = computed(()=>{
    if(active.value === 0) return todoList.value;
    if(active.value === 1) return todoList.value.filter((item) => item.isCompleted);
    if(active.value === 2) return todoList.value.filter((item) => !item.isCompleted);
  });

  //方法
  const addTask = (newTask) => {
    todoList.value.push(newTask);
  }

  const updateTask = ({id,task}) => {
    const taskToUpdate = todoList.value.find((item) => item.id === id);
    if(taskToUpdate) {
      taskToUpdate.task = task;
    }
  }

  const updateActive = (newActive) => {
    active.value = newActive;
  }

  return {
    todoList,
    active,
    filterTodolist,
    addTask,
    updateTask,
    updateActive,
  };

});
