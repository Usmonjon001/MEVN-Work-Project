<template>
    <div>
        <AdminAddUser v-if="showModal" @close-model="closeModel" />
        <div class="container mx-auto">
            <h1 class="font-22">Users:</h1>
            <button class="adduser" @click="bringModel">Yangi Akkount Qo'shish</button>
            <h1 v-if="isLoading">Loading...</h1>
            <div class="users-wrapper" v-else>
                <UserCard :users="usersdata"/>
            </div>
        </div>
    </div>
</template>

<script setup>
// Libruaries
import axios from "axios";
import { ref } from "vue";
import Cookie from 'js-cookie';
import { useStore } from "vuex";

// Components
import UserCard from "../../../components/AdminComponents/UserCard.vue"
import AdminAddUser from "../../../components/AdminComponents/AdminAddUser.vue"

// Connect Data
const token = Cookie.get("token")
const headers = {
    "Authorization": "Bearer " + token
}

const isLoading = ref(true)

const store = useStore()
const usersdata = ref([])

const users = axios.get()
const connectToDB = async () => {
    return axios.get('http://localhost:3000/api/v1/account/users', { headers }).then((res) => {
        usersdata.value = res.data
        store.commit('setToast', { show: true, msg: res.data.msg, type: res.data.status })
        isLoading.value = false
    })
}

connectToDB()

console.log(connectToDB());

const account = ref({
    fullname: "Usmonjon Tokhirjon"
})

const showModal = ref(false)

const bringModel = () => {
    showModal.value = !showModal.value
}

const closeModel = (state) => {
    showModal.value = state
}

</script>

<style>

.users-wrapper {
    display: flex;
    justify-content: space-between;
    align-self: start;
    flex-wrap: wrap;
}


.users-wrapper-card {
    width: 300px;
    border: 1px solid rgb(13, 13, 167);
    border-radius: 5px;
    background-color: rgb(12 12 84);
}

.users-wrapper-card img {
    width: 100%;
    border-radius: 5px 5px 0px 0px;
}

.users-wrapper-card-text {
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.users-wrapper-card-text h1 {
    font-size: 26px;
}

.edit {
    padding: 10px;
    background-color: rgb(29, 224, 29);
    color: white;
    font-weight: bold;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid transparent;
}

.edit:hover {
    border: 1px solid green;
    background-color: transparent;
    color: green;
}


.delete {
    padding: 10px;
    background-color: rgb(224, 29, 29);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    border: 1px solid transparent;
}

.delete:hover {
    border: 1px solid rgb(224, 29, 29);
    background-color: transparent;
    color: rgb(224, 29, 29);
}

.adduser {
    display: block;
    padding: 10px;
    background-color: green;
    color: white;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 25px;
    border: 1px solid transparent;
}
</style>