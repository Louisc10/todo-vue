import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from './../components/Register.vue'
import TodoList from './../components/TodoList.vue'
import Login from './../components/Login.vue'
import DetailTodo from './../components/DetailTodo'

Vue.use(VueRouter)


const routes= [
  {path : '/', redirect: '/Login'},
  { path: '/Register', name:'Register', component: Register },
  { path: '/Login', name:'Login', component: Login },
  { path: '/ToDo', name:'ToDo', component: TodoList },
  { path: '/ToDo/detail', name:'DetailToDo', component: DetailTodo },
]

const router = new VueRouter({
    mode: 'history',
    routes
  }
)
export default router

