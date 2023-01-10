<template>
  <div class="flex min-h-screen flex-col justify-center items-center">
    <div class="landing text-center border-2 p-[40px] rounded border-orange-400 w-[700px] shadow-2xl shadow-orange-700/80">
      <h1 class="landing-title text-sky-400 font-bold text-4xl mb-[30px]">Kitob Do'konimizga Hush kelibsiz...</h1>
      <p class="landing-desc mb-[30px]">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, eligendi atque? Sequi quas at sunt assumenda suscipit amet dolor sed laboriosam, pariatur et, facilis recusandae porro illum deserunt expedita quaerat?
      </p>
      <div class="landing-links flex justify-evenly mb-3">
        <router-link to="/register" class="inline-block bg-green-500 hover:bg-transparent hover:text-green-500 active:bg-blue-700 font-bold focus:outline-none focus:ring focus:ring-violet-300 p-3 border-4 border-green-500/100 rounded w-[200px] transition-all "> Registratsiya </router-link>
        <router-link to="/login" class="inline-block bg-blue-400 hover:bg-transparent hover:text-blue-400 active:bg-red-700 font-bold focus:outline-none focus:ring focus:ring-violet-300 p-3 border-4 border-blue-400/100 rounded w-[200px]" > Kirish </router-link>
      </div>
      <router-link to="/adminlogin" class="inline-block bg-blue-400 hover:bg-transparent hover:text-blue-400 active:bg-red-700 font-bold focus:outline-none focus:ring focus:ring-violet-300 p-3 border-4 border-blue-400/100 rounded w-[200px]" > Admin Sifatida Kirish </router-link>
    </div>
  </div>
</template>

<script setup>

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

console.log(store.state.auth);

</script>

<!-- <script>
export default {
    data(){
      return {}
    },
    computed: {
      count(){
        return this.$store.state.count
      }
    },
    methods: {
      setCount(){
        this.$store.commit("setCount", 5)
      }
    }
}
</script> -->

<style>

</style>