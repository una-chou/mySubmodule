import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'Home',
    component: () => import('@/views/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  //如果未匹配到路由
  if (to.matched.length === 0) {
    //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    from.name ? next({name: from.name}) : next({name: 'Home'})
  } else {
    //如果匹配到正确跳转
    next()
  }
})

export default router
