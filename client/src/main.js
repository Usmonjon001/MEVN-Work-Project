import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./style.css"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css";

createApp(App).use(store).use(Toast, {
    transition: "Vue-Toastification__bounce",
    position: "bottom-right",
    maxToasts: 20,
    newestOnTop: true
}).use(router).mount('#app');