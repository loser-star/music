import Vue from 'vue'
import VueRouter from 'vue-router'
// import * as path from 'path'
// 注意点: 通过 improt xxx from xxx的方式加载组件, 无论组件有没有被用到, 都会被加载进来
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'
Vue.use(VueRouter)
const Recommend = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/Recommend')
const Singer = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/Singer')
const Rank = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/Rank')
const Search = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/Search')
const Detail = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/Detail')
const User = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/views/User')
const routes = [
  {
    path: '/',
    component: Recommend
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      { path: `defail/:id/:type`, component: Detail }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      { path: `defail/:id/:type`, component: Detail }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      { path: `defail/:id/:type`, component: Detail }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  /*
  注意点: 如果Router中使用的是history模式, 那么打包之后的项目不能刷新, 刷新就会出现404
  解决方案: 1.Router这两个不要使用history模式, 使用hash模式
            2.在服务端上面进行一些额外的配置
  * */
  // 注意点: 如果需要使用预渲染的插件, 那么Router的模式必须是history模式
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
