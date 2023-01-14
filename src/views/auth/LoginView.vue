<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const form = ref({
  email: 'test@test.com',
  password: 'password123'
})

const errors = ref([]);

const login = async () => {
  try {
    const res = await axios.post('/login', form.value);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
    errors.value = [];
    return router.push('/');
  }catch(e) {
    errors.value = e.response.data.message
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="login" class="m-auto mt-8 surface-card p-6 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Sign In</div>
            <span class="text-600 font-medium line-height-3">アカウントをお持ちではありませんか？</span>
            <router-link to="/register" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">新規登録</router-link>
        </div>

        <div>
          <ul class="mb-3">
            <li v-for="error in errors" :key="error" class="text-red-500">{{ error }}</li>
          </ul>
        </div>
        <div>
            <label for="email" class="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" v-model="form.email" placeholder="Email address" class="w-full mb-5" />

            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" type="password" v-model="form.password" placeholder="Password" class="w-full mb-5" />

            <Button label="Sign In" type="submit" icon="pi pi-user" class="w-full"></Button>
        </div>
    </form>
  </div>
</template>