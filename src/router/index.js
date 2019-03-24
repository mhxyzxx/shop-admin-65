import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import UserList from '@/views/User'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login }, // 展示到 App.vue 的 router-view 中
    {
      path: '/', // Layout 显式到 App.vue 的 router-view 中
      component: Layout,
      children: [ // 嵌套路由：https://router.vuejs.org/zh/guide/essentials/nested-routes.html
        // 展示 /home 的时候，先展示父路由视图，然后子路由视图展示到父路由的 router-view 出口中
        { path: '', component: Home }, // 请求父路由路径的时候，默认渲染 path 为空的这个子路由
        { path: '/users', component: UserList }
      ]
    }
  ]
})

/**
 * to 去哪儿
 * from 来自哪里
 * next 放行规则
 */
router.beforeEach((to, from, next) => {
  // 如果路由路径是 /login ，则直接允许通过
  if (to.path === '/login') {
    return next()
  }

  // 否则校验登录状态
  const token = window.localStorage.getItem('token')

  //   如果没有登录，跳转到登录页
  if (!token) {
    return next('/login')
  }

  //   如果登录了，允许通过
  next()
})

export default router
