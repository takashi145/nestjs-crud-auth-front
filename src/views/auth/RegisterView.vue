<script setup>
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const toast = useToast();

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirm: ''
});

const errors = ref({});

const register = async () => {
  errors.value = {};

  try {
    await axios.post('/signup', form.value);
    toast.add({severity: 'success', summary: 'Success Message', detail: '登録に成功しました。', life: 3000});
    return router.push('/login');
  }catch(e) {
    const error = e.response.data.message;
    error.forEach(err => {
      for(let key in err.constraints) {
        if(!errors.value[err.constraints]) {
          errors.value[err.property] = [];
        }
        errors.value[err.property].push(err.constraints[key]);
      }
    });
  }
}

</script>
<template>
  <div>
    <form @submit.prevent="register" class="m-auto my-8 surface-card p-6 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">新規登録</div>
            <span class="text-600 font-medium line-height-3">すでにアカウントをお持ちですか？</span>
            <router-link to="/login" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">ログイン</router-link>
        </div>
        <div>
            <div class="mb-5">
              <label for="name" class="block text-900 font-medium mb-2">ユーザ名<span class="text-red-400">*</span></label>
                <InputText id="name" type="text" v-model="form.name" placeholder="User name" class="w-full" />
                <ul v-if="errors.name" class="">
                  <li v-for="error in errors.name" :key="error" class="text-red-500">{{ error }}</li>
                </ul>
            </div>
           
            <div class="mb-5">
              <label for="email" class="block text-900 font-medium mb-2">メールアドレス<span class="text-red-400">*</span></label>
              <InputText id="email" type="text" v-model="form.email" placeholder="Email address" class="w-full" />
              <ul v-if="errors.email" class="">
                <li v-for="error in errors.email" :key="error" class="text-red-500">{{ error }}</li>
              </ul>  
            </div>
            
            <div class="mb-5">
              <label for="password" class="block text-900 font-medium mb-2">パスワード<span class="text-red-400">*</span></label>
              <InputText id="password" type="password" v-model="form.password" placeholder="Password" class="w-full" />
              <ul v-if="errors.password" class="">
                <li v-for="error in errors.password" :key="error" class="text-red-500">{{ error }}</li>
              </ul> 
            </div>
            
            <div class="mb-6">
              <label for="password_confirm" class="block text-900 font-medium mb-2">確認用パスワード<span class="text-red-400">*</span></label>
              <InputText id="password_confirm" type="password" v-model="form.password_confirm" placeholder="Password Confirm" class="w-full" />
              <ul v-if="errors.password_confirm" class="">
                <li v-for="error in errors.password_confirm" :key="error" class="text-red-500">{{ error }}</li>
              </ul>  
            </div>
           

            <Button label="新規登録" type="submit" icon="pi pi-user" class="w-full"></Button>
        </div>
    </form>
  </div>
</template>