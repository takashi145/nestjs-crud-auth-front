<script setup>
import axios from "axios"
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Textarea from 'primevue/textarea';


const router = useRouter();

const toast = useToast();

const form = ref({
  title: '',
  description: ''
});

const errors = ref({});

const create = async () => {
  try {
    await axios.post('/post', form.value);
    toast.add({severity: 'success', summary: 'Success Message', detail: '追加しました。', life: 3000});
    return router.push('/post');
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
    <form @submit.prevent="create" class="mx-auto mt-8 surface-card p-8 shadow-2 border-round w-full lg:w-6">
        <router-link to="/post">一覧へ戻る</router-link>
        <div class="text-center my-5">
            <div class="text-900 text-3xl font-medium mb-3">作成画面</div>
        </div>

        <div>
            <div class="mb-3">
              <label for="title" class="block text-900 font-medium mb-2">Title</label>
                <InputText id="title" v-model="form.title" type="text" class="w-full" placeholder="タイトルを40文字以内で入力してください。" />
                <ul v-if="errors.title" class="">
                  <li v-for="error in errors.title" :key="error" class="text-red-500">{{ error }}</li>
                </ul>
            </div>
            <div>
              <label for="description" class="block text-900 font-medium mb-2">Description</label>
                <Textarea id="description" v-model="form.description" :autoResize="true" class="w-full" placeholder="詳細を100文字以内で入力してください。" />
                <ul v-if="errors.description" class="">
                  <li v-for="error in errors.description" :key="error" class="text-red-500">{{ error }}</li>
                </ul>
            </div>
            
            <Button type="submit" label="作成" icon="pi pi-pencil" class="mt-3 w-full"></Button>
        </div>
    </form>
  </div>
</template>
