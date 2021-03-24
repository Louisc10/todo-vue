import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from './../components/Register.vue'
import TodoList from './../components/TodoList.vue'

Vue.use(VueRouter)


const routes= [
  {path : '/', redirect: '/Register'},
  { path: '/Register', name:'Register', component: Register },
  { path: '/ToDo', name:'ToDo', component: TodoList },
]

const router = new VueRouter({
    mode: 'history',
    routes
  }
)
export default router

