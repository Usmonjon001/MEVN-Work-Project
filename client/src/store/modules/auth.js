import api from "@/helpers/api"
import Cookie from "js-cookie"

const authModule = {
    namespaced: true,
    state: {
        account: Cookie.get('account') ? Cookie.get('account') : {},
        token: Cookie.get('token') ? Cookie.get('token') : ""
    },
    getters: {},
    mutations: {
        setAccount(state, payload) {
            state.account = payload
        },
        setToken(state, payload) {
            state.token = payload
        }
    },
    actions: {
        async register({ commit }, payload) {
            try {
                console.log(payload.username)
                const res = await api.post('http://localhost:3000/api/v1/auth/register/', payload);
                if (res.data.status == 'ok') { 
                    Cookie.set('account', JSON.stringify(res.data.user))
                    Cookie.set('token', res.data.token);
                }
                return res.data
            } catch (err) {
                console.log(err);
            }
        },
        async login({ commit }, payload) {
            try {
                const res = await api.post('http://localhost:3000/api/v1/auth/login/', payload);
                if (res.data.status == 'ok') { 
                    Cookie.set('account', JSON.stringify(res.data.user))
                    Cookie.set('token', res.data.token);
                }
                return res.data;
            } catch (err) {
                console.log(err);
            }
        },

        async adminlogin({ commit }, payload) {
            try {
                const res = await api.post('http://localhost:3000/api/v1/auth/admin/', payload);
                if (res.data.status == 'ok') { 
                    Cookie.set('account', JSON.stringify(res.data.user))
                    Cookie.set('token', res.data.token);
                }
                return res.data;
            } catch (err) {
                console.log(err);
            }
        },
        async adduser({ commit }, payload) {
            try {
                const res = await api.post('http://localhost:3000/api/v1/auth/register/', payload);
                return res.data
            } catch (err) {
                console.log(err);
            }
        },
        
    }
};

export default authModule;