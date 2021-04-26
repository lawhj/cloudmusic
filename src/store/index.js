import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin:false,
    user:{}
  },
  mutations: {
    setLogin(state,payload){
      state.isLogin=payload
    },
    setUser(state,payload){
      state.user=payload
    }
  },
  actions: {
  },
  modules: {
  }
})
