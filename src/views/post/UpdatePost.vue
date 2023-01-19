<script setup>
import axios from "axios"
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Textarea from 'primevue/textarea';


onMounted(async () => {
  await getPost();
})

const route = useRoute();

const router = useRouter();

const toast = useToast();

const form = ref({
  title: '',
  description: ''
});

const errors = ref({});

const getPost = async () => {
  await axios.get(`/post/${route.params.id}`)
  .then(res => {
    form.value.title = res.data.title;
    form.value.description = res.data.description;
  });
}

const update = async () => {
  try {
    await axios.patch(`/post/${route.params.id}`, form.value);
    toast.add({severity: 'success', summary: 'Success Message', detail: '更新しました。', life: 3000});

    return router.push('/post');
  }catch(e) {
    const error = e.response.data.message;
    error.forEach(err => {
      for(let key in err.constraints) {
        errors.value[err.property].push(err.constraints[key]);
      }
    });
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="update" class="mx-auto mt-8 surface-card p-8 shadow-2 border-round w-full lg:w-6">
      <router-link to="/post">一覧へ戻る</router-link>  
      <div class="text-center my-5">
            <div class="text-900 text-3xl font-medium mb-3">編集画面</div>
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
            <Button type="submit" label="更新" icon="pi pi-pencil" class="mt-3 w-full"></Button>
        </div>
    </form>
  </div>
</template>
