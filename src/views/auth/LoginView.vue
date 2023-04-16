<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();

const router = useRouter();

const toast = useToast();

const form = ref({
  email: 'test@example.com',
  password: 'password123'
})

const errors = ref({});

const login = async () => {
  errors.value = {}
  try {
    const res = await axios.post('/login', form.value);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
    await authStore.me();
    toast.add({severity: 'success', summary: 'Success Message', detail: 'ログインしました。', life: 3000});
    return router.push('/post');
  }catch(e) {
    if(e.response.status === 401 || e.response.status === 400) {
      errors.value['message'] = 'メールアドレスまたはパスワードに誤りがあります。'
    }
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="login" class="m-auto my-4 surface-card p-6 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">ログイン</div>
            <span class="text-600 font-medium line-height-3">アカウントをお持ちではありませんか？</span>
            <router-link to="/register" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">新規登録</router-link>
        </div>
        <div>
          <p v-if="errors.message" class="text-red-500">{{ errors.message }}</p>
        </div>
        <div>
            <div class="mb-5">
              <label for="email" class="block text-900 font-medium mb-2">メールアドレス<span class="text-red-400">*</span></label>
              <InputText id="email" type="text" v-model="form.email" placeholder="Email address" class="w-full" />
            </div>
            
            <div class="mb-5">
              <label for="password" class="block text-900 font-medium mb-2">パスワード<span class="text-red-400">*</span></label>
              <InputText id="password" type="password" v-model="form.password" placeholder="Password" class="w-full" />
            </div>
            
            <Button label="ログイン" type="submit" icon="pi pi-user" class="w-full"></Button>
        </div>
    </form>
  </div>
</template>