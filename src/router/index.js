import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from './../components/Register.vue'
import TodoList from './../components/TodoList.vue'
import Login from './../components/Login.vue'
import DetailTodo from './../components/DetailTodo'

Vue.use(VueRouter)


const routes= [
  { path : '/', redirect: '/Login' },
  { path: '/Register', name:'register', component: Register },
  { path: '/Login', name:'login', component: Login },
  { path: '/ToDo', name:'todo', component: TodoList },
  { path: '/ToDo/detail/:id', name:'detailtodo', component: DetailTodo },
]

const router = new VueRouter({
    mode: 'history',
    routes
  }
)
export default router

