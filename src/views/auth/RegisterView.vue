<script setup>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const toast = useToast();

const form = ref({
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const errors = ref([]);

const register = async () => {
  errors.value = {};

  try {
    await axios.post('/register', form.value);
    toast.add({severity: 'success', summary: 'Success Message', detail: '登録に成功しました。', life: 3000});
    return router.push('/login');
  }catch(e) {
    if(e.response.status === 400) {
      errors.value = e.response.data.message
    }
    alert('予期せぬ問題が発生しました。')
  }
}

</script>
<template>
  <div>
    <form @submit.prevent="register" class="m-auto my-4 surface-card p-6 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-3">
            <div class="text-900 text-3xl font-medium">新規登録</div>
            <span class="text-600 font-medium line-height-3">すでにアカウントをお持ちですか？</span>
            <router-link to="/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">ログイン</router-link>
        </div>
        <ul v-if="errors" class="">
          <li v-for="error in errors" :key="error" class="text-red-500">{{ error }}</li>
        </ul>
        <div>
            <div class="mb-3">
              <label for="name" class="block text-900 font-medium mb-2">ユーザ名<span class="text-red-400">*</span></label>
              <InputText id="username" type="text" v-model="form.username" placeholder="User name" class="w-full" />
            </div>
           
            <div class="mb-3">
              <label for="email" class="block text-900 font-medium mb-2">メールアドレス<span class="text-red-400">*</span></label>
              <InputText id="email" type="text" v-model="form.email" placeholder="Email address" class="w-full" />
            </div>
            
            <div class="mb-3">
              <label for="password" class="block text-900 font-medium mb-2">パスワード<span class="text-red-400">*</span></label>
              <InputText id="password" type="password" v-model="form.password" placeholder="Password" class="w-full" />
            </div>
            
            <div class="mb-3">
              <label for="password_confirm" class="block text-900 font-medium mb-2">確認用パスワード<span class="text-red-400">*</span></label>
              <InputText id="password_confirmation" type="password" v-model="form.password_confirmation" placeholder="Password Confirm" class="w-full" />
            </div>
           

            <Button label="新規登録" type="submit" icon="pi pi-user" class="w-full"></Button>
        </div>
    </form>
  </div>
</template>