<template>
    <div class="modal">
        <button class="closebtn" @click="closeModel(false)">
            <span class="material-symbols-outlined">
                close
            </span>
        </button>
        <div class="model-content">
            <h1>Add User: </h1>
            <label for="fullname">To'liq Ism:</label>
            <input type="text" id="fullname" v-model="user.fullname" required>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="user.username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user.password" required>
            <label for="gender">Jins:</label>
            <select name="" id="gender" v-model="user.gender">
                <option value="erkak">Erkak</option>
                <option value="ayol">Ayol</option>
            </select>
            <button @click="addUser">Qo'shish</button>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const showModal = ref(true)

const emit = defineEmits(['closeModel'])

const closeModel = (state) => {
    emit('closeModel', state)
}

const user = ref({
    fullname: '',
    username: '',
    password: '',
    gender: 'erkak'
})

const addUser = async () => {
    if (!user.value.username || !user.value.password) {
        alert('Hatolik yuz berdi!')
    } else {
        let res = await store.dispatch("auth/adduser", user.value);
        if (res.status == 'ok') {
            store.commit('setToast', { show: true, msg: res.msg, type: res.status })
            closeModel(false)
            window.location.reload()
        } else {
            store.commit('setToast', { show: true, msg: res.msg, type: res.status })
        }
    }
}
</script>

<style scoped>
.modal {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.783);
    top: 0;
    right: 0;

}

.model-content {
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 600px;
    border: 1px solid white;
    padding: 50px;
    z-index: 19;
    background-color: blue;
}

.model-content h1 {
    font-size: 28px;
    margin-bottom: 25px;
}

.model-content input {
    width: 100%;
    padding: 5px 10px;
    color: black;
    margin-bottom: 25px;
}

.model-content label {
    margin-bottom: 5px;
}

select {
    color: black;
    padding: 5px 10px;
    margin-bottom: 25px;
}

.model-content button {
    padding: 10px 35px;
    background-color: green;
    border-radius: 5px;
}


.closebtn {
    padding: 15px;
    background-color: red;
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 10px;
}
</style>