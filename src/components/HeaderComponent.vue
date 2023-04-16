<script setup>
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Avatar from 'primevue/avatar';
import { useToast } from 'primevue/usetoast';

const router = useRouter();

const authStore = useAuthStore();

const authUser = computed(() => authStore.user);

const toast = useToast();

const logout = async () => {
    try {
        await axios.post('/logout');
        axios.defaults.headers.common['Authorization'] = '';
        authStore.authUser = null;
        toast.add({severity: 'warn', summary: 'Warn Message', detail: 'ログアウトしました。', life: 3000});
        return router.push('/login');
    }catch(e) {
        console.log(e)
    }
}
</script>
<template>
  <div class="mb-1 shadow-2 w-full py-4 px-3 bg-gray-200">
      <div class="flex align-items-start justify-content-between lg:flex-row w-full">
        <div class="font-medium text-3xl text-900">Nestjs Vue Crud</div>
        <div v-if="authUser" class="flex align-items-center lg:mt-0">
          <div class="mr-5">
              <Avatar icon="pi pi-user" />
              {{ authUser.name }}
          </div>
          <Button @click="logout" label="ログアウト" class="bg-gray-500"></Button>
        </div>
        <div v-else>
          <router-link to="/login" class="mr-3">ログイン</router-link>
          <router-link to="/register">新規登録</router-link>
        </div>
      </div>
  </div>

</template>