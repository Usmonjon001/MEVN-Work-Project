<template>
    <div class="flex flex-col justify-center items-center min-h-screen">

        <form class="border border-white w-[70%] p-5" @submit.prevent="submit">
            <h1 class="mb-5">Admin:</h1>
            <div class="relative z-0 w-full mb-6 group">
                <input
                v-model="user.username"
                type="text" name="floating_email" id="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Login Name:</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input
                v-model="user.password"
                type="password" name="floating_password" id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" " required />
                <label for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

    </div>


</template>

<script setup>

import { useRouter } from 'vue-router'
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

const router = useRouter()
const store = useStore();
const isActive = ref(false)
const network_message_status = ref(false)
const network_message = ref('');
const input_default = ref(false);


const user = reactive({
    username: "",
    password: ""
});

console.log(user);

const submit = async (e) => {
    if (!user.username || !user.password) {
        isActive.value = true
        alert('Hatolik yuz berdi!')
    } else {
        isActive.value = false
        input_default.value = true
        let res = await store.dispatch("auth/adminlogin", user);
        if (res.status == 'ok') {
            network_message_status.value = false;
            network_message.value = res.msg;
            store.commit('setToast', { show: true, msg: res.msg, type: res.status })
            router.push({ path: "/admin" });
            input_default.value = false;
        } else {
            store.commit('setToast', { show: true, msg: res.msg, type: res.status })
            network_message_status.value = true;
            network_message.value = res.msg;
            input_default.value = false;
        }
    }
}

// console.log(store.state.auth);

</script>

<style>

</style>