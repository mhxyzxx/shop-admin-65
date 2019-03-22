import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import UserList from '@/views/User'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: Login }, // 展示到 App.vue 的 router-view 中
    {
      path: '/', // Layout 显式到 App.vue 的 router-view 中
      component: Layout,
      children: [
        // 展示 /home 的时候，先展示父路由视图，然后子路由视图展示到父路由的 router-view 出口中
        { path: '', component: Home }, // 请求父路由路径的时候，默认渲染 path 为空的这个子路由
        { path: '/users', component: UserList }
      ]
    }
  ]
})
