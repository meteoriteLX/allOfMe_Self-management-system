import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../components/todo.vue'  // 将现有App改名为TodoPage
import CalendarPage from '../components/calendar.vue'
import mainPage from '../App.vue'
import HomePage from '../components/home.vue'


const routes = [
  {
    path: '/',
    // component: mainPage, // App.vue作为布局容器
    children: [
      { 
        path: '', // 默认子路由
        redirect: {name:'Home'}
      },
      {
        path: 'home',
        name:'Home',
        component:HomePage
      },
      { 
        path: 'todos', 
        component: TodoPage 
      },
      { 
        path: 'calendar', 
        component: CalendarPage 
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router