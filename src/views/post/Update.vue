<script setup>
import axios from "axios"
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";


onMounted(async () => {
  await getPost();
})

const route = useRoute();

const router = useRouter();

const form = ref({
  title: '',
});

const errors = ref({
  title: [],
});

const getPost = async () => {
  await axios.get(`/post/${route.params.id}`)
  .then(res => {
    form.value.title = res.data.title;
  });
}

const update = async () => {
  try {
    await axios.patch(`/post/${route.params.id}`, form.value);
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
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">編集画面</div>
        </div>

        <div>
            <label for="title" class="block text-900 font-medium mb-2">Title</label>
            <InputText id="title" v-model="form.title" type="text" class="w-full" />
            <ul v-if="errors.title" class="">
              <li v-for="error in errors.title" :key="error" class="text-red-500">{{ error }}</li>
            </ul>
            <Button type="submit" label="更新" icon="pi pi-pencil" class="mt-3 w-full"></Button>
        </div>
    </form>
  </div>
</template>
