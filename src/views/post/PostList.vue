<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import Dialog from 'primevue/dialog';
import Skeleton from 'primevue/skeleton';
import { useToast } from "primevue/usetoast";
import Fieldset from 'primevue/fieldset';


onMounted(async () => {
  await getPostList();
})

const toast = useToast();

const posts = ref([]);

const post_id = ref(null);

const loading = ref(false);

const displayConfirmation = ref(false);

const openConfirmation = id => {
    displayConfirmation.value = true;
    post_id.value = id;
};

const closeConfirmation = () => {
    displayConfirmation.value = false;
};

const getPostList = async () => {
  loading.value = true;
  await axios.get('/posts')
  .then(res => {
    posts.value = res.data;
    loading.value = false;
  })
}

const deletePost = async () => {
  if(post_id.value) {
    await axios.delete(`/posts/${post_id.value}`)
    toast.add({severity: 'error', summary: 'Warn Message', detail: '削除しました。', life: 3000});
    await getPostList();
  }
  closeConfirmation();
}
</script>
<template>
  <div class="mx-auto lg:w-6 px-3">

    <div class="text-right m-5">
      <router-link to="/post/create" class="" style="text-decoration: none;">
        <Button class="p-button-outlined p-button-rounded px-5 py-4 text-lg shadow-3 bg-primary">作成</Button>
      </router-link>  
    </div>

    <div v-if="loading" class="mt-3">
      <Skeleton v-for="n of 6" :key="n" height="9rem" class="mb-6"  />
    </div>

    <div v-else>
        <Fieldset v-for="post in posts" :key="post.id" :legend="post.title" class="shadow-1 mb-5">
          {{ post.description }}
          <div class="flex justify-content-end">
              <router-link :to="`/post/${post.id}/edit`" class="mr-3" style="text-decoration: none;">
                <Button label="編集" icon="pi pi-pencil"></Button>
              </router-link>

              <Button label="削除" icon="pi pi-trash" class="p-button-danger" @click="openConfirmation(post.id)" />  
          </div>
        </Fieldset>

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
  </div>
</template>
