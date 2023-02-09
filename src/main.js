import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ToastService from 'primevue/toastservice';
import './axios.js';


const pinia = createPinia();

const app = createApp(App);

app.use(PrimeVue)
  .use(ToastService)
  .use(pinia)
  .use(router)
  .component('Button', Button)
  .component('InputText', InputText)
  .component('Textarea', Textarea)
  .mount('#app');
