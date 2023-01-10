<template>
    <div class="cardwrapper">
        <div class="card" v-for="product in props.productdb" :key="product">
            <img :src="product.photo" alt="">
            <div class="card-text">
                <h1>{{ product.title }}</h1>
                <p>{{ product.text }}</p>
                <button @click="redirectToSingle(product._id)">Ko'proq Bilish</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

let props = defineProps({
    productdb: Array
})

const redirectToSingle = (id) => {
    router.push(`explore/singlepage/${id}`)
}

for(let element of props.productdb) {
    if(element.title.length > 20){
        element.title = element.title.slice(0, 20) + '...'
    }
    element.text = element.text.slice(0, 120) + "..."
}


</script>

<style scoped>

.cardwrapper{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
}
.card {
    max-width: 350px;
    border: 1px solid blue;
    border-radius: 5px;
    box-shadow: 1px 3px 5px blue;
}

.card-text {
    padding: 15px;
}

.card img {
    border-radius: 5px 5px 0px 0px;
    margin-bottom: 15px;
    object-fit: cover;
    width: 100%;
    height: 300px;
}

h1 {
    font-size: 32px;
    margin-bottom: 20px;
}

p {
    margin-bottom: 20px;
}

.card-text button {
    width: 100%;
    padding: 10px;
    border: 1px solid green;
    color: green;
    font-weight: bold;
}

.card-text button:hover {
    background-color: green;
    color: #fff;
}
</style>