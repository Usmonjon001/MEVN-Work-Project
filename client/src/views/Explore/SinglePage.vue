<template>
    
    <div class="container m-auto">
        <h1 v-if="showProduct">Loading...</h1>
        <div class="product" v-else>
            <img :src="product.photo" alt=""/>
            <div class="product-text">
                <h1>{{ product.title }}</h1>
                <p> {{ product.text }} </p>
                <button>Sotib Olish</button>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from "@vue/reactivity"
import axios from "axios";


let props = defineProps({
    id: String
})

const showProduct = ref(true);
const product = ref({});

const getSingle = () => {
    axios.get(`http://localhost:3000/api/v1/products/${props.id}`)
    .then((response) => {
        console.log(response.data);
        showProduct.value = false;
        product.value = response.data
    })
}

getSingle()

</script>

<style scoped>

.product{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

h1{
    font-size: 42px;
    margin-bottom: 25px;
}

p{
    font-size: 20px;
    margin-bottom: 25px;
}

button {
    width: 100%;
    background-color: green;
    padding: 15px;
    font-size: 18px;
}

.product img {
    width: 650px;
}

.product-text{
    width: 550px;
}

</style>