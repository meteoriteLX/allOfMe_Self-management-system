import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/bootstrap.css'
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css' 
import router from'./router'
import './assets/css/main.css'


const app = createApp(App)
app.use(ElementPlus) 
app.use(router)
app.mount('#app')
