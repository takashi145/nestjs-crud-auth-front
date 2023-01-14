<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirm: ''
});

const errors = ref([]);

const register = async () => {
  try {
    await axios.post('/signup', form.value);
    errors.value = [];
    return router.push('/login');
  }catch(e) {
    errors.value = e.response.data.message
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="register" class="m-auto mt-8 surface-card p-6 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Sign Up</div>
            <span class="text-600 font-medium line-height-3">すでにアカウントをお持ちですか？</span>
            <router-link to="/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">ログイン</router-link>
        </div>

        <div class="mb-3">
          <ul v-if="Array.isArray(errors)" class="mb-3">
            <li v-for="error in errors" :key="error" class="text-red-500">{{ error }}</li>
          </ul>
          <div v-else class="text-red-500">{{ errors }}</div>
        </div>
        <div>
            <label for="name" class="block text-900 font-medium mb-2">Name</label>
            <InputText id="name" type="text" v-model="form.name" placeholder="User name" class="w-full mb-5" />

            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" v-model="form.email" placeholder="Email address" class="w-full mb-5" />

            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" type="password" v-model="form.password" placeholder="Password" class="w-full mb-5" />

            <label for="password_confirm" class="block text-900 font-medium mb-2">Password Confirm</label>
            <InputText id="password_confirm" type="password" v-model="form.password_confirm" placeholder="Password Confirm" class="w-full mb-5" />

            <Button label="Sign Up" type="submit" icon="pi pi-user" class="w-full"></Button>
        </div>
    </form>
  </div>
</template>