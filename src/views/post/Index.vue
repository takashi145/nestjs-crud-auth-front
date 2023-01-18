<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';


onMounted(async () => {
  await getPostList();
})

const posts = ref([]);

const post_id = ref(null);

const displayConfirmation = ref(false);

const openConfirmation = id => {
    displayConfirmation.value = true;
    post_id.value = id;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};

const getPostList = async () => {
  await axios.get('/post')
  .then(res => {
    posts.value = res.data;
  })
}

const deletePost = async () => {
  if(post_id.value) {
    await axios.delete(`/post/${post_id.value}`)
    await getPostList();
  }
  closeConfirmation();
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

            <Button label="削除" class="p-button-danger" @click="openConfirmation(post.id)" />
        </template>
    </Card>

    <Dialog header="Confirmation" v-model:visible="displayConfirmation" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '350px'}" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>本当に削除してもよろしいですか?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" @click="deletePost" class="p-button-text" autofocus />
        </template>
    </Dialog>
  </div>
</template>
