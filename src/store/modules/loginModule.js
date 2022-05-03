export default {
  namespaced: true,
  state: {
    userInfo: {
      user: '',
      token: ''
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userInfo = payload
    },
    clearUser(state) {
      state.userInfo = {
        user: '',
        token: ''
      }
    }
  },
  actions: {},
  getters: {}
}
