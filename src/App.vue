<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import Toast from 'primevue/toast';
</script>
<template>
  <div>
    <HeaderComponent />
    <Toast />
    <router-view/>
  </div>
</template>

<style>
body {
  margin: 0;
  background: rgb(17,200,218);
background: radial-gradient(circle, rgba(17,200,218,0.14066876750700286) 0%, rgba(0,204,250,0.26111694677871145) 47%, rgba(0,212,255,0.3339460784313726) 100%);
}
</style>
