import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    redirect:"/wok",
    children:[
      {
        path:"/users",
        name:"users",
        component:()=> import('../views/lists/users')
      },
      {
        path:"/roles",
        name:"roles",
        component:()=> import('../views/lists/roles')
      },
      {
        path:"/rights",
        name:"rights",
        component:()=> import('../views/lists/rights')
      },
      {
        path:"/goods",
        name:"goods",
        component:()=> import('../views/lists/goods')
      },
      {
        path:"/add",
        name:"add",
        component:()=> import('../views/lists/add')
      },
      {
        path:"/params",
        name:"params",
        component:()=> import('../views/lists/params')
      },
      {
        path:"/categories",
        name:"categories",
        component:()=> import('../views/lists/categories')
      },
      {
        path:"/orders",
        name:"orders",
        component:()=> import('../views/lists/orders')
      },
      {
        path:"/reports",
        name:"reports",
        component:()=> import('../views/lists/reports')
      },
      {
        path:"/wok",
        name:"wok",
        component:()=> import('../views/lists/wok')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
