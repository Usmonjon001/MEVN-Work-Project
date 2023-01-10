<template>
  <div class="container mx-auto account-page min-h-screen widht-[100%] flex justify-center items-center ">

    <div
      class="flex flex-col w-[600px] items-start bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl  dark:border-gray-700 dark:bg-gray-800 ">
      <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        :src="`https://avatars.dicebear.com/api/initials/${account.fullname}.svg`" alt="">
      <div class="flex flex-col justify-between p-4 leading-normal w-[100%]">
        <div>
          <label for="first_name" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">To'liq
            Ism:</label>
          <input type="text" id="first_name"
            class="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="account.fullname" placeholder="Fullname" required>
        </div>
        <div class="mt-3">
          <label for="username"
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Username:</label>
          <input type="text" id="username"
            class="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="account.username" placeholder="John" required>
        </div>
        <div class="mt-3">
          <label for="age" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Yosh:</label>
          <input type="number" id="age" min="7" max="100"
            class="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="account.age" placeholder="Yosh" required>
        </div>

        <div class="mt-3">
          <label for="city"
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Shaharingiz:</label>
          <input type="text" id="city"
            class="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="account.city" placeholder="City" required>
        </div>

        <div class="mt-3">
          <label for="countries" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Jinsni Tanlang!</label>
          <select id="countries" v-model="account.gender"
            class="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="erkak" :selected="account.gender == 'erkak'">Erkak</option>
            <option value="ayol"  :selected="account.gender == 'ayol'">Ayol</option>
          </select>
        </div>

        <div class="flex justify-between items-center mt-3">
          <button @click="saveProfilChanges"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Saqlash
          </button>
          <div class="w-[55%] flex justify-between items-center">
            <button @click="logout"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Chiqish
            </button>
            <button @click="deleteAccount"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              O'chirish
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { reactive } from 'vue';
import Cookies from 'js-cookie';
import { useStore } from "vuex";
import api from "../../helpers/api";
import { useRouter } from 'vue-router'
const store = useStore();

const router = useRouter()

const account = reactive(JSON.parse(Cookies.get('account')))

console.log(account);

const headers = {
    "Authorization": `Bearer ${Cookies.get('token')}`
}


const saveProfilChanges = async() => {
  const useraccount = reactive({
    fullname: account.fullname,
    username: account.username,
    age: account.age,
    gender: account.gender,
    city: account.city,
  })
  console.log(useraccount);
  store.commit("setLoading", true, { root: true });
  try {
    
    const res = await api.put(`http://localhost:3000/api/v1/account/${account._id}`, account, {headers}); 
    console.log(res);
    Cookies.remove(`account`)
    Cookies.set(`account`, JSON.stringify(res.data.user))
    store.commit('setToast', { show: true, msg: res.data.msg, type: res.data.status})
  } catch (e) {
    console.log(e);
  }
}

const logout = () => {
  Cookies.remove('account');
  Cookies.remove('token');
  router.push('/login')
  store.commit('setToast', { show: true, msg: "Tizimdan Muavfaqqiyatli Chiqdingiz!", type: "bad"})
}


const deleteAccount = async () =>{
  console.log('O\'chirish')
  try {
    console.log(account._id, "<================================================================ User ID");
    const res = await api.delete(`http://localhost:3000/api/v1/account/${account._id}`, {headers}); 
    console.log(res);
    store.commit('setToast', { show: true, msg: res.data.msg, type: res.data.status})
    if(res.data.status == 'ok'){
        Cookies.remove('account');
        Cookies.remove('token');
        router.push('/login')
    }
  } catch (e) {
    console.log(e);
  }
}

</script>

<style>

</style>