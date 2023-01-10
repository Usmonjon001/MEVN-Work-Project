<script setup>
import TheLoading from './components/TheLoading.vue';
import TheToast from './components/TheToast.vue';
import { computed } from "vue";
import { useStore } from 'vuex';

const store = useStore();

const toastshow = computed(() => store.state.toast.show)

</script>

<template>
  <div class="parent bg-slate-900 text-white min-h-screen">
    <TheToast v-if="toastshow"/>
    <!-- <TheLoading/> -->
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  
}
</style>
