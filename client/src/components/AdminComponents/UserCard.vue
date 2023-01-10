<template>
    <div class="users-wrapper-card" v-for="user in props.users.users" :key="user">
        <img class="object-cover w-full  h-96 md:h-auto md:w-48"
            :src="`https://avatars.dicebear.com/api/initials/${account.fullname}.svg`" alt="">
        <div class="users-wrapper-card-text">
            <h1>Fullname:</h1>
            <p>{{ user.fullname }}</p>
            <h1>Username:</h1>
            <p>{{ user.username }}</p>
            <button class="delete" @click="deleteUser(user)">O'chirish</button>
        </div>
    </div>
</template>

<script setup>
// Libruaries
import axios from "axios";
import { ref } from "vue"
import { useStore } from "vuex";
import Cookie from "js-cookie";
import { computed } from "@vue/reactivity";

const account = ref({
    fullname: "Usmonjon Tokhirjon"
})

const props = defineProps({
    users: Array
})

const store = useStore()
const token = Cookie.get("token")
const headers = {
    "Authorization": "Bearer " + token
}

console.log(headers);

const deleteUser = async (user) => {
    
    axios.delete(`http://localhost:3000/api/v1/account/${user._id}`, { headers }).then((res) => {
        store.commit('setToast', { show: true, msg: res.data.msg, type: res.data.status })
        props.users.users = props.users.users.filter(el => el._id !== user._id)
    })

    
}

console.log(deleteUser);

</script>

<style>

.users-wrapper-card{
    width: 300px;
    border: 1px solid rgb(13, 13, 167);
    border-radius: 5px;
    background-color: rgb(12 12 84);
    margin-bottom: 25px;
}

.users-wrapper-card img {
    width: 100%;
    border-radius: 5px 5px 0px 0px;
}

.users-wrapper-card-text{
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.users-wrapper-card-text h1{
    font-size: 26px;
}

.edit{
    padding: 10px;
    background-color: rgb(29, 224, 29);
    color: white;
    font-weight: bold;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid transparent;
}

.edit:hover{
    border: 1px solid green;
    background-color: transparent;
    color: green;
}


.delete{
    padding: 10px;
    background-color: rgb(224, 29, 29);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    border: 1px solid transparent;
}

.delete:hover{
    border: 1px solid rgb(224, 29, 29);
    background-color: transparent;
    color: rgb(224, 29, 29);
}


</style>