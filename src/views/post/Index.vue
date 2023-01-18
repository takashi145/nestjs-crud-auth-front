<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Card from 'primevue/card';


onMounted(async () => {
  await getPost();
})

const posts = ref([]);

const getPost = async () => {
  await axios.get('/post')
  .then(res => {
    posts.value = res.data;
  })
}
</script>
<template>
  <div class="">
    <router-link to="/post/create" class="m-3">
      <Button>作成</Button>
    </router-link>
    <Card v-for="post in posts" :key="post.id" class="mx-auto my-5">
        <template #title>
            {{ post.title }}
        </template>
        <template #content>
            <router-link :to="`/post/${post.id}/edit`" class="mr-3">
              <Button>編集</Button>
            </router-link>

            <router-link to="/">
              <Button class="p-button-danger">編集</Button>
            </router-link>
        </template>
    </Card>
  </div>
</template>
