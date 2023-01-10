<template>
    <div></div>
    <!-- <div class="t-container  text-white p-5 rounded" :class="
        [
            type == 'ok' ? 'bg-green-400' : 'bg-red-400'
        ]
    ">
        <span class="material-symbols-outlined inline-block mr-3">
            {{ type == 'ok' ? 'done' : 'warning'}}
        </span>
        <span>{{ msg}}</span>
    </div> -->
</template>

<script setup>

import { useStore } from "vuex";
import { useToast } from "vue-toastification";

const store = useStore();


const toast = useToast();

//   // Use it!
//   toast("I'm a toast!");

//   // or with options
//   toast.success("My toast content", {
//     timeout: 2000
//   });

//   toast.info("I'm an info toast!");

const { msg } = store.state.toast;

const { type } = store.state.toast;
console.log(type);
if (type == "bad") {
    toast.error(msg, {
        timeout: 8000
    });
} else if (type == "ok") {
    toast.success(msg, {
        timeout: 8000
    });
}

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

.t-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    animation: toastAlert 2s ease;
    animation-fill-mode: forwards;
}

@keyframes toastAlert {
    0% {
        bottom: 20px;
        left: 10px;
    }

    100% {
        bottom: 20px;
        left: 50px;
    }
}
</style>