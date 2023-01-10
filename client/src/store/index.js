import { createStore } from 'vuex';
import api from "../helpers/api";
import authModule from "./modules/auth";
import { useToast } from 'vue-toastification';

const toast = useToast()

export default createStore({
  state: {
    loading: false,
    toast: {
      show: false,
      msg: "",
      type: ""
    }
  },
  getters: {},
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setToast(state, payload) {
      state.toast = payload
      console.log(payload);
      setTimeout(() => {
        state.toast.show = false
        state.toast.type = ''
        state.toast.msg = ''
      }, 4000)
    }
  },
  actions: {
  },
  // auth/account 
  modules: {
    auth: authModule
  }
})
