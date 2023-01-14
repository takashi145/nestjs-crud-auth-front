<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const user = ref({})

onMounted(() => {
  getUser();
})

const getUser = async () => {
  try {
    const res = await axios.get('/user');
    user.value = res.data;
  }catch(e) {
    console.log(e);
  }
}
</script>

<template>
  <div class="home">
    <ul>
      <li>{{ user.id }}</li>
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
    </ul>
  </div>
</template>
