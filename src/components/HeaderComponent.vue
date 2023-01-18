<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();


const logout = async () => {
    try {
        await axios.post('/logout');
        axios.defaults.headers.common['Authorization'] = '';
        return router.push('/login');
    }catch(e) {
        console.log(e)
    }
}
</script>
<template>
  <div class="mb-1 shadow-2 surface-section w-full py-4 px-3">
      <div class="flex align-items-start flex-column lg:justify-content-between lg:flex-row w-full">
          <div>
              <div class="font-medium text-3xl text-900">Nestjs Vue</div>
          </div>
          <div class="mt-3 lg:mt-0">
              <Button @click="logout" label="Logout" icon=""></Button>
          </div>
      </div>
  </div>

</template>