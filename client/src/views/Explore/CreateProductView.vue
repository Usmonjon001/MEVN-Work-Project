<template>
  <div class="container m-auto">
    <div class="form">
      <h1>Maxsulot Yaratish</h1>
      <label for="product_file">Rasmni Tanlang</label>
      <input type="file" @change="upload_img" name="" ref="file" id="product_file">

      <label for="product_name">Maxsulot Nomi:</label>
      <input type="text" name="" id="product_name" v-model="new_product.title">

      <label for="product_name">Maxsulot Haqida:</label>
      <textarea type="text" name="" id="product_name" v-model="new_product.text">
        </textarea>

      <button @click="addProduct">Qo'shish</button>

    </div>
  </div>
</template>

<script setup>

import { ref } from "vue";
import Cookie from 'js-cookie';
import axios from "axios";
import { useStore } from "vuex"
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

let new_product = ref({
  title: "",
  text: "",
  created_by: Cookie.get('token')
});


let formData = new FormData();

const file = ref(null)

const upload_img = (e) => {
  formData.set('photo', file.value.files[0]);
}

const config = {
  headers: {
    "Authorization": "Berear " + Cookie.get('token')
  }
}

console.log(Cookie.get('token'));


const addProduct = () => {
  console.log(new_product.value);

  for(let key in new_product.value){
    console.log(key, new_product.value[key]);
    formData.append(key, new_product.value[key]);
  }

  console.log(formData.values);

  axios.post('http://localhost:3000/api/v1/products/', formData, config)
    .then((res) => {
      console.log(res.data);
      store.commit('setToast', { show: true, msg: res.data.msg, type: res.data.status });
      router.push('/explore')
    })
}



</script>

<style scoped>
h1 {
  font-size: 32px;
  margin-bottom: 25px;
}

label {
  margin-bottom: 15px;
}

input,
textarea {
  margin-bottom: 20px;
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
}


button {
  width: 100%;
  padding: 20px;
  background-color: green;
}
</style>