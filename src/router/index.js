import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: () => import('@/views/Layout/index.vue'),
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
      },
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
        component: () => import('@/views/Params'),
        redirect: '/params/specifications',
        children: [
          {
            path: 'specifications',
            name: 'Specifications',
            component: () => import('@/views/Params/ParamsInfo/Specifications')
          }
        ]
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
