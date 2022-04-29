import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('@/views/Goods')
      },
      {
        path: '/add-goods',
        name: 'AddGoods',
        component: () => import('@/views/Goods/GoodsList/AddGoods.vue')
      },
      {
        path: '/order',
        name: 'Order',
        redirect: '/order/order-list',
        component: () => import('@/views/Order'),
        children: [
          {
            path: 'order-list',
            name: 'OrderList',
            component: () => import('@/views/Order/OrderList/index.vue')
          },
          {
            path: 'order-back',
            name: 'OrderBack',
            component: () => import('@/views/Order/OrderBack/index.vue')
          }
        ]
      },
      {
        path: '/params',
        name: 'Params',
        component: () => import('@/views/Params/Params.vue')
      },
      {
        path: '/advert',
        name: 'Advert',
        component: () => import('@/views/Advert/Advert.vue')
      },
      {
        path: '/user',
        name: 'User'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
