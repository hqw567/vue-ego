import store from '../store'
import router from './index'
router.beforeEach((to, from, next) => {
  if (to.matched.some(ele => ele.meta.isLogin)) {
    const token = store.state.loginModule.userInfo.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
