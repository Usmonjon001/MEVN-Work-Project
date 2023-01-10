<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <form class="w-[550px] border border-sky-500 p-8 rounded" @submit.prevent="submit">
            <h1 class="text-sky-500 text-3xl mb-8">Register:</h1>
            <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-2xl font-medium text-white">
                    Username:
                </span>
                <input type="text" name="username"
                    class="text-slate-900 mt-3 px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-2"
                    placeholder="username" v-model.trim="user.username"
                    :class="[input_default ? 'bg-gray-300' : 'bg-white', { 'text-red-700 border-[3px] border-red-500': isActive }]"
                    :disabled="input_default"
                    />
                <p v-if="isActive" class="text-red-500">
                    Iltimos ush bu maydonni to'ldiring!
                </p>
            </label>

            <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-2xl font-medium text-white mt-8">
                    Password:
                </span>
                <input type="password" name="username"
                    class="text-slate-900 mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-2"
                    placeholder="password" v-model.trim="user.password" 
                    :class="[input_default ? 'bg-gray-300' : 'bg-white', { 'text-red-700 border-[3px] border-red-500': isActive }]"
                    :disabled="input_default"
                    />
                <p v-if="isActive" class="text-red-500">
                    Iltimos ush bu maydonni to'ldiring!
                </p>
            </label>

            <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-2xl font-medium text-white mt-8">
                    To'liq Ism:
                </span>
                <input type="text" name="username"
                    class="text-slate-900 mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-2"
                    placeholder="To'liq Ism" v-model.trim="user.fullname"
                    :class="[input_default ? 'bg-gray-300' : 'bg-white', { 'text-red-700 border-[3px] border-red-500': isActive }]"
                    :disabled="input_default"
                    />
                <p v-if="isActive" class="text-red-500">
                    Iltimos ush bu maydonni to'ldiring!
                </p>
            </label>

            <label class="block">
                <span class="after:ml-0.5 after:text-red-500 block text-2xl font-medium text-white text mt-8">
                    Jinsni Tanlang!
                </span>
                <select name="" id="" class="w-[100%] p-2 rounded mt-4 text-blue-500 " v-model="user.gender">
                    <option value="jins" selected>Jinsni tanglang!</option>
                    <option value="erkak">Erkar</option>
                    <option value="ayol">Ayol</option>
                </select>
                <p v-if="isActive" class="text-red-500">
                    Iltimos ush bu maydonni to'ldiring!
                </p>
            </label>

            

            <p v-if="network_message_status" class="text-red-500 mt-5"> {{ network_message }} </p>

            <button
            class="hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white mt-8 w-[100%]"
            :disabled="input_default" :class="[
                input_default ? 'bg-gray-500 hover:bg-gray-700' : 'bg-sky-500 hover:bg-sky-700'
            ]"
            >Qo'shish</button>
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
    password: "",
    fullname: "",
    gender: "jins",
});

const submit = async () => {

    console.log(user);

    if (!user.username || !user.password) {
        isActive.value = true
        alert('Hatolik yuz berdi!')
    } else {
        isActive.value = false
        input_default.value = true
        let res = await store.dispatch("auth/register", user);
        if(res.status == 'ok'){
            network_message_status.value = false;
            network_message.value = res.msg;
            store.commit('setToast', { show: true, msg: res.msg, type: res.status})
            router.push({ path: "/explore" });
            input_default.value = false;
        } else {
            store.commit('setToast', { show: true, msg: res.msg, type: res.status})
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