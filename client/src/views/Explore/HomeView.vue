<template>
  <div class="container m-auto">
    <h1>Home View</h1>

    <h1 v-if="showProduct">Loading...</h1>

    <div class="products" v-else>
        <ProductCard :productdb="productdb"/>
    </div>
  </div>
</template>

<script setup>
  import axios from "axios"
import { ref } from "vue"
import ProductCard from "../../components/ProductCard.vue"

  let showProduct = ref(true)
  let productdb = ref([])

  const products = async () => {
    axios.get('http://localhost:3000/api/v1/products').then(result => {
      console.log(result.data);
      showProduct.value = false;
      productdb.value = result.data
    })
  }

  products()

</script>

<style>

</style>